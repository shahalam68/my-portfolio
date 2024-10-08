"use client";
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaFigma,
  FaNodeJs,
  FaJira,
} from "react-icons/fa";
import { SiTailwindcss, SiDotnet,SiMongodb, SiPostgresql  } from "react-icons/si";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {CSharpIcon} from "/public/assets/c-sharp-c.svg"; 
import { TbBrandCSharp } from "react-icons/tb";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const about = {
  title: "About me",
  description:
    "A highly motivated and ambitious Full-Stack Web Developer with expertise in React.js and .NET. Known for delivering clean, efficient, and reusable code while advancing web development to improve user experiences. Continuously adapting to new technologies and passionate about delivering high-quality solutions.",
  info: [
    {
      filedName: "Name:",
      fieldValue: "A.K.M Shah Alam",
    },
    {
      filedName: "Phone:",
      fieldValue: "(+88) 01715 351 782",
    },
    {
      filedName: "Experience:",
      fieldValue: "5+ Years",
    },
    {
      filedName: "Skype:",
      fieldValue: "soykot007",
    },
    {
      filedName: "Nationality:",
      fieldValue: "Bangladeshi",
    },
    {
      filedName: "Email:",
      fieldValue: "a.k.mshahalam68@gmail.com",
    },
    {
      filedName: "Freelance:",
      fieldValue: "Available",
    },
    {
      filedName: "Languages:",
      fieldValue: "English, Bangla, Hindi",
    },
  ],
};

const experience = {
  icon: "", // You can add an appropriate icon here
  title: "My Experience",
  description:
    "With a diverse background in web development, I have gained significant expertise working with multiple frameworks and platforms. From freelance WordPress design to full-stack development using Next.js and ASP.Net, I continuously strive to deliver optimized and scalable solutions.",
  items: [
    {
      company: "TechForing Ltd.",
      position: "Frontend Developer",
      duration: "2024 Aug - Present",
      description: "Focused on designing and developing reactive web applications using Next.js, managing states, and integrating APIs for real-time data updates. Participated in code reviews and collaborated with the team to maintain coding standards.",
      techStack: "Next.js, TypeScript, React Query, Zustand, Material UI, Tailwind CSS",
    },
    {
      company: "Astha IT Research & Consultancy Ltd.",
      position: "Software Engineer (Intern)",
      duration: "2024 Mar - 2024 Jun",
      description: "Developed reactive web applications using Next.js and ASP.Net Core. Managed states with Zustand, integrated APIs for real-time data updates, and participated in code reviews.",
      techStack: "Next.js, TypeScript, React Query, Zustand, Material UI, ASP.Net Core Web API, PostgreSQL",
    },
    {
      company: "Fiverr",
      position: "Freelance WordPress Web Designer",
      duration: "2019 Feb - 2023 Dec",
      description: "Completed over 50 projects as a freelance WordPress designer. Built e-commerce websites using Woocommerce and collaborated with various clients to deliver customized web solutions.",
      techStack: "WordPress, Woocommerce",
    },
  ],
};


const education = {
  icon: "",
  title: "My education",
  description:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi aut omnis ex facilis perferendis, delectus quae eos.",
  items: [
    {
      institution: "SoftTech-IT Institute",
      degree: "Wordpress Development Course",
      duration: "2019",
    },
    {
      institution: "Programming Hero",
      degree: "Complete Web Development Course",
      duration: "2022",
    },
    {
      institution: "Learn With Sumit",
      degree: "React and NextJs ",
      duration: "2024",
    },
    {
      institution: "Online Course",
      degree: "C# .NET Core 8 with MS SQL Complete Beginner to Master",
      duration: "2023",
    },
    {
      institution: "Nachole Pilot High school ",
      degree: "Secondary School Certificate",
      duration: "2010",
    },
    {
      institution: "Rajshahi Government City College",
      degree: "Higher Secondary Certificate",
      duration: "2012",
    },
    {
      institution: "United International University",
      degree: "B.Sc. in Electrical & Electronic Engineering",
      duration: "2019",
    },
  ],
};
const skills = {
  title: "My skills",
  description:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi aut omnis ex facilis perferendis, delectus quae eos.",
  skillList: [
    {
      icon: <FaHtml5 />,
      name: "html 5",
    },
    {
      icon: <FaCss3 />,
      name: "css 3",
    },
    {
      icon: <FaJs />,
      name: "javascript",
    },
    {
      icon: <TbBrandCSharp />,
      name: "c sharp",
    },
    {
      icon: <FaReact />,
      name: "react.js",
    },
    {
      icon: <SiDotnet />,
      name: "ASP.NET",
    },
    {
      icon: <SiTailwindcss />,
      name: "tailwind.css",
    },
    {
      icon: <FaNodeJs />,
      name: "Node.Js",
    },
    
    
    {
      icon: <SiMongodb />,
      name: "MongoDB",
    },
    {
      icon: <SiPostgresql />,
      name: "PostgreSQL",
    },
    {
      icon: <FaJira />,
      name: "Jira",
    },
    {
      icon: <FaFigma />,
      name: "Figma",
    },
  ],
};
const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4 },
        duration: 0.4,
        ease: "easeIn",
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0 xl:mb-10"
    >
      <div className="container max-auto">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px]"
        >
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About me</TabsTrigger>
          </TabsList>
          <div className="min-h-[70vh] w-full">
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-[600px] text-white/60">
                  {experience.description}
                </p>
                <ScrollArea className="h-[400px] ">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {experience.items.map((item, index) => {
                      return (
                        <li
                          key={item.index}
                          className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-center gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[360px] text-center min-h-[60px] lg:text-left">
                            {item.position}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.company}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{education.title}</h3>
                <p className="max-w-[600px] text-white/60">
                  {education.description}
                </p>
                <ScrollArea className="h-[400px] ">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {education.items.map((item, index) => {
                      return (
                        <li
                          key={item.index}
                          className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-center gap-1"
                        >
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[360px] text-center min-h-[60px] lg:text-left">
                            {item.degree}
                          </h3>
                          <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                            <p className="text-white/60">{item.institution}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{skills.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{skills.description}</p>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:gap-[30px] gap-4">
                  {skills.skillList.map((skill,index) =>{
                    return <li key={index}> <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group">
                          <div className="text-6xl group-hover:text-accent transition-all duration-300">{skill.icon}</div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="capitalize">{skill.name}</p>
                        </TooltipContent>
                      </Tooltip>
                      </TooltipProvider>
                      </li>
                  })}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="about" className="w-ful text-center xl:text-left">
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{about.description}</p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                  {about.info.map((item,index)=>{
                    return <li key={item} className="flex items-center justify-center xl:justify-start gap-4">
                      <span className="text-white/60">{item.filedName}</span>
                      <span className="text-xl">{item.fieldValue}</span>
                    </li>
                  })}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
