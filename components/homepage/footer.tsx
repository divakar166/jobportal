import Link from "next/link";
import {
  FaTwitter,
  FaGithub,
  FaLinkedin,
  FaRegCopyright,
} from "react-icons/fa";
import Logo from "./logo";

const Footer = () => {
  return (
    <div className="px-10 mb-4 w-full">
      {/* <div>Made by <a href="https://github.com/divakar166" className="text-lg font-bold bg-gradient-to-b from-[#870000] to-[#190A05] dark:bg-gradient-to-r dark:from-[#c471f5] dark:to-[#fa71cd] bg-clip-text" style={{"-webkit-text-fill-color":"transparent"}}>Divakar Singh</a></div> */}
      <div className="flex justify-around items-center w-full pb-4 mb-10">
        <div className="w-[10%] ">
          <Link href='/' className="rounded-full bg-transparent flex justify-center items-center relative">
            <div className="w-8 h-8 flex items-center justify-center" >
              <Logo />
            </div>
            <span className="font-bold text-black dark:text-white  text-lg ml-2">
              Connect
            </span>
          </Link>
        </div>
        <div className="flex justify-around items-center w-1/2">
          <Link className="menu__link text-black dark:text-slate-200" href="/jobs">
            Find a Job
          </Link>
          <Link className="menu__link text-black dark:text-slate-200" href="/companies">
            Companies
          </Link>
          <Link className="menu__link text-black dark:text-slate-200" href="/about">
            Why Connect?
          </Link>
          <Link className="menu__link text-black dark:text-slate-200" href="/contact">
            Contact
          </Link>
        </div>
        <div className="flex justify-around items-center w-[10%] text-slate-400">
          <a
            className="hover:text-black dark:hover:text-white cursor-pointer text-xl"
            href="https://x.com/divakarsingh166"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            className="hover:text-black dark:hover:text-white cursor-pointer text-xl"
            href="https://github.com/divakar166"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            className="hover:text-black dark:hover:text-white cursor-pointer text-xl"
            href="https://www.linkedin.com/in/divakar-singh"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
      <div className="flex justify-between items-center px-2 text-slate-400">
        <div className="flex justify-center items-center">
          <FaRegCopyright /> 2024 Connect. All rights reserved.
        </div>
        <div className="flex justify-around items-center w-1/3 ">
          <Link href="#" className="hover:text-black dark:hover:text-slate-50">Terms of Service</Link>
          <Link href="#" className="hover:text-black dark:hover:text-slate-50">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;