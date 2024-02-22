import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";
import logo_img from "../../../public/assets/logo.svg";
import logo_dark_img from "../../../public/assets/logo-dark.svg";

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center justify-center">
        <Image
          src={logo_img}
          height="40"
          width="20"
          alt="Logo"
          className="dark:hidden"
        />
        <Image
          height="40"
          width="20"
          src={logo_dark_img}
          alt="Logo"
          className="hidden dark:block"
        />
        <p
          className={cn(
            "font-bold text-3xl dark:text-[#f8f9fa] text-[#1f1f1f] hidden md:inline-flex px-4"
          )}
        >
          Sloka
        </p>
      </div>
    </Link>
  );
};
