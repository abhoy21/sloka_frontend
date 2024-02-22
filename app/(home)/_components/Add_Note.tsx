"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const AddNoteComponent = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveChanges = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://sloka-backend.onrender.com/api/createdocument",
        { title, content },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log("Document created successfully:", response.data);

      window.location.reload();
      toast({
        description: "New Document Successfully!",
      });
    } catch (error) {
      console.error("Error creating document:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className=" mx-10">
      <div className="flex items-center justify-between pb-6">
        <h2 className="text-gray-500 text-lg">Add New Document</h2>
      </div>
      <div className="relative h-56 w-40 border-2 cursor-pointer hover:border-blue-700 dark:hover:border-yellow-500 ease-linear duration-200">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-52 w-38 border-background dark:border-[#1f1f1f] relative top-0 left-[10%] bg-background dark:bg-[#1f1f1f] hover:bg-background">
              <Plus className="h-20 w-20 text-blue-700 dark:text-yellow-500" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Short Notes</DialogTitle>
              <DialogDescription>Add a Quick note for now.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Note Title
                </Label>
                <Input
                  id="name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleSaveChanges}
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AddNoteComponent;
