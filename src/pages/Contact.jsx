import emailjs from "@emailjs/browser";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";

import useAlert from "../hooks/useAlert";
import Alert from "../components/Alert";
import Loader from "../components/Loader";

// Scene lights are positioned for the robot at this scale
const ROBOT_SCALE = 3;

// Interactive Robot Component
const InteractiveRobot = ({ isTyping, ...props }) => {
  const robotRef = useRef();
  const { scene, animations } = useGLTF('/robot.glb');
  const { actions } = useAnimations(animations, robotRef);
  const previousAnimation = useRef();

  useEffect(() => {
    if (actions) {
      const animationNames = Object.keys(actions);
      console.log('Available animations:', animationNames);
      console.log('Animation details:', animations.map(a => ({ name: a.name, duration: a.duration })));
      console.log('isTyping:', isTyping);
      
      // Use the first available animation since there's only one
      const availableAnimation = animationNames[0];
      console.log('Using available animation:', availableAnimation);

      if (actions[availableAnimation]) {
        const currentAction = actions[availableAnimation];
        console.log('Playing animation:', availableAnimation);
        
        // Stop all animations first
        Object.values(actions).forEach(action => action.stop());
        
        // Play the animation only when typing
        if (isTyping) {
          currentAction.reset().fadeIn(0.5).play();
        } else {
          // When not typing, stop the animation completely
          currentAction.stop();
        }
        
        previousAnimation.current = currentAction;
      }
    }
  }, [isTyping, actions, animations]);

  useFrame(() => {
    if (robotRef.current) {
      // Always rotate, but faster when typing
      const rotationSpeed = isTyping ? 0.02 : 0.01;
      robotRef.current.rotation.y += rotationSpeed;
    }
  });

  // Measure the model once so it can be centered and the camera can frame it
  const fit = useMemo(() => {
    scene.updateMatrixWorld(true);
    // Skinned meshes need their bone matrices before their bounds are correct
    scene.traverse((obj) => {
      if (obj.isSkinnedMesh) {
        obj.skeleton.update();
        obj.boundingBox = null;
        obj.boundingSphere = null;
      }
    });
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());

    // The robot spins around its vertical axis, so find the farthest any vertex
    // reaches from that axis (tighter than the bounding-box corner)
    const v = new THREE.Vector3();
    let radius = 0;
    scene.traverse((obj) => {
      if (!obj.isMesh) return;
      const pos = obj.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        obj.getVertexPosition(i, v).applyMatrix4(obj.matrixWorld);
        radius = Math.max(radius, Math.hypot(v.x - center.x, v.z - center.z));
      }
    });

    return {
      center: center.multiplyScalar(ROBOT_SCALE),
      halfHeight: ((box.max.y - box.min.y) / 2) * ROBOT_SCALE,
      radiusXZ: radius * ROBOT_SCALE,
    };
  }, [scene]);

  const { camera, size } = useThree();

  // Move the camera back just enough that the spinning robot always fits
  useEffect(() => {
    const margin = 1.12;
    const vFov = THREE.MathUtils.degToRad(camera.fov);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * (size.width / size.height));
    const distForHeight = fit.halfHeight / Math.tan(vFov / 2) + fit.radiusXZ;
    const distForWidth = fit.radiusXZ / Math.tan(hFov / 2) + fit.radiusXZ;
    const distance = Math.max(distForHeight, distForWidth) * margin;

    camera.position.set(0, 0, distance);
    camera.near = distance / 100;
    camera.far = distance * 10;
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height, fit]);

  return (
    <group ref={robotRef} {...props}>
      <primitive
        object={scene}
        scale={[ROBOT_SCALE, ROBOT_SCALE, ROBOT_SCALE]}
        position={[-fit.center.x, -fit.center.y, -fit.center.z]}
      />
    </group>
  );
};

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef();

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
    setIsTyping(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  const handleFocus = () => setIsTyping(true);
  const handleBlur = () => {
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setIsTyping(false); // Stop typing animation during submit

    // Check if environment variables are set
    if (!import.meta.env.VITE_APP_EMAILJS_SERVICE_ID || 
        !import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID || 
        !import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY) {
      setLoading(false);
      setIsTyping(false);
      showAlert({
        show: true,
        text: "Email service is not configured. Please check environment variables.",
        type: "danger",
      });
      console.error("Missing EmailJS environment variables:");
      console.error("VITE_APP_EMAILJS_SERVICE_ID:", import.meta.env.VITE_APP_EMAILJS_SERVICE_ID);
      console.error("VITE_APP_EMAILJS_TEMPLATE_ID:", import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID);
      console.error("VITE_APP_EMAILJS_PUBLIC_KEY:", import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY);
      return;
    }

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        
        {
          
          from_name: form.name,
          to_name: "Sachi",
          from_email: form.email,
          to_email: "sachijshah@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: "Thank you for your message 😃",
            type: "success",
          });

          setTimeout(() => {
            hideAlert(false);
            setIsTyping(false);
            setForm({
              name: "",
              email: "",
              message: "",
            });
          }, [3000]);
        },
        (error) => {
          setLoading(false);
          console.error("EmailJS error:", error);
          setIsTyping(false);

          showAlert({
            show: true,
            text: "I didn't receive your message 😢",
            type: "danger",
          });
        }
      );
  };

  return (
    <section className='relative flex lg:flex-row flex-col max-container'>
      {alert.show && <Alert {...alert} />}

      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h1 className='head-text'>Get in Touch</h1>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className='w-full flex flex-col gap-7 mt-14'
        >
          <label className='text-black-500 font-semibold'>
            Name
            <input
              type='text'
              name='name'
              className='input'
              placeholder='John'
              required
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className='text-black-500 font-semibold'>
            Email
            <input
              type='email'
              name='email'
              className='input'
              placeholder='John@gmail.com'
              required
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>
          <label className='text-black-500 font-semibold'>
            Your Message
            <textarea
              name='message'
              rows='4'
              className='textarea'
              placeholder='Write your thoughts here...'
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </label>

          <button
            type='submit'
            disabled={loading}
            className='btn'
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {loading ? "Sending..." : "Submit"}
          </button>
        </form>

        <div className='mt-10'>
          <p className='text-sm text-slate-500 mb-3'>Or reach me directly:</p>
          <div className='flex flex-wrap gap-3'>
            {[
              { label: 'Gmail', href: 'mailto:sachijshah@gmail.com', title: 'sachijshah@gmail.com' },
              { label: 'UCI Email', href: 'mailto:sachijs@uci.edu', title: 'sachijs@uci.edu' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sachijshah/', external: true },
              { label: 'GitHub', href: 'https://github.com/pysac17', external: true },
              { label: 'Resume', href: '/Sachi_Shah_Resume.pdf', download: true },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                title={link.title}
                {...(link.external && { target: '_blank', rel: 'noopener noreferrer' })}
                {...(link.download && { download: true })}
                className='px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-card text-sm font-medium text-slate-700 hover:text-blue-600 hover:border-blue-300 transition-colors duration-200'
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className='lg:w-1/2 w-full lg:h-auto lg:min-h-[550px] md:h-[550px] h-[380px] mt-10 lg:mt-0'>
        <Canvas
          camera={{
            position: [0, 1, 20],
            fov: 50,
            near: 0.5,
            far: 1000,
          }}
        >
          <hemisphereLight skyColor={0x4040ff} groundColor={0x202020} intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <ambientLight intensity={0.6} />
          <pointLight position={[0, 5, 0]} intensity={2} color="#00FFFF" />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={3}
          />

          <Suspense fallback={<Loader />}>
            <InteractiveRobot isTyping={isTyping} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;