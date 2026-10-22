// ============================================================================
//  CONTENT FILE: edit everything about the site here.
//  Images: put files in /public and reference them as "/your-file.png".
//  Leave `image` empty ('') to show the built-in CSS device mockup instead.
//  Optional: add `gallery: ['/projects/x-2.png', '/projects/x-3.png']` for extra screenshots.
// ============================================================================

// WhatsApp chat opened by the Let's Collaborate / Let's Talk buttons.
// Number in international format, digits only (Pakistan: 0349... becomes 92349...).
export const whatsapp = {
  number: '923457404390',
  message: "Hi Yasser! I came across your portfolio and I'd like to discuss a project with you.",
}

export const whatsappUrl = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message)}`

export const brand = {
  name: 'Yasser Kaleem', // navbar, footer, page title, meta tags
  heroOutline: 'YASSER', // hero text, outline style
  heroSolid: 'KALEEM', // hero text, solid style
  tagline: 'UI/UX Designer',
  email: 'kaleemnasir85@gmail.com',
  availability: 'Available for New Project',
  copyright: `© ${new Date().getFullYear()} Yasser Kaleem. All rights reserved.`,
}

// Your cut-out black & white portrait (transparent PNG).
// Put it in /public and set the path, e.g. '/me.png'. Leave '' for placeholder.
export const portrait = ''

export const hero = {
  description:
    'Designing clear, user-centered digital products — web and mobile interfaces that feel effortless and look premium.',
  ctaLabel: "Let's collaborate",
}

export const socials = [
  { label: 'Dribbble', handle: 'dribbble.com/yasserkaleem', href: 'https://dribbble.com/', icon: 'dribbble' },
  { label: 'Behance', handle: 'behance.net/yasserkaleem', href: 'https://behance.net/', icon: 'behance' },
  { label: 'Instagram', handle: '@yasser.kaleem', href: 'https://www.instagram.com/yaxer.jan/', icon: 'instagram' },
  { label: 'LinkedIn', handle: 'linkedin.com/in/yasserkaleem', href: 'https://www.linkedin.com/in/muhammad-yasser-kaleem-a9686b366/?isSelfProfile=false', icon: 'linkedin' },
]

// Work / selected projects. `gradient` colours the placeholder mockup.
// Sample screenshots live in /public/projects (SVG). Swap in your own files with the same paths or new ones.
export const projects = [
  {
    id: 'nova-finance',
    title: 'Nova Finance — Banking App Redesign',
    shortTitle: 'Nova Finance',
    tags: ['Mobile App', 'Fintech'],
    category: 'Mobile App Design',
    client: 'Fintech Startup',
    description:
      'A complete UX overhaul of a mobile banking app — simplifying transfers, balances and spending insights into a calm, trustworthy interface that users actually enjoy opening.',
    services: 'UX Research, UI Design, Prototyping',
    timeline: '4 Weeks',
    tools: ['Figma', 'Protopie'],
    liveUrl: 'https://example.com',
    image: '/projects/nova-finance.svg',
    gallery: ['/projects/nova-finance-2.svg', '/projects/nova-finance-3.svg'],
    gradient: 'from-[#1b2a4a] to-[#0b1220]',
    accent: '#5B8DEF',
  },
  {
    id: 'lumen-store',
    title: 'Lumen Store — E-commerce Website',
    shortTitle: 'Lumen Store',
    tags: ['Website', 'E-commerce'],
    category: 'Web Design',
    client: 'D2C Retail Brand',
    description:
      'A warm, editorial-style storefront redesign that puts product photography front and center and trims the checkout flow down to three clear steps.',
    services: 'UI Design, Web Design, Design System',
    timeline: '3 Weeks',
    tools: ['Figma', 'Webflow'],
    liveUrl: 'https://example.com',
    image: '/projects/lumen-store.svg',
    gallery: ['/projects/lumen-store-2.svg', '/projects/lumen-store-3.svg'],
    gradient: 'from-[#caa06a] to-[#2a2016]',
    accent: '#D98455',
  },
  {
    id: 'quickbite',
    title: 'QuickBite — Food Delivery App',
    shortTitle: 'QuickBite',
    tags: ['Mobile App', 'Food Delivery'],
    category: 'Mobile App Design',
    client: 'Food Delivery Startup',
    description:
      'An appetite-driven app design focused on fast reordering, live order tracking and a menu browsing experience that feels as good as the food looks.',
    services: 'UI/UX Design, Interaction Design',
    timeline: '5 Weeks',
    tools: ['Figma', 'Adobe XD'],
    liveUrl: 'https://example.com',
    image: '/projects/quickbite.svg',
    gallery: ['/projects/quickbite-2.svg', '/projects/quickbite-3.svg'],
    gradient: 'from-[#6b2a22] to-[#1c0d0a]',
    accent: '#FF6B4A',
  },
  {
    id: 'pulse-analytics',
    title: 'Pulse Analytics — SaaS Dashboard',
    shortTitle: 'Pulse Analytics',
    tags: ['Web App', 'Dashboard'],
    category: 'Product Design',
    client: 'SaaS Company',
    description:
      'A data-dense analytics dashboard restructured around three key questions, cutting time-to-insight with clearer charts, a tidy design system and a dark mode.',
    services: 'UI/UX Design, Design System',
    timeline: '6 Weeks',
    tools: ['Figma', 'Framer'],
    liveUrl: 'https://example.com',
    image: '/projects/pulse-analytics.svg',
    gallery: ['/projects/pulse-analytics-2.svg', '/projects/pulse-analytics-3.svg'],
    gradient: 'from-[#3a2a6b] to-[#120c24]',
    accent: '#9D7BFF',
  },
]

export const services = [
  { title: 'UI/UX DESIGN', description: 'User research, wireframes and high-fidelity interfaces that feel effortless to use.', href: '#contact' },
  { title: 'WEB DESIGN', description: 'Responsive, conversion-focused websites designed in Figma and built to scale.', href: '#contact' },
  { title: 'MOBILE APP DESIGN', description: 'Native-feeling iOS & Android app design, from user flow to final pixel.', href: '#contact' },
  { title: 'DESIGN SYSTEMS', description: 'Reusable component libraries and style guides that keep products consistent.', href: '#contact' },
]

// `preview` is the image shown when hovering a row on desktop (path or '').
export const experience = {
  tagline: 'Designing digital products since 2021',
  items: [
    {
      name: 'Freelance Product Designer',
      role: 'UI/UX Design',
      period: '2025 — Present',
      details: 'Designing web and mobile products end-to-end for startups and small businesses worldwide.',
      preview: '',
      gradient: 'from-[#444] to-[#151515]',
    },
    {
      name: 'UI/UX Designer',
      role: 'SaaS & Fintech Products',
      period: '2023 — 2025',
      details: 'Led end-to-end design for dashboards, mobile apps and design systems used by thousands of users.',
      preview: '',
      gradient: 'from-[#3b3b3b] to-[#101010]',
    },
    {
      name: 'Junior UI Designer',
      role: 'Visual & Interaction Design',
      period: '2021 — 2023',
      details: 'Started the journey: wireframing, prototyping and visual design for client projects.',
      preview: '',
      gradient: 'from-[#4d4d4d] to-[#1b1b1b]',
    },
  ],
}

export const contact = {
  heading: 'HAVE A PROJECT IN MIND?',
  cta: "Let's Talk",
}
