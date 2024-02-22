"use client";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import Quill from "quill";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "../../../../(home)/_components/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CopyIcon, Share } from "lucide-react";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useParams, useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";

const EditorComponent = () => {
  const [avatarImageUrl, setAvatarImageUrl] = useState(
    "https://github.com/shadcn.png"
  );
  const params = useParams<{ documentTitle: string; documentid: string }>();
  const [boolvalue, setBoolValue] = useState<boolean>(false);
  const [title, setTitle] = useState<string>();

  const { toast } = useToast();
  const router = useRouter();

  const handleToggle = () => {
    // Toggle the boolean value
    setBoolValue((prevBoolValue) => !prevBoolValue);
  };
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

  useEffect(() => {
    console.log(boolvalue); // This will log the updated value of boolvalue
  }, [boolvalue]); // Run this effect whenever boolvalue changes

  useEffect(() => {
    const handleViewedit = async () => {
      if (boolvalue === true) {
        try {
          const token = localStorage.getItem("token");
          console.log(token);
          const response = await axios.post(
            `https://sloka-backend.onrender.com/api/viewedit`,
            {
              id: parseInt(params.documentid),
              title: params.documentTitle,
              content: editorHtml,
            },
            {
              headers: {
                Authorization: `Token ${token}`,
              },
            }
          );
          console.log(response.data);
        } catch (error) {
          console.error("Error saving document:", error);
        }
      } else {
        console.log("Tui banchod");
      }
    };

    handleViewedit(); // Call handleViewedit here
  }, [boolvalue]); // Add boolValue to the dependency array

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

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://sloka-backend.onrender.com/api/editdoc",
        {
          id: parseInt(params.documentid),
          title: title,
          content: editorHtml,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log(response.data);
      toast({
        description: "Updates saved Successfully!",
      });
    } catch (error) {
      console.error("Error saving document:", error);
    }
  };

  const fetchDocumentContent = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `https://sloka-backend.onrender.com/api/getdocid/${params.documentid}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      const { title, content } = response.data;

      setTitle(title);
      setEditorHtml(content);
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };
  useEffect(() => {
    fetchDocumentContent();
  }, [params.documentid, fetchDocumentContent]);

  const [editorHtml, setEditorHtml] = useState("");
  useEffect(() => {
    var FontAttributor = Quill.import("attributors/class/font");
    FontAttributor.whitelist = [
      "sofia",
      "slabo",
      "roboto",
      "inconsolata",
      "ubuntu",
    ];
    Quill.register(FontAttributor, true);
  }, []);

  var toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction
    ["link", "image", "video", "formula"],
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ["clean"], // remove formatting button
  ];

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div>
      <header className="flex justify-between items-center p-3 pb-4">
        <span>
          <Logo />
        </span>
        <div className="flex-grow px-2">
          <div className="flex flex-grow items-center px-5 py-4 bg-gray-100 dark:bg-[#1f1f1f] text-gray-600 dark:text-[#f8f9fa] rounded-xl focus-within:shadow-md">
            <input
              value={title}
              onChange={handleTitleChange}
              onKeyDown={(e) => {
                if (e.ctrlKey && e.key === "s") {
                  e.preventDefault();
                  handleSave();
                }
              }}
              className="flex-grow px-5 text-3xl font-bold bg-transparent outline-none"
            />
          </div>

          <div className="flex items-center text-gray-600">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-transparent border-background dark:border-[#1f1f1f]"
                >
                  File
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Sloka</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={handleSave}>
                    Save
                    <DropdownMenuShortcut>⌘⇧S</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Download
                    <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="py-6 rounded-xl bg-blue-700 dark:bg-yellow-500 dark:border-gray-700 mx-4 hover:bg-blue-500 dark:hover:bg-yellow-700 ease-linear duration-300"
              >
                <span className="text-lg text-[#f8f9fa] dark:text-[#2f2f2f]">
                  Share
                </span>
                <Share className="ml-4 h-5 w-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                  Anyone who has this link will be able to view this.
                </DialogDescription>
              </DialogHeader>

              <div className="flex flex-row items-center justify-center space-x-2 mt-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <span className="text-primary font-md">View & Edit</span>
                  <Input id="link" defaultValue={params.documentid} readOnly />
                </div>

                {/* <Button
                  type="submit"
                  size="sm"
                  className="px-3"
                  onClick={handleViewedit}
                >
                  post
                </Button> */}
                <div className="mt-8">
                  <Switch onCheckedChange={handleToggle} />
                </div>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <ModeToggle />
        </div>
        <div className="mx-4 flex items-center">
          <Avatar className="cursor-pointer " onClick={handleLogout}>
            <AvatarImage src={avatarImageUrl} />
          </Avatar>
        </div>
      </header>
      <div className="flex justify-center sticky top-0 z-50 mx-auto py-16 h-screen">
        <div
          className="w-full lg:w-4/5 bg-[#f8f9fa] dark:bg-[#1f1f1f]"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.ctrlKey && e.key === "s") {
              e.preventDefault();
              handleSave();
            }
          }}
        >
          <ReactQuill
            modules={{ toolbar: toolbarOptions }}
            value={editorHtml}
            onChange={setEditorHtml}
            className=""
            style={{ width: "100%", height: "90%" }}
            theme="snow"
          />
        </div>
      </div>
    </div>
  );
};

export default EditorComponent;
