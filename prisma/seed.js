const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Get credentials from environment variables or use defaults
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  // Create admin user
  const hashedPassword = await bcrypt.hash(adminPassword, 12);
  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      username: adminUsername,
      email: adminEmail,
      password: hashedPassword,
    },
  });
  console.log('✅ Admin user created');
  console.log(`   Username: ${adminUsername}`);
  console.log(`   Email: ${adminEmail}`);

  // Create Hero data
  const hero = await prisma.hero.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Ahmed Essam Ahmed',
      bio: 'Full Stack Developer passionate about building modern web applications',
      linkedIn: 'https://linkedin.com/in/ahmed-esam-204377240',
      github: 'https://github.com/Ahmedesam2002',
      cvLink: '/CV.pdf',
      heroImg: 'me.png',
    },
  });
  console.log('✅ Hero data created');

  // Create About data
  const about = await prisma.about.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'About',
      bio: "I'm a Full Stack Developer based in Cairo, Egypt with experience in React, Next.js, Node.js, and PHP Laravel. I'm passionate about creating efficient, scalable web applications and teaching programming to the next generation.",
      description: "My expertise spans both frontend and backend development, with a strong foundation in modern JavaScript frameworks, API integration, and database management. I combine technical skills with practical teaching experience to deliver quality solutions and mentor aspiring developers.",
      profileImg: '/me.png',
      contactLink: '#contact',
      resumeLink: '/CV.pdf',
      ctaText: 'Get in touch',
      resumeText: 'View Resume',
    },
  });
  console.log('✅ About data created');

  // Create Experience data
  const experiences = [
    {
      position: 'Programming Instructor',
      company: 'We School',
      duration: '08/2025 - Present',
      location: 'Nasr City, Cairo',
      description: 'Teaching React, PHP, Laravel, and practical project implementation. Guiding students through hands-on projects and applying real-world problem-solving techniques. Dedicated to fostering a collaborative learning environment with a focus on modern web development skills.',
      technologies: ['React', 'PHP', 'Laravel', 'JavaScript', 'Web Development'],
    },
    {
      position: 'Frontend Intern',
      company: 'Penta-b',
      duration: '02/2025 - 05/2025',
      location: 'Cairo, Egypt',
      description: 'Developed user interfaces using React.js and Chakra UI in an Agile team setting. Contributed to internal dashboard "Reego" optimizing load performance by ~30% using SVG rendering. Integrated TanStack Query for efficient API handling and caching. Built modular, reusable components and forms using Formik and Yup.',
      technologies: ['React.js', 'Chakra UI', 'TanStack Query', 'Formik', 'Yup', 'SVG'],
    },
    {
      position: 'AI & ICT Instructor (Part-Time)',
      company: 'iSchool & Amgad International School',
      duration: '2023 - 2024',
      location: 'Cairo, Egypt',
      description: 'Taught ICT and AI fundamentals to students aged 10-16 in a simplified and engaging manner. Managed classroom activities, explained complex concepts clearly, and fostered a collaborative learning environment.',
      technologies: ['Teaching', 'AI', 'ICT', 'Python', 'Educational Technology'],
    },
  ];

  for (const [index, exp] of experiences.entries()) {
    const experience = await prisma.experience.create({
      data: {
        position: exp.position,
        company: exp.company,
        duration: exp.duration,
        location: exp.location,
        description: exp.description,
        order: index + 1,
        technologies: {
          create: exp.technologies.map(tech => ({ name: tech })),
        },
      },
    });
  }
  console.log('✅ Experience data created');

  // Create Projects data
  const projects = [
    {
      title: 'FreshCart – E-Commerce Web App',
      description: 'Built using React.js, Next.js, Tailwind CSS, Axios, Formik, Yup, and TanStack Query. Implemented user authentication, product browsing, cart, and checkout features. Focused on performance, modular component structure, and clean UI.',
      image: '/projects/freshcart.jpg',
      liveLink: 'https://freshcart-demo.vercel.app',
      githubLink: 'https://github.com/Ahmedesam2002/freshcart',
      featured: true,
      technologies: ['React.js', 'Next.js', 'Tailwind CSS', 'Axios', 'Formik', 'Yup', 'TanStack Query'],
    },
    {
      title: 'Live Chat App',
      description: 'Developed a real-time messaging platform using Next.js, Zustand, Tailwind CSS, Axios, and TanStack Query. Supports live messaging, user presence, and responsive UI. Used Formik and Yup for input validation and dynamic form control.',
      image: '/projects/chatapp.jpg',
      liveLink: 'https://chatapp-demo.vercel.app',
      githubLink: 'https://github.com/Ahmedesam2002/chatapp',
      featured: true,
      technologies: ['Next.js', 'Zustand', 'Tailwind CSS', 'Axios', 'TanStack Query', 'Formik', 'Yup'],
    },
    {
      title: 'Hodoor – Student Attendance Platform',
      description: 'Web app to manage student check-ins via barcode scanner. Built with React.js, Next.js, Tailwind CSS, Axios, TanStack Query, Formik, and Yup. Features included dashboard, student database, and reporting.',
      image: '/projects/hodoor.jpg',
      liveLink: 'https://hodoor-demo.vercel.app',
      githubLink: 'https://github.com/Ahmedesam2002/hodoor',
      featured: false,
      technologies: ['React.js', 'Next.js', 'Tailwind CSS', 'Axios', 'TanStack Query', 'Barcode Scanner'],
    },
  ];

  for (const [index, proj] of projects.entries()) {
    const project = await prisma.project.create({
      data: {
        title: proj.title,
        description: proj.description,
        image: proj.image,
        liveLink: proj.liveLink,
        githubLink: proj.githubLink,
        featured: proj.featured,
        order: index + 1,
        technologies: {
          create: proj.technologies.map(tech => ({ name: tech })),
        },
      },
    });
  }
  console.log('✅ Projects data created');

  // Create Skills data
  const skillCategories = [
    {
      category: 'Languages & Frameworks',
      icon: '💻',
      skills: [
        { name: 'JavaScript', level: 95 },
        { name: 'TypeScript', level: 60 },
        { name: 'React.js', level: 90 },
        { name: 'Next.js', level: 90 },
        { name: 'Node.js', level: 75 },
        { name: 'PHP (Laravel)', level: 80 },
      ],
    },
    {
      category: 'API & Data Handling',
      icon: '🔌',
      skills: [
        { name: 'Axios', level: 90 },
        { name: 'TanStack Query', level: 85 },
        { name: 'RESTful APIs', level: 90 },
      ],
    },
    {
      category: 'Databases',
      icon: '🗄️',
      skills: [
        { name: 'SQL Server', level: 75 },
        { name: 'MongoDB', level: 65 },
      ],
    },
    {
      category: 'Dev Tools',
      icon: '🛠️',
      skills: [
        { name: 'Git', level: 85 },
        { name: 'GitHub', level: 85 },
        { name: 'VS Code', level: 95 },
        { name: 'Postman', level: 80 },
        { name: 'Chrome DevTools', level: 85 },
      ],
    },
    {
      category: 'UI & Styling',
      icon: '🎨',
      skills: [
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Chakra UI', level: 85 },
        { name: 'Responsive Design', level: 90 },
      ],
    },
    {
      category: 'Form & State Management',
      icon: '📋',
      skills: [
        { name: 'Formik', level: 85 },
        { name: 'Yup', level: 85 },
        { name: 'Zustand', level: 75 },
      ],
    },
    {
      category: 'Concepts',
      icon: '🧠',
      skills: [
        { name: 'OOP', level: 85 },
        { name: 'Problem Solving', level: 80 },
        { name: 'Component-Based Architecture', level: 90 },
        { name: 'State Management', level: 85 },
      ],
    },
    {
      category: 'Soft Skills',
      icon: '🤝',
      skills: [
        { name: 'Team Collaboration', level: 90 },
        { name: 'Self-Learning', level: 95 },
        { name: 'Communication', level: 85 },
        { name: 'Classroom Management', level: 90 },
      ],
    },
  ];

  for (const [catIndex, category] of skillCategories.entries()) {
    const skillCategory = await prisma.skillCategory.create({
      data: {
        category: category.category,
        icon: category.icon,
        order: catIndex + 1,
        skills: {
          create: category.skills.map((skill, skillIndex) => ({
            name: skill.name,
            level: skill.level,
            order: skillIndex + 1,
          })),
        },
      },
    });
  }
  console.log('✅ Skills data created');

  // Create Education data
  const educationEntries = [
    {
      degree: 'Bachelor of Computer Science – Artificial Intelligence',
      institution: 'Cairo University',
      duration: '2020 - 2024',
      location: 'Cairo, Egypt',
      description: 'Focused on Artificial Intelligence, deep learning, and software engineering. Graduation Project: Developed a generative model using GANs to enhance image quality using deep learning.',
      gpa: '2.9/4.0',
      type: 'degree',
      achievements: [
        'Developed GANs-based generative model for image enhancement',
        'Completed graduation project on deep learning',
        'Gained strong foundation in AI and machine learning',
      ],
    },
    {
      degree: 'React Frontend Development',
      institution: 'Udemy',
      duration: '2023',
      location: 'Online',
      description: 'Comprehensive course covering React.js fundamentals, hooks, state management, and modern frontend development practices.',
      gpa: null,
      type: 'certification',
      achievements: [],
    },
    {
      degree: 'Data Structures & Algorithms',
      institution: 'Udemy',
      duration: '2023',
      location: 'Online',
      description: 'In-depth course on data structures, algorithms, problem-solving techniques, and computational complexity.',
      gpa: null,
      type: 'certification',
      achievements: [],
    },
    {
      degree: 'Node.js Development',
      institution: 'Udemy',
      duration: '2024 - In Progress',
      location: 'Online',
      description: 'Comprehensive Node.js course covering backend development, Express.js, databases, and API development.',
      gpa: null,
      type: 'certification',
      achievements: [],
    },
  ];

  for (const [index, edu] of educationEntries.entries()) {
    const education = await prisma.education.create({
      data: {
        degree: edu.degree,
        institution: edu.institution,
        duration: edu.duration,
        location: edu.location,
        description: edu.description,
        gpa: edu.gpa,
        type: edu.type,
        order: index + 1,
        achievements: {
          create: edu.achievements.map(achievement => ({ achievement })),
        },
      },
    });
  }
  console.log('✅ Education data created');

  // Create Contact Info
  const contactInfo = await prisma.contactInfo.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'Contact',
      subtitle: "Let's work together to bring your ideas to life",
      email: 'ahmed.essam.m.dev@gmail.com',
      phone: '+20 1200997915',
      location: 'Maadi, Cairo, Egypt',
      github: 'https://github.com/Ahmedesam2002',
      linkedin: 'https://linkedin.com/in/ahmed-esam-204377240',
      twitter: 'https://ahmedessam.vercel.app',
    },
  });
  console.log('✅ Contact info created');

  // Create Contact Methods
  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      description: 'Drop me a line anytime',
      value: 'ahmed.essam.m.dev@gmail.com',
      link: 'mailto:ahmed.essam.m.dev@gmail.com',
      order: 1,
    },
    {
      icon: '📱',
      title: 'Phone',
      description: 'Call me for projects',
      value: '+20 1200997915',
      link: 'tel:+201200997915',
      order: 2,
    },
    {
      icon: '📍',
      title: 'Location',
      description: 'Based in Cairo, Egypt',
      value: 'Maadi, Cairo, Egypt',
      link: '#',
      order: 3,
    },
  ];

  for (const method of contactMethods) {
    await prisma.contactMethod.create({
      data: method,
    });
  }
  console.log('✅ Contact methods created');

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });