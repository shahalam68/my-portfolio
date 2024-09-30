import { icons } from "lucide-react";
import Link from "next/link";
import {FaGithub,FaLinkedinIn,FaTwitter} from 'react-icons/fa';
const socials = [
    {icons:<FaGithub/>,path:'https://github.com/shahalam68'},
    {icons:<FaLinkedinIn/>,path:'https://www.linkedin.com/in/a-k-m-shah-alam'},
    {icons:<FaTwitter/>,path:''},
]
const Social = ({containerStyles,iconStyles}) => {
    return (
        <div className={containerStyles}>
            {socials.map((item,index) => {
                return <Link key={index} href={item.path} className={iconStyles}> {item.icons}</Link>
            })}
        </div>
    );
};

export default Social;