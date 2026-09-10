export const profile = {
 name: 'Amrit Rathie', title: 'Software developer & curious builder', location: 'Grapevine, Texas',
 email: 'amrit.rathie@gmail.com', github: 'https://github.com/Spaceface16518', linkedin: 'https://www.linkedin.com/in/amrit-rathie',
 intro: 'I build software that connects thoughtful ideas to the real world — from developer tools and desktop apps to wearable sensing and creative computing.',
 about: 'My interests sit at the intersection of systems, programming languages, and useful products. I like understanding how things work, then making them easier for someone else to use. My projects span Rust, TypeScript, Python, cloud infrastructure, and embedded hardware.',
 personal: 'Away from code, I make room for music, biking, and cats. Curiosity is the thread that connects it all.',
};
export const projects = [
 { id: 'powerpercept', name: 'PowerPercept', category: 'Hardware × software', description: 'Exploring wearable pressure sensing: a platform for collecting foot-pressure data across movement and strength training.', detail: 'A prototype effort spanning passive sensors, custom circuit boards, Bluetooth connectivity, and a flexible pressure-data platform.', tags: ['Wearables', 'Embedded', 'KiCad'], stage: 'Prototype', href: null },
 { id: 'headershim', name: 'HeaderShim', category: 'Developer tools', description: 'A browser extension for managing HTTP header rules with profiles and per-tab control.', detail: 'Bringing a clear interface to browser request rules, with a TypeScript core and a lightweight extension UI.', tags: ['TypeScript', 'Browser APIs', 'Preact'], stage: 'Independent project', href: null },
 { id: 'dsupload', name: 'DSUpload', category: 'Desktop software', description: 'A Rust desktop tool for organizing photo and video imports with review and recovery built into the workflow.', detail: 'Working on careful media reconciliation, metadata matching, and a graphical interface for large libraries.', tags: ['Rust', 'egui', 'Media'], stage: 'Independent project', href: null },
 { id: 'creative', name: 'Creative AI workflows', category: 'Creative computing', description: 'Experimenting with personalized cake-topper imagery and repeatable image-generation workflows.', detail: 'Connecting ComfyUI workflows with AWS GPU infrastructure, with attention to reproducibility and resource lifecycle.', tags: ['Python', 'ComfyUI', 'AWS'], stage: 'Exploration', href: null },
 { id: 'planner', name: 'Degree Planner', category: 'Community software', description: 'Helping UT Dallas students reason about their degree plans through a drag-and-drop planning experience.', detail: 'Contributed Next.js UI and API work with MongoDB, and hosted frontend training sessions for new members.', tags: ['Next.js', 'MongoDB', 'Mentorship'], stage: 'Fall 2022', href: 'https://www.utdnebula.com/projects/planner' },
 { id: 'swarm', name: 'Swarm robotics', category: 'Research', description: 'Comparing decentralized robot cooperation through simulation and behavioral analysis.', detail: 'Simulated resource aggregation algorithms in C++ and Unreal Engine, analyzed results with Python, and presented at the ACM Research Symposium.', tags: ['C++', 'Simulation', 'Python'], stage: 'Fall 2021', href: 'https://github.com/Spaceface16518/resume' },
];
export const history = [
 { date: 'Recent work', title: 'Independent projects', text: 'Developer tools, desktop media workflows, wearable sensing, and creative AI infrastructure.', kind: 'Building' },
 { date: '2023–2024', title: 'Nebula Labs · Treasurer', text: 'Part of the student-led organization building software for the UT Dallas community.', kind: 'Community' },
 { date: 'Fall 2022', title: 'Degree Planner · UT Dallas', text: 'Next.js UI and API development, degree-plan validation, and frontend training for new contributors.', kind: 'Software' },
 { date: 'Fall 2021', title: 'ACM Research · Swarm robotics', text: 'Simulated decentralized cooperation and explored how simple rules produce collective behavior.', kind: 'Research' },
 { date: 'Summer 2020', title: 'ObjectWin · Mobile Applications Developer', text: 'Built a cross-platform timesheet application using Ionic, with an AWS Lightsail and SQL Server prototype.', kind: 'Work' },
];
