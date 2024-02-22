import Github_logo_light from "@/public/assets/github_light.svg";
import Github_logo_dark from "@/public/assets/github_dark.svg";
import Linkedin_logo_light from "@/public/assets/linkedin_light.svg";
import Linkedin_logo_dark from "@/public/assets/linkedin_dark.svg";
import Twitter_logo_light from "@/public/assets/twitter_light.svg";
import Twitter_logo_dark from "@/public/assets/twitter_dark.svg";
import Image from "next/image";

function Footer() {
  return (
    <section className="bg-[#f8f9fa] dark:bg-[#222]">
      <div className="max-w-screen-xl px-4 py-8 mx-auto overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center -mx-2 -my-2 text-center">
          <div className="px-2 py-2 w-full md:w-auto md:flex-grow md:flex md:justify-center">
            <a
              href="#"
              className="hidden md:block text-base leading-6 text-gray-500 hover:text-gray-900"
            >
              About
            </a>
            <a
              href="#"
              className="hidden md:block text-base leading-6 text-gray-500 hover:text-gray-900 mt-2 md:mt-0 md:ml-4"
            >
              Blog
            </a>
            <a
              href="#"
              className="hidden md:block text-base leading-6 text-gray-500 hover:text-gray-900 mt-2 md:mt-0 md:ml-4"
            >
              Terms & Conditions
            </a>
            <a
              href="#"
              className="hidden md:block text-base leading-6 text-gray-500 hover:text-gray-900 mt-2 md:mt-0 md:ml-4"
            >
              Pricing
            </a>
          </div>
        </nav>
        <div className="flex justify-center mt-6 space-x-6">
          <a
            href="https://github.com/abhoy21"
            className="hover:scale-110 ease-linear duration-300"
          >
            <Image
              src={Github_logo_light}
              alt="Github"
              className="w-9 dark:hidden"
            />
            <Image
              src={Github_logo_dark}
              alt="Github"
              className="w-9 hidden dark:inline-block"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/abhoy-sarkar/"
            className="hover:scale-110 ease-linear duration-300"
          >
            <Image
              src={Linkedin_logo_light}
              alt="Linkedin"
              className="w-9 dark:hidden"
            />
            <Image
              src={Linkedin_logo_dark}
              alt="Linkedin"
              className="w-9 hidden dark:inline-block"
            />
          </a>
          <a
            href="https://twitter.com/yourflickbong"
            className="hover:scale-110 ease-linear duration-300"
          >
            <Image
              src={Twitter_logo_light}
              alt="Twitter"
              className="w-9 dark:hidden"
            />
            <Image
              src={Twitter_logo_dark}
              alt="Twitter"
              className="w-9 hidden dark:inline-block"
            />
          </a>
        </div>
        <p className="mt-6 text-base leading-6 text-center text-gray-400">
          &copy; 2024 Abhoy Sarkar, Inc. All rights reserved.
        </p>
      </div>
    </section>
  );
}

export default Footer;
