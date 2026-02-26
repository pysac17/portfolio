import {
    sql,
    blender,
    canva,
    threejs,
    arduino,
    python,
    tensorflow,
    bootstrap,
    contact,
    api,
    java,
    django,
    flask,
    css,
    git,
    github,
    html,
    javascript,
    linkedin,
    mongodb,
    react,
    sass,
    pytorch,
    opencv,
    langchain,
} from "../assets/icons";

import {
    attendanceTracker, 
    contrailDetection,
    gainnFintechIcon,
    hobbyTribeIcon,
    inventoryManagement,
    lineFollowingRobot,
    objectDetectionRobot,
    unscript,
    yoga,
    netflix,
    techxleIcon,
    brainwave,
} from "../assets/images";

export const skills = [
    {
        imageUrl: python,
        name: "Python",
        type: "AI/ML",
    },
    {
        imageUrl: tensorflow,
        name: "TensorFlow",
        type: "AI/ML",
    },
    { 
        imageUrl: pytorch, 
        name: "PyTorch", 
        type: "AI/ML" 
    },
    { 
        imageUrl: opencv, 
        name: "OpenCV", 
        type: "AI/ML" 
    },
    { 
        imageUrl: langchain, 
        name: "LangGraph", 
        type: "AI/ML" 
    },
    {
        imageUrl: javascript,
        name: "JavaScript",
        type: "Frontend",
    },
    {
        imageUrl: react,
        name: "ReactJS",
        type: "Frontend",
    },
    {
        imageUrl: html,
        name: "HTML",
        type: "Frontend",
    },
    {
        imageUrl: css,
        name: "CSS",
        type: "Frontend",
    },
    {
        imageUrl: bootstrap,
        name: "Bootstrap",
        type: "Frontend",
    },
    {
        imageUrl: django,
        name: "Django",
        type: "Backend",
    },
    {
        imageUrl: flask,
        name: "Flask",
        type: "Backend",
    },
    {
        imageUrl: java,
        name: "Java",
        type: "Programming Language",
    },
    {
        imageUrl: api,
        name: "API",
        type: "Backend",
    },
    {
        imageUrl: git,
        name: "Git",
        type: "Version Control",
    },
    {
        imageUrl: github,
        name: "GitHub",
        type: "Version Control",
    },
    {
        imageUrl: sql,
        name: "mySQL",
        type: "Database",
    },
    {
        imageUrl: mongodb,
        name: "MongoDB",
        type: "Database",
    },
    {
        imageUrl: threejs,
        name: "Three.JS",
        type: "Frontend",
    },
    {
        imageUrl: sass,
        name: "Sass",
        type: "Frontend",
    },
    {
        imageUrl: blender,
        name: "Blender",
        type: "Design",
    }, 
    {
        imageUrl: canva,
        name: "Canva",
        type: "Design",
    }, 
    {
        imageUrl: arduino,
        name: "Arduino",
        type: "Robotics",
    }, 
];

export const experiences = [
    {
        title: "Associate AI Engineer",
        company_name: "Techxle",
        location: "Mumbai (Remote)",
        icon: techxleIcon,
        iconBg: "black",
        date: "August 2024 - August 2025",
        points: [
            "Built enterprise document processing pipelines using LangGraph and LangSmith for clients Lockton and TRNDigital, converting unstructured insurance binder and quote documents into structured JSON, delivering the full solution within 2 weeks in a 4-person team.",
            "Engineered a resume screening engine using Azure Document Intelligence, Azure Search AI, and GPT-based re-ranking, automating candidate evaluation and reducing manual HR screening effort across hiring pipelines.",
            "Mentored two interns in NLP and computer vision by designing structured learning paths and leading weekly project reviews, enabling both to independently contribute to live production projects.",
        ],
    },
    {
        title: "AI & DS Intern",
        company_name: "The Hobby Tribe",
        location: "Mumbai",
        icon: hobbyTribeIcon,
        iconBg: "#FFA500",
        date: "June 2023 - August 2023",
        points: [
            "Founded the AI department from scratch as the sole AI hire, scoping and delivering music classification, image comparison, and automated student assessment models using CNNs and NLP for a hobby learning platform.",
            "Reduced instructor workload through automated assessment pipelines while improving user personalization, enabling scalable self-paced learning across the platform.",
        ],
    },
    {
        title: "AI & ML Intern",
        company_name: "Gainn Fintech",
        location: "Mumbai",
        icon: gainnFintechIcon,
        iconBg: "#62cff4",
        date: "January 2023 - March 2023",
        points: [
            "Engineered a stock price prediction system using a bidirectional LSTM model with integrated time series and social media data analysis, achieving 73% prediction accuracy.",
            "Improved investment decision-making by surfacing data-driven insights from blended market and sentiment signals.",
        ],
    },
];



export const socialLinks = [
    {
        name: 'Contact',
        iconUrl: contact,
        link: '/contact',
    },
    {
        name: 'GitHub',
        iconUrl: github,
        link: 'https://github.com/pysac17',
    },
    {
        name: 'LinkedIn',
        iconUrl: linkedin,
        link: 'https://www.linkedin.com/in/sachijshah/',
    }
];

export const projects = [
    {
        iconUrl: brainwave, 
        theme: 'btn-back-purple',
        name: 'Brainwave-Based Adaptive Learning System',
        description: 'Built a real-time EEG cognitive state classifier using the Muse headband, achieving 98% training accuracy across focus, neutral, and relaxed states. Fused biosignal data with user questionnaire responses into a multimodal recommendation engine that generates personalized study plans — covering session length, ambient conditions, and peak productivity windows.',
        link: 'https://github.com/areebar-netizen/MCS_Capstone', 
    },
    {
        iconUrl: yoga,
        theme: 'btn-back-blue',
        name: 'Live Yoga Posture Detection System',
        description: 'Built a real-time yoga posture correction system using CNNs and MediaPipe, classifying 10 poses with 80–90% detection confidence trained over 1600 epochs. Engineered a custom dataset and solved a critical failure for low-angle poses like plank where the face falls below knee level. Secured a national patent (application no. 202321077089) for the novel pose detection methodology.',
        link: 'https://github.com/pysac17/YogaGuru',
    },
    {
        iconUrl: contrailDetection,
        theme: 'btn-back-red',
        name: 'Contrail Detection',
        description: 'Benchmarked MaxViT, EfficientNet, and CoAtNet for satellite contrail detection via grid-search hyperparameter tuning across learning rates, batch sizes, and weight decay on single and multi-frame setups. Identified MaxViT as the optimal architecture at 72.4% accuracy, outperforming EfficientNet (69.8%) and CoAtNet (62.0%).',
        link: 'https://github.com/pysac17/contrails-detection',
    },
    {
        iconUrl: unscript,
        theme: 'btn-back-green',
        name: 'Unscript Hackathon — Runner Up',
        description: 'Built an OCR-based image quality classifier that categorized images into poor, moderate, and excellent quality tiers. Added bulk file upload and text extraction for moderate and excellent quality images. Secured runner-up at the Unscript AIML Hackathon 2023.',
        link: 'https://github.com/GlenR16/CtrlAlt-Elite_Unscript-2k23',
    },
    {
        iconUrl: attendanceTracker,
        theme: 'btn-back-pink',
        name: 'Attendance & Extracurricular Tracker',
        description: 'Built a full-stack Django school management app for teachers, students, and parents to track academic reports, timetables, and extracurricular activities — demonstrating end-to-end backend development and relational data modeling.',
        link: 'https://github.com/pysac17/codeDiggers/',
    },
    {
        iconUrl: inventoryManagement,
        theme: 'btn-back-yellow',
        name: 'Inventory Management System',
        description: 'Developed a full-stack inventory and sales tracking system for restaurants and retail stores with real-time dashboards, dynamic graphs, order invoices, and monthly summaries — built to give management instant visibility into stock and revenue.',
        link: 'https://github.com/Elvis-Dodti/pos_mms',
    },
    {
        iconUrl: lineFollowingRobot,
        theme: 'btn-back-orange',
        name: 'Autonomous Line Following Robot',
        description: 'Designed and built a line-following robot using Arduino IDE and sensor fusion, capable of autonomously navigating straight lines, zigzags, and circular paths. Competed in IIT Bombay\'s e-Yantra Robotics Competition (EYRC) — the project that sparked my interest in intelligent systems.',
        link: 'https://github.com/pysac17/arduino-projects',
    },
    {
        iconUrl: objectDetectionRobot,
        theme: 'btn-back-black',
        name: 'Obstacle Detection & Avoidance Robot',
        description: 'Built an autonomous robot using Arduino IDE and proximity sensors to detect and navigate around obstacles in real time — an early hands-on project in sensor integration and real-time decision logic.',
        link: 'https://github.com/pysac17/arduino-projects',
    },
    {
        iconUrl: netflix,
        theme: 'btn-back-teal',
        name: 'Netflix Clone',
        description: 'Built a fully functional Netflix-style streaming UI using ReactJS and the TMDB API — featuring dynamic movie listings, search, and responsive design. A frontend deep-dive into component architecture and REST API integration.',
        link: 'https://netflix-clone-beta-one-84.vercel.app/',
    },
];