export const profile = {
  name: 'Amrit Rathie',
  email: 'amrit.rathie@gmail.com',
  github: 'https://github.com/Spaceface16518',
  linkedin: 'https://www.linkedin.com/in/amrit-rathie',
  intro: 'Full-stack software engineer at Fidelity Investments and founder & CTO of POWERPERCEPT. Based in Grapevine, Texas.',
  about: 'I work on backend systems, applied AI, and embedded hardware. At Fidelity, I build tooling and shared infrastructure for financial applications. At POWERPERCEPT, I develop a smart-insole platform spanning electronics, firmware, and mobile apps.',
  community: 'I studied computer science at UT Dallas from 2021 to 2024. I’ve also judged and mentored at HackUTD, WEHack, and Axxess Hackathon, and served as treasurer of Nebula Labs.',
};
export const projects = [
  { id: 'powerpercept', name: 'POWERPERCEPT', category: 'Hardware', stage: '2025–present · Founder & CTO', description: 'A smart-insole platform for collecting pressure data and visualizing movement.', detail: 'My work includes custom circuit boards, BLE firmware, Swift and React Native apps, and in-house manufacturing.', tags: ['Embedded', 'BLE', 'KiCad', 'Swift'], href: null },
  { id: 'cloudcare', name: 'CloudCare', category: 'AI', stage: '2024 · TAMUHack', description: 'An in-flight infotainment prototype with a travel assistant, lost-item detection, and gesture controls.', detail: 'Built with GPT-4 Vision, MediaPipe, and WebSockets. Won first place in the American Airlines Challenge at TAMUHack 2024.', tags: ['Computer vision', 'MediaPipe', 'WebSockets'], href: 'https://github.com/Spaceface16518/CloudCare' },
  { id: 'harmony', name: 'Harmony', category: 'AI', stage: '2023 · HackTX', description: 'An SMS and phone-based prototype supporting communication and team wellbeing for construction workers.', detail: 'Deployed a Falcon language model on a cloud GPU and integrated Twilio communication. Won first place in the Procore Challenge at HackTX.', tags: ['Twilio', 'Node.js', 'Falcon'], href: null },
  { id: 'flight-insight', name: 'Flight Insight', category: 'Hardware', stage: '2023 · TAMUHack', description: 'An in-cabin platform displaying turbulence, temperature, humidity, and destination weather information.', detail: 'Connected a custom sensor array to passenger displays and integrated National Weather Service updates. Won first place at TAMUHack 2023.', tags: ['Rust', 'Arduino', 'Svelte'], href: null },
  { id: 'elevator-pitch', name: 'Elevator Pitch', category: 'AI', stage: '2023 · HackSMU', description: 'A prototype that transcribes and categorizes elevator complaints to help identify maintenance issues.', detail: 'Combined wav2vec2 speech recognition with BART and FLAN classification. Placed second at HackSMU.', tags: ['Speech recognition', 'Python', 'Streamlit'], href: 'https://github.com/Spaceface16518/elevator-pitch' },
  { id: 'locking', name: 'Scalable locking algorithms', category: 'Research', stage: 'Fall 2023 · Undergraduate research', description: 'Research into synchronization for large multicore systems and persistent memory.', detail: 'Implemented a new locking algorithm alongside five established algorithms. Built benchmarks using Linux interposition and ran parameter sweeps on TACC with SLURM.', tags: ['C', 'OpenMP', 'SLURM'], href: 'https://github.com/Spaceface16518/locking' },
  { id: 'systems-integration', name: 'Systems Integration Pipeline', category: 'Research', stage: 'Fall 2023 · Research', description: 'Automated integration testing using systems models and virtualized environments.', detail: 'Built a data core exposing SysML models and root-cause analysis using requirements and test results to identify failing components.', tags: ['FastAPI', 'Libvirt', 'RHEL'], href: null },
];
// Ordered by start date, oldest first. Education precedes the internship.
export const history = [
  { date: '2021–2024', title: 'UT Dallas · B.S. Computer Science', text: 'Completed May 2024. Academic Excellence Scholarship and Dean’s List.' },
  { date: 'Mar–Dec 2023', title: 'EXPANSIA · Full-stack Developer Intern', text: 'Aircraft-parts data pipelines, manufacturing feasibility analysis, and language-model report summarization.' },
  { date: 'Jun 2024–present', title: 'Fidelity Investments · Full-Stack Software Engineer', text: 'API migration tooling, shared configuration and storage infrastructure, and data-pipeline observability.' },
  { date: 'Feb 2025–present', title: 'POWERPERCEPT · Founder & CTO', text: 'Wearable electronics, firmware, mobile apps, and manufacturing for a smart-insole platform.' },
];
