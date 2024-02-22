"use client";

import Image from "next/image";
import Register_Img from "../../public/assets/register_image.jpeg";
import Google_light_Img from "../../public/assets/google_light.svg";
import Google_Dark_Img from "../../public/assets/google_dark.svg";
import Github_Light_Img from "../../public/assets/github_light.svg";
import Github_Dark_Img from "../../public/assets/github_dark.svg";
import { useToast } from "@/components/ui/use-toast";
import { ChangeEvent, FormEvent, useState } from "react";

import Link from "next/link";
import {
  CircleUserRound,
  LockKeyhole,
  Mail,
  PencilLineIcon,
  UploadCloud,
} from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { imageDB } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface FormData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  imageURL: string;
}

const RegistrationForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [imageFile, setImageFile] = useState<File | null>(null); // Specify the type as File | null
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [imageUrl, setImageUrl] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    imageURL: "",
  });

  const [fileSelected, setFileSelected] = useState(false);

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setFileSelected(true); // Set fileSelected to true when a file is selected
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageURL = "";
    if (imageFile) {
      const storageRef = ref(imageDB, imageFile.name);
      await uploadBytes(storageRef, imageFile);
      imageURL = await getDownloadURL(storageRef);
      console.log(imageURL);
    }
    if (formData.password !== confirmPassword) {
      console.log("Passwords do not match");
      toast({
        description: "Password does not match with Confirm-Password!",
      });
      return;
    }

    try {
      const formDataWithImage = { ...formData, imageURL: imageURL };

      const response = await axios.post(
        // "https://sloka-backend.onrender.com/api/register",
        "https://sloka-backend.onrender.com/api/register",
        formDataWithImage
      );
      console.log("User registered successfully:", response.data);
      toast({
        description: "Registration Successfully!",
      });
      router.push("/login");
    } catch (error) {
      console.error(
        "Error Registering User:",
        (error as { response?: { data?: { error: string } } })?.response?.data
          ?.error
      );
      // Handle error, show a message to the user, etc.
    }
  };
  return (
    <section className="flex items-center justify-center bg-[#f8f9fa] dark:bg-[#1f1f1f] min-h-screen">
      <div className="flex shadow-lg rounded-3xl p-5">
        <div className="hidden md:inline-flex">
          <Link href="/">
            <div className="w-full h-[98%] mx-2 rounded-3xl cursor-pointer">
              <Image
                src={Register_Img}
                alt="Register Image"
                className="w-full h-full rounded-3xl"
              />
            </div>
          </Link>
        </div>
        <div className="max-w-4xl w-full bg-[#f8f9fa] dark:bg-[#1f1f1f] p-8 shadow-md rounded-xl m-2">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-300 text-center mb-6">
            Create an Account
          </h2>
          <p className="text-gray-500 text-center text-base my-4">
            If you don&apos;t have an account, please sign up below:
          </p>

          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="flex space-x-8 pt-8">
              <div className="flex flex-grow items-center px-5 py-4 bg-[#F8F4FF] shadow-md dark:bg-[#2f2f2f] text-gray-600 rounded-xl focus-within:text-gray-600 focus-within:shadow-lg">
                <input
                  type="text"
                  placeholder="First Name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className="flex-grow px-5 text-base bg-transparent outline-none"
                />
              </div>
              <div className="flex flex-grow items-center px-5 py-4 bg-[#F8F4FF] shadow-md dark:bg-[#2f2f2f] text-gray-600 rounded-xl focus-within:text-gray-600 focus-within:shadow-lg">
                <input
                  type="text"
                  placeholder="Last Name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="flex-grow px-5 text-base bg-transparent outline-none"
                />
              </div>
            </div>
            <div className="flex flex-grow items-center px-5 py-4 bg-[#F8F4FF] shadow-md dark:bg-[#2f2f2f] text-gray-600 rounded-xl focus-within:text-gray-600 focus-within:shadow-lg">
              <Mail color="gold" className="hidden dark:inline-flex h-7 w-7" />
              <Mail color="blue" className="dark:hidden h-7 w-7" />
              <input
                type="text"
                placeholder="abcd@gmail.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="flex-grow px-5 text-base bg-transparent outline-none"
              />
            </div>
            <div className="flex flex-grow items-center px-5 py-4 bg-[#F8F4FF] shadow-md dark:bg-[#2f2f2f] text-gray-600 rounded-xl focus-within:text-gray-600 focus-within:shadow-lg">
              <CircleUserRound
                color="gold"
                className="hidden dark:inline-flex h-7 w-7"
              />
              <CircleUserRound color="blue" className="dark:hidden h-7 w-7" />
              <input
                type="text"
                placeholder="user1234"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="flex-grow px-5 text-base bg-transparent outline-none"
              />
            </div>
            <div className="flex flex-grow items-center px-5 py-4 bg-[#F8F4FF] shadow-md dark:bg-[#2f2f2f] text-gray-600 rounded-xl focus-within:text-gray-600 focus-within:shadow-lg">
              <LockKeyhole
                color="gold"
                className="hidden dark:inline-flex h-7 w-7"
              />
              <LockKeyhole color="blue" className="dark:hidden h-7 w-7" />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="flex-grow px-5 text-base bg-transparent outline-none"
              />
            </div>
            <div className="flex flex-grow items-center px-5 py-4 bg-[#F8F4FF] shadow-md dark:bg-[#2f2f2f] text-gray-600 rounded-xl focus-within:text-gray-600 focus-within:shadow-lg">
              <LockKeyhole
                color="gold"
                className="hidden dark:inline-flex h-7 w-7"
              />
              <LockKeyhole color="blue" className="dark:hidden h-7 w-7" />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="flex-grow px-5 text-base bg-transparent outline-none"
              />
            </div>
            <div className="flex items-center justify-center">
              {fileSelected ? (
                // UI for when a file is selected
                <label className="cursor-pointer bg-blue-700 dark:bg-yellow-500 hover:bg-blue-500 dark:hover:bg-yellow-700 text-white dark:text-[#5f5f5f] font-bold py-2 px-8 rounded-lg">
                  <span className="flex items-center justify-center">
                    <PencilLineIcon className="h-6 w-6 mr-2" />
                    Change Image
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              ) : (
                // UI for when no file is selected
                <label className="cursor-pointer bg-blue-700 dark:bg-yellow-500 hover:bg-blue-500 dark:hover:bg-yellow-700 text-white dark:text-[#2f2f2f]  font-bold py-2 px-8 rounded-lg">
                  <span className="flex items-center justify-center">
                    <UploadCloud className="h-6 w-6 mr-2" />
                    Upload Image
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            <div className="flex justify-center">
              <Button
                size="lg"
                type="submit"
                className="bg-blue-700 dark:bg-yellow-500  py-2 px-4 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 dark:focus:ring-yellow-500 hover:bg-blue-500 dark:hover:bg-yellow-700"
              >
                <p className="text-lg font-semibold text-[#f8f9fa] dark:text-[#222]">
                  Register
                </p>
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <p>
              Already have an account?{" "}
              <a
                href="/login"
                className="dark:text-yellow-500 text-blue-700 hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
