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
    techxleIcon,
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
        title: "Computer Analyst",
        company_name: "Techxle",
        location: "Chennai",
        icon: techxleIcon,  
        iconBg: "black",  
        date: "July 2024 - Present",
        points: [
            "Lead the development and optimization of AI systems, including RAG models, mind maps, and blood cell classification tools.",
            "Mentor interns by guiding them through hands-on projects, fostering skill development in machine learning and AI.",
            "Collaborate cross-functionally to create AI solutions that enhance product offerings, improving efficiency and user experience.",
        ],
    },
    {
        title: "AI/DS Intern",
        company_name: "The Hobby Tribe",
        location: "Worli",
        icon: hobbyTribeIcon,
        iconBg: "#FFA500",
        date: "June 2023 - August 2023",
        points: [
            "Pioneered the AI department as the inaugural AI intern at The Hobby Tribe, crafting 4.5 impactful AI models, including a revolutionary music classification system and image comparison models.",
            "Automated the evaluation process for learning hobbies, introducing a comprehensive system that assessed students' proficiency and provided targeted feedback, enhancing the overall learning experience.",
            "Collaborated with cross-functional teams to integrate AI solutions into existing systems, improving operational efficiency.",
            "Conducted extensive research on machine learning algorithms to optimize model performance and accuracy.",
        ],
    },
    {
        title: "AI/ML Intern",
        company_name: "Gainn Fintech",
        location: "Andheri",
        icon: gainnFintechIcon,
        iconBg: "#62cff4",
        date: "January 2023 - March 2023",
        points: [
            "Engineered an advanced bidirectional LSTM model at Gain Fintech, seamlessly blending time series data analysis with diverse feature incorporation to achieve accurate future stock price predictions.",
            "Developed algorithms to preprocess and analyze stock market data, improving the accuracy of predictions.",
            "Conducted research on various external factors impacting stock prices and integrated these factors into the model.",
            "Collaborated with team members to interpret model results and provided insights to enhance investment strategies.",
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
        iconUrl: yoga,
        theme: 'btn-back-blue',
        name: 'Live Yoga Posture Detection System',
        description: 'Developed an AI-powered digital yoga assist system using deep learning techniques to detect, analyze, and guide users on proper yoga postures for ten different yoga poses. Implemented a machine learning engine integrating CNN and PoseNet technologies to provide personalized pose recommendations for targeted health issues, enhancing mobility and alleviating discomfort. Achieved an A grade and published a patent (application number: 202321077089).',
        link: 'https://github.com/pysac17/YogaGuru',
    },
    {
        iconUrl: contrailDetection,
        theme: 'btn-back-red',
        name: 'Contrail Detection',
        description: 'Engineered a cutting-edge Machine Learning model to identify and mitigate contrail production, thereby reducing the impact of global warming caused by airplanes. Experimented with various algorithms to develop a novel approach for contrail detection, incorporating advanced data processing techniques.',
        link: 'https://github.com/pysac17/contrails-detection',
    },
    {
        iconUrl: unscript,
        theme: 'btn-back-green',
        name: 'Unscript, AIML Hackathon Project',
        description: 'Developed an image classifier using OCR (Optical Character Recognition) technology to categorize images into three quality categories: poor, moderate, and excellent. Secured a runner-up position in the hackathon. Implemented additional features such as bulk file upload and text recognition for images of moderate or excellent quality.',
        link: 'https://github.com/GlenR16/CtrlAlt-Elite_Unscript-2k23',
    },
    {
        iconUrl: attendanceTracker,
        theme: 'btn-back-pink',
        name: 'Attendance Tracker',
        description: 'Designed a Django-based progress-tracking app for teachers, students, and parents to easily access students\' academic reports, timetables, and extracurricular activities, enhancing educational engagement and management.',
        link: 'https://github.com/pysac17/codeDiggers/',
    },
    {
        iconUrl: inventoryManagement,
        theme: 'btn-back-yellow',
        name: 'Inventory Management System',
        description: 'Inventory Management System for Restaurants and Retail Stores. Developed to help businesses track sales, inventory, and manage customers in real time.',
        link: 'https://github.com/Elvis-Dodti/pos_mms',
    },
    {
        iconUrl: lineFollowingRobot,
        theme: 'btn-back-orange',
        name: 'Line Following Robot',
        description: 'Engineered a line-following robot using Arduino IDE that autonomously navigates various paths, such as straight lines, zigzags, and circles, demonstrating advanced robotics and sensor integration.',
        link: 'https://github.com/pysac17/arduino-projects',
    },
    {
        iconUrl: objectDetectionRobot,
        theme: 'btn-back-black',
        name: 'Object Detection and Avoidance Robot',
        description: 'Developed a sophisticated robot with obstacle detection and avoidance capabilities, equipped with sensors to "see" its surroundings and navigate through complex environments using Arduino IDE.',
        link: 'https://github.com/pysac17/arduino-projects',
    }
];
