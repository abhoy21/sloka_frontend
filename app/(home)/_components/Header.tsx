"use client";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

import { Logo } from "./Logo";

import { useRouter } from "next/navigation";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";

const Header = () => {
  const [avatarImageUrl, setAvatarImageUrl] = useState(
    "https://github.com/shadcn.png"
  );
  const [docid, setDocid] = useState("");
  const { toast } = useToast();

  const router = useRouter();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://sloka-backend.onrender.com/api/userdetails",
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
        console.log(response.data.imageURL);
        await setAvatarImageUrl(
          response.data.imageURL || "https://github.com/shadcn.png"
        );
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  const handleSearch = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.get<Document[]>(
        `https://sloka-backend.onrender.com/api/getdocid/${docid}`,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
      console.log(response.data);

      const title = response.data[0]?.title;

      router.push(`/${title}/${docid}/ViewEditor`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = (): void => {
    try {
      localStorage.removeItem("token");
      console.log("Logout successful");
      toast({
        description: "Successfully SignedOut!",
      });

      router.push("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const scrolled = useScrollTop();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className={cn(
        "sticky top-0 z-50 flex items-center bg-background dark:bg-[#1F1F1F] px-2 md:px-4 py-2 shadow-sm",
        scrolled && "border-b shadow-md"
      )}
    >
      <div className="flex items-center mx-2">
        <Logo />
      </div>

      <div className="flex flex-grow items-center mx-2 md:mx-5 px-2 md:px-5 py-2 md:py-4 bg-gray-100 dark:bg-[#2f2f2f] text-gray-600 dark:text-[#f8f9fa] rounded-xl focus-within:shadow-md">
        <Button variant="ghost" onSubmit={handleSearch}>
          <Search color="gold" className="hidden dark:inline-flex" />
          <Search color="blue" className="dark:hidden" />
        </Button>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setDocid(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-grow px-2 md:px-5 text-sm md:text-base bg-transparent outline-none"
        />
      </div>

      <div>
        <ModeToggle />
      </div>
      <div className="mx-2 md:mx-4 flex items-center">
        <Avatar className="cursor-pointer " onClick={handleLogout}>
          <AvatarImage src={avatarImageUrl} />
        </Avatar>
      </div>
    </div>
  );
};

export default Header;
