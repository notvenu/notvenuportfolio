export const site = {
  name: "Venu Bhargava Jishith K",
  short: "Venu",
  handle: "notvenu",
  title: "Venu Bhargava Jishith K - Backend-leaning Full Stack Developer",
  description:
    "Backend-leaning full stack developer. I build REST APIs, payment flows and scheduling systems that run in production.",
  url: "https://notvenu.dev",
  email: "venu.kasibhatla@gmail.com",
  phone: "+91 7981669328",
  location: "Visakhapatnam, India",
  availability: "Open to internships, full-time roles and freelance work",
  socials: {
    github: "https://github.com/notvenu",
    linkedin: "https://linkedin.com/in/venu-kasibhatla",
    leetcode: "https://leetcode.com/u/notvenu",
    instagram: "https://instagram.com/veeennnuuu",
  },
} as const;

export const education = {
  degree: "B.Tech, Computer Science and Business Systems",
  school: "Vellore Institute of Technology, Vijayawada",
  period: "2023 - 2027",
  cgpa: "8.47",
} as const;

/** LeetCode split, as of the last resume update. Update when it moves. */
export const leetcode = { easy: 195, medium: 55, hard: 6 } as const;
export const leetcodeTotal = leetcode.easy + leetcode.medium + leetcode.hard;
