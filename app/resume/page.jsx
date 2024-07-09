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
import { SiTailwindcss, SiDotnet } from "react-icons/si";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi aut omnis ex facilis perferendis, delectus quae eos",
  info: [
    {
      fileName: "Name",
      fieldValue: "A.K.M Shah Alam",
    },
    {
      fileName: "Phone",
      fieldValue: "(+88) 01715 351 782",
    },
    {
      fileName: "Experience",
      fieldValue: "5+ Years",
    },
    {
      fileName: "Skype",
      fieldValue: "soykot007",
    },
    {
      fileName: "Nationality",
      fieldValue: "Bangladeshi",
    },
    {
      fileName: "Email",
      fieldValue: "a.k.mshahalam68@gmail.com",
    },
    {
      fileName: "Freelance",
      fieldValue: "Available",
    },
    {
      fileName: "Languages",
      fieldValue: "English,Bangla,Hindi",
    },
  ],
};

const experience = {
  icon: "",
  title: "My experience",
  description:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Excepturi aut omnis ex facilis perferendis, delectus quae eos.",
  items: [
    {
      company: "Astha IT Research & Consultancy Ltd",
      position: "Inter Software Engineer",
      duration: "2024 Mar - 2024 Jun",
    },
    {
      company: "Fiverr.com",
      position: "Freelance Wordpress Web Designer",
      duration: "2019 Feb - 2021 Dec ",
    },
    {
      company: "Branding By Branden",
      position: "Freelance Wordpress Web Designer",
      duration: "2019 Feb - 2023 Dec",
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
      degree: "B.Sc. in Electrical & Electronic Engineering (EEE)",
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
      icon: <FaReact />,
      name: "react.js",
    },
    {
      icon: <SiDotnet />,
      name: "Next.js",
    },
    {
      icon: <SiTailwindcss />,
      name: "tailwind.css",
    },
    {
      icon: <FaNodeJs />,
      name: "node.Js",
    },
    {
      icon: "/assets/c-sharp-c.svg",
      name: "tailwind.css",
    },
    {
      icon: <FaFigma />,
      name: "figma",
    },
    {
      icon: <FaJira />,
      name: "tailwind.css",
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
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
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
            <TabsContent value="experience">experience</TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;
