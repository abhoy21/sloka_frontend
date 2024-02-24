"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Delete,
  DeleteIcon,
  FileText,
  MoreVertical,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";

interface Document {
  id: number;
  title: string;
  created_at: string;
  updated_at: string;
}

const Each_Doc_Row_Component = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [delid, setDelId] = useState<number | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(
    null
  );

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(
        `https://sloka-backend.onrender.com/api/deletedoc/${delid}`
      );
      console.log("Document deleted successfully");
      toast({
        description: "Document Deleted Successfully!",
      });

      setDocuments(documents.filter((doc) => doc.id !== delid));
    } catch (error) {
      console.error("Error deleting document:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSearch = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.get<Document[]>(
        `https://sloka-backend.onrender.com/api/docsearch?query=${query}`,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
      console.log(response.data);
      setDocuments(response.data);
    } catch (err) {
      console.log(err);
      toast({
        description: "No results found",
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    handleSearch();
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const response = await axios.get<Document[]>(
          "https://sloka-backend.onrender.com/api/getdoc",
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );
        console.log(response.data);
        setDocuments(response.data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-grow items-center mb-16 px-5 py-4 bg-gray-100 dark:bg-[#2f2f2f] text-gray-600 dark:text-[#f8f9fa] rounded-xl focus-within:shadow-md">
        <Button variant="ghost" onClick={handleSearch}>
          <Search color="gold" className="hidden dark:inline-flex" />
          <Search color="blue" className="dark:hidden" />
        </Button>
        <input
          type="text"
          placeholder="Search..."
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          className="flex-grow px-5 text-base bg-transparent outline-none"
        />
      </div>

      {documents.map((document) => (
        <div
          key={document.id}
          className={`overflow-y-auto flex items-center justify-between py-4 pl-4 rounded-xl hover:bg-gray-100 ease-in-out duration-300 text-gray-700 dark:text-gray-500 dark:hover:bg-[#2f2f2f] cursor-pointer text-md ${
            selectedDocumentId === document.id ? "bg-blue-200" : ""
          }`}
        >
          <div
            className="flex flex-grow items-center justify-center"
            onClick={() => {
              setSelectedDocumentId(document.id);
              router.push(`/${document.title}/${document.id}/Editor`);
            }}
          >
            <FileText
              color="gold"
              className="h-10 w-10 hidden dark:inline-flex"
            />
            <FileText color="blue" className="h-10 w-10 dark:hidden" />
            <p className="flex-grow pl-5 w-12 pr-12 truncate  text-base text-black dark:text-white">
              {document.title}
            </p>
            <p className="hidden md:flex pr-5 text-lg">
              {selectedDocumentId === document.id
                ? document.updated_at
                : document.created_at}
            </p>
          </div>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className="rounded-full"
                onClick={() => setDelId(document.id)}
              >
                <Delete color="red" className="opacity-50" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you absolutely sure, you want to delete?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your Document and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ))}
    </div>
  );
};

export default Each_Doc_Row_Component;
