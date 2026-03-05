export const projects = [
  {
    num: "01",
    category: "Fullstack",
    title: "Lumina PTE",
    slug: "lumina-pte",
    description:
      "A scalable multi-tenant PTE test platform serving 3,000+ users. Features include question management, real-time exam workflows using WebSocket with AI scoring, and PayStation integration for payments.",
    detailedDescription: "Lumina PTE is a comprehensive AI-powered platform designed for Pearson Test of English (PTE) academic preparation. It serves both B2B (organizations) and B2C (students) segments.",
    caseStudy: {
      challenge: "Building a real-time exam simulation that could handle 3,000+ simultaneous users while providing instant, AI-driven feedback was a significant technical hurdle. The platform needed to maintain low latency for WebSocket communications and ensure high availability during peak exam periods.",
      solution: "Implemented a robust microservices architecture using Next.js and Node.js. Used WebSockets for live exam synchronization and integrated advanced AI scoring models via REST APIs. Optimized MongoDB queries and used TanStack Query for efficient client-side state management and caching.",
      impact: "Successfully scaled the platform to serve 3,000+ active users. Improved average test completion rates by 40% through real-time feedback and reduced server response times by 50% using optimized caching strategies."
    },
    stack: [
      { name: "Next.js" },
      { name: "Node.js" },
      { name: "MongoDB" },
      { name: "WebSocket" },
      { name: "TanStack Query" },
    ],
    image: "/work/readylab.png",
    images: [
      "/work/readylab.png",
      "/work/gamebd.png",
      "/work/techforing.jpg",
    ],
    live: "https://luminapte.com",
    github: "https://github.com/shahalam68/",
    workplace: "Game BD",
  },
  {
    num: "02",
    category: "Fullstack",
    title: "GameBD Loyalty Platform",
    slug: "gamebd-loyalty",
    description:
      "A gamified loyalty platform serving 6,000+ users. Contributed to secure authentication, scalable frontend architecture, reward modules, and bKash payment integration.",
    detailedDescription: "GameBD is a cutting-edge loyalty and rewards platform listing inside the official bKash App. It leverages gamification to enhance user engagement for brands.",
    caseStudy: {
      challenge: "The primary challenge was integrating a complex gamification engine with a secure financial ecosystem (bKash) while maintaining a high-performance frontend for 6,000+ users inside the resource-constrained bKash App environment.",
      solution: "Developed a secure authentication system using refresh/access token strategies. Optimized the React frontend for peak performance in mobile webviews. Built modular reward and transaction systems that integrated seamlessly with the bKash payment gateway.",
      impact: "Achieved a successful launch within the bKash App, reaching over 6,000 users. Increased user retention by 25% through interactive challenges and secure, instant reward processing."
    },
    stack: [
      { name: "Next.js 15" },
      { name: "TypeScript" },
      { name: "TanStack Query" },
      { name: "Zustand" },
      { name: "MongoDB" },
      { name: "Auth.js" },
    ],
    image: "/work/gamebd.png",
    images: [
      "/work/gamebd.png",
      "/work/readylab.png",
      "/work/techforing.jpg",
    ],
    live: "https://play.gamebd.co/en",
    github: "https://github.com/shahalam68/",
    workplace: "Game BD",
  },
  {
    num: "03",
    category: "Frontend",
    title: "TechForing Corporate & Career",
    slug: "techforing-corporate",
    description:
      "Corporate website and career platform. Developed reusable components, improved performance and SEO, and integrated REST APIs across CMS and HRMS systems.",
    detailedDescription: "TechForing's digital presence required a modern, high-performance overhaul to support its growth as a leading cybersecurity consulting firm.",
    caseStudy: {
      challenge: "The legacy platform suffered from slow load times and a disjointed user experience across its corporate and career sites, impacting both client conversion and talent acquisition.",
      solution: "Spearheaded the development of a unified UI component library using Next.js and Shadcn UI. Optimized SEO structures and image delivery to boost search rankings. Integrated complex REST APIs for real-time job listings and application tracking.",
      impact: "Reduced page load times by 60%, leading to a 20% increase in job applications. Improved SEO visibility by 35% through better semantic structure and metadata management."
    },
    stack: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Tailwind CSS" },
      { name: "Shadcn UI" },
      { name: "Zustand" },
    ],
    image: "/work/techforing.jpg",
    images: [
      "/work/techforing.jpg",
      "/work/hrms.png",
      "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
    ],
    live: "https://techforing.com",
    github: "https://github.com/shahalam68/",
    workplace: "TechForing Ltd.",
  },
  {
    num: "04",
    category: "Fullstack",
    title: "Amar Plot",
    slug: "amar-plot",
    description:
      "A property marketplace platform that allows users to buy, sell, and rent properties. Features include secure authentication, property listings with images, and a smooth responsive UI.",
    detailedDescription: "Amar Plot is a full-stack property marketplace inspired by modern real estate platforms, built to solve the fragmentation in the local property market.",
    caseStudy: {
      challenge: "Creating a trust-based property marketplace required a robust authentication system and an intuitive way to manage large amounts of media-rich property listings.",
      solution: "Build a high-performance property search engine with advanced filtering. Implemented secure user dashboards for property management and integrated Cloudinary for optimized image storage and delivery.",
      impact: "Successfully created a functional MVP that handles thousands of properties. The smooth, responsive UI led to high user satisfaction during initial beta testing."
    },
    stack: [
      { name: "TypeScript" },
      { name: "Next.js" },
      { name: "Shadcn UI" },
      { name: "Node.js" },
    ],
    image: "/work/amarplot.jpg",
    images: [
      "/work/amarplot.jpg",
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1582408921715-18e7806365c1?q=80&w=2070&auto=format&fit=crop",
    ],
    live: "https://amarplot.com",
    github: "https://github.com/shahalam68/",
    workplace: "Personal Project",
  },
];
