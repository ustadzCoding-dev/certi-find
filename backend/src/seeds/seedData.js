require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const Certification = require('../models/Certification');
const connectDB = require('../config/db');

const certifications = [
    {
        title: 'Google IT Support Professional Certificate',
        provider: 'Google',
        category: 'IT',
        description: 'Start your career in IT with this foundational program from Google. You will learn how to troubleshoot and debug hardware and software issues, set up networks, and provide customer support. No prior experience necessary. This certificate program is a professional-level credential from Google.',
        duration: '6 months',
        level: 'Beginner',
        isFree: true,
        freeNote: 'Free with Coursera financial aid',
        url: 'https://www.coursera.org/professional-certificates/google-it-support',
        skills: ['IT Support', 'Networking', 'Operating Systems', 'Security', 'Linux', 'Customer Service'],
        certificateType: 'Professional Certificate',
        language: 'English',
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
    },
    {
        title: 'IBM Data Science Professional Certificate',
        provider: 'IBM',
        category: 'Data Science',
        description: 'Learn in-demand skills like data analysis, Python programming, machine learning, and more that will have you job-ready in as little as 3 months. This program is developed by IBM data science experts and covers tools like Jupyter, Python, SQL, and more.',
        duration: '3 months',
        level: 'Intermediate',
        isFree: true,
        freeNote: 'Free audit available',
        url: 'https://www.coursera.org/professional-certificates/ibm-data-science',
        skills: ['Python', 'Machine Learning', 'Data Analysis', 'SQL', 'Data Visualization', 'Pandas'],
        certificateType: 'Professional Certificate',
        language: 'English',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    },
    {
        title: 'Meta Front-End Developer Certificate',
        provider: 'Meta',
        category: 'IT',
        description: 'Launch your career as a front-end developer. Build job-ready skills for an in-demand career and earn a credential from Meta. No degree or prior experience required to get started. Learn React, JavaScript, HTML, CSS and more.',
        duration: '7 months',
        level: 'Beginner',
        isFree: true,
        freeNote: 'Free with Coursera financial aid',
        url: 'https://www.coursera.org/professional-certificates/meta-front-end-developer',
        skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Git', 'Bootstrap'],
        certificateType: 'Professional Certificate',
        language: 'English',
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    },
    {
        title: 'Google UX Design Professional Certificate',
        provider: 'Google',
        category: 'Design',
        description: 'Learn the foundations of UX design and prepare for an entry-level job. This program will teach you how to conduct user research, create wireframes and prototypes, and test your designs with real users.',
        duration: '6 months',
        level: 'Beginner',
        isFree: true,
        freeNote: 'Free with Coursera financial aid',
        url: 'https://www.coursera.org/professional-certificates/google-ux-design',
        skills: ['UX Design', 'Figma', 'Prototyping', 'User Research', 'Wireframing', 'Adobe XD'],
        certificateType: 'Professional Certificate',
        language: 'English',
        thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
    },
    {
        title: 'Google Digital Marketing & E-commerce Certificate',
        provider: 'Google',
        category: 'Marketing',
        description: 'Get job-ready for a new career in digital marketing and e-commerce. Learn how to attract and engage customers, build brand awareness, and drive sales through digital channels.',
        duration: '6 months',
        level: 'Beginner',
        isFree: true,
        freeNote: 'Free with Coursera financial aid',
        url: 'https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce',
        skills: ['SEO', 'SEM', 'Google Analytics', 'Social Media Marketing', 'Email Marketing'],
        certificateType: 'Professional Certificate',
        language: 'English',
        thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
    },
    {
        title: 'AWS Cloud Practitioner Essentials',
        provider: 'Amazon',
        category: 'IT',
        description: 'This course is for individuals who seek an overall understanding of Amazon Web Services (AWS) Cloud, independent of specific technical roles. You will learn about AWS Cloud concepts, AWS services, security, architecture, pricing, and support.',
        duration: '1 month',
        level: 'Beginner',
        isFree: true,
        freeNote: 'Free on AWS Skill Builder',
        url: 'https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/',
        skills: ['AWS', 'Cloud Computing', 'Infrastructure', 'Security'],
        certificateType: 'Certificate of Completion',
        language: 'English',
        thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    },
    {
        title: 'Microsoft Power BI Data Analyst',
        provider: 'Microsoft',
        category: 'Data Science',
        description: 'Learn to use Power BI to analyze data, create visualizations, and share insights across your organization. This certificate will help you become proficient in data analysis using Microsoft Power BI.',
        duration: '4 months',
        level: 'Intermediate',
        isFree: true,
        freeNote: 'Free audit on Coursera',
        url: 'https://www.coursera.org/professional-certificates/microsoft-power-bi-data-analyst',
        skills: ['Power BI', 'Data Visualization', 'DAX', 'Excel', 'Data Modeling'],
        certificateType: 'Professional Certificate',
        language: 'English',
        thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
    },
    {
        title: 'Google Project Management Certificate',
        provider: 'Google',
        category: 'Business',
        description: 'Learn the skills needed to succeed as a project manager. This program covers project management methodologies, Agile frameworks, and real-world project documentation and artifacts.',
        duration: '6 months',
        level: 'Beginner',
        isFree: true,
        freeNote: 'Free with Coursera financial aid',
        url: 'https://www.coursera.org/professional-certificates/google-project-management',
        skills: ['Agile', 'Scrum', 'Project Planning', 'Risk Management', 'Stakeholder Management'],
        certificateType: 'Professional Certificate',
        language: 'English',
        thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
    },
    {
        title: 'HubSpot Content Marketing Certification',
        provider: 'HubSpot',
        category: 'Marketing',
        description: 'Learn how to create and promote compelling content that attracts and engages your audience. This free certification covers content strategy, creation, distribution, and analysis.',
        duration: '1 month',
        level: 'Beginner',
        isFree: true,
        freeNote: 'Completely free on HubSpot Academy',
        url: 'https://academy.hubspot.com/courses/content-marketing',
        skills: ['Content Strategy', 'Blogging', 'SEO', 'Content Promotion'],
        certificateType: 'Certificate of Completion',
        language: 'English',
        thumbnail: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c2b9?w=800&h=400&fit=crop',
    },
    {
        title: 'Google Cybersecurity Professional Certificate',
        provider: 'Google',
        category: 'IT',
        description: 'Prepare for a career in the high-growth field of cybersecurity. Learn Python, Linux, SIEM tools, and more. No prior experience is required, and you will be job-ready in less than 6 months.',
        duration: '6 months',
        level: 'Beginner',
        isFree: true,
        freeNote: 'Free with Coursera financial aid',
        url: 'https://www.coursera.org/professional-certificates/google-cybersecurity',
        skills: ['Cybersecurity', 'Python', 'Linux', 'SIEM', 'Network Security'],
        certificateType: 'Professional Certificate',
        language: 'English',
        thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop',
    },
    {
        title: 'Meta Back-End Developer Certificate',
        provider: 'Meta',
        category: 'IT',
        description: 'Take the first steps to becoming a back-end developer. Learn Python, Django, databases, and APIs. Build a portfolio of projects to showcase your skills to potential employers.',
        duration: '8 months',
        level: 'Beginner',
        isFree: true,
        freeNote: 'Free with Coursera financial aid',
        url: 'https://www.coursera.org/professional-certificates/meta-back-end-developer',
        skills: ['Python', 'Django', 'MySQL', 'REST APIs', 'Version Control'],
        certificateType: 'Professional Certificate',
        language: 'English',
        thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
    },
    {
        title: 'IBM Machine Learning Professional Certificate',
        provider: 'IBM',
        category: 'Data Science',
        description: 'Master the essential skills of machine learning. This program covers supervised and unsupervised learning, deep learning, and reinforcement learning using Python and popular ML libraries.',
        duration: '4 months',
        level: 'Advanced',
        isFree: true,
        freeNote: 'Free audit available',
        url: 'https://www.coursera.org/professional-certificates/ibm-machine-learning',
        skills: ['Machine Learning', 'Deep Learning', 'Python', 'TensorFlow', 'Scikit-learn'],
        certificateType: 'Professional Certificate',
        language: 'English',
        thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop',
    },
];

const seedData = async () => {
    try {
        await connectDB();

        console.log('🗑️ Clearing existing data...');
        await User.deleteMany({});
        await Certification.deleteMany({});

        // Create admin user
        console.log('👤 Creating admin user...');
        const admin = await User.create({
            name: 'Admin CertiFind',
            email: 'admin@certifind.com',
            password: 'admin123',
            role: 'admin',
            interestField: 'IT',
        });

        // Create demo user
        console.log('👤 Creating demo user...');
        await User.create({
            name: 'Demo User',
            email: 'demo@certifind.com',
            password: 'demo123',
            role: 'user',
            interestField: 'IT',
        });

        // Add certifications with admin as creator
        console.log('📜 Seeding certifications...');
        const certsWithCreator = certifications.map(cert => ({
            ...cert,
            createdBy: admin._id,
        }));

        await Certification.insertMany(certsWithCreator);

        console.log(`
╔════════════════════════════════════════════════╗
║                                                ║
║   ✅ Database Seeded Successfully!             ║
║                                                ║
║   Admin: admin@certifind.com / admin123        ║
║   Demo:  demo@certifind.com / demo123          ║
║   Certifications: ${certifications.length} added                   ║
║                                                ║
╚════════════════════════════════════════════════╝
    `);

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error);
        process.exit(1);
    }
};

seedData();
