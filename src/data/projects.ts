interface Project {
  title: string;
  description: string;
  image?: { src: string; alt: string };
  technologies?: readonly string[];
  links?: readonly { label: string; href: string }[];
}

export const projects: readonly Project[] = [
  {
    title: "ServiceUNSW",
    description: `Team Lead for the backend layer for a services platform working on supporting UNSW services including Makerspace and InPlace.

    - Built a robust backend APIs using TypeScript, Node.js, Prisma and MySQL to support
    core application functionality, including authentication.

    -  Designed the project’s AWS infrastructure and deployment architecture, considering scalability, availability and maintainability for a potential user base of up to 70,000 UNSW students and staff.

    - Established development standards and introduced Agile workflows, Git-based collaboration and DevOps practices to improve team coordination and code quality.`,

    technologies: ["aws", "typescript", "express.js", "prisma"],
    links: [
      {
        label: "ServiceUNSW",
        href: "https://www.unsw.edu.au/challeng/vertically-integrated-projects/explore-vertically-integrated-projects/Service-UNSW",
      },
    ],
  },
];
