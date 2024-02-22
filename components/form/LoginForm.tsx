"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CircleUserRound, LockKeyhole, Upload } from "lucide-react";
import { Button } from "../ui/button";
import Google_light_Img from "../../public/assets/google_light.svg";
import Google_Dark_Img from "../../public/assets/google_dark.svg";
import Github_Light_Img from "../../public/assets/github_light.svg";
import Github_Dark_Img from "../../public/assets/github_dark.svg";
import Login_Img from "../../public/assets/login_image.jpeg";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useToast } from "@/components/ui/use-toast";

interface FormData {
  username: string;
  password: string;
}
interface ApiResponse {
  token: string;
}

const LoginForm = (): JSX.Element => {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      const { ...requestData } = formData;

      const response: AxiosResponse<ApiResponse> =
        await axios.post<ApiResponse>(
          // "https://sloka-backend.onrender.com/api-token-auth/",
          "https://sloka-backend.onrender.com/api-token-auth/",
          requestData
        );

      console.log("Login successful:", response.data);
      toast({
        description: "LogIn Successfully!",
      });

      localStorage.setItem("token", response.data.token);

      router.push("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ error: string }>;
        if (axiosError.response?.data?.error) {
          console.error("API Error:", axiosError.response.data.error);
          // Handle login error, show a message to the user, etc.
        } else {
          console.error("Unexpected Error:", axiosError.message);
          // Handle unexpected error, show a generic error message, etc.
        }
      } else {
        console.error("Unexpected Error:", (error as Error).message);
        // Handle unexpected error, show a generic error message, etc.
      }
    }
  };

  return (
    <section className="flex items-center justify-center bg-[#f8f9fa] dark:bg-[#1f1f1f] min-h-screen">
      <div className="flex shadow-lg rounded-3xl p-5">
        <div className="max-w-3xl w-full bg-[#f8f9fa] dark:bg-[#1f1f1f] p-8 shadow-md rounded-xl m-2">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-300 text-center  mb-6">
            Log-in to your Account
          </h2>
          <p className="text-gray-500 text-center text-base pt-2 pb-8">
            Already have an account, Login with proper Credentials!
          </p>
          <form className="space-y-10" onSubmit={handleSubmit}>
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
            {/* <div className="flex flex-grow items-center px-5 py-4 bg-[#F8F4FF] shadow-md dark:bg-[#2f2f2f] text-gray-600 rounded-xl focus-within:text-gray-600 focus-within:shadow-lg">
              <LockKeyhole
                color="gold"
                className="hidden dark:inline-flex h-7 w-7"
              />
              <LockKeyhole color="blue" className="dark:hidden h-7 w-7" />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmpassword"
                value={formData.confirmpassword}
                onChange={handleChange}
                className="flex-grow px-5 text-base bg-transparent outline-none"
              />
            </div> */}

            {/* <div className="flex items-center justify-center">
              <label className="cursor-pointer bg-blue-700 dark:bg-yellow-500 hover:bg-blue-500 dark:hover:bg-yellow-700 text-white font-bold py-2 px-8 rounded-lg">
                <span className="flex items-center justify-center">
                  <Upload className="h-6 w-6 mr-2" />
                  Upload Image
                </span>
                <input type="file" className="hidden" />
              </label>
            </div> */}

            <div className="flex justify-center">
              <Button
                size="lg"
                type="submit"
                className="bg-blue-700 dark:bg-yellow-500  py-2 px-4 rounded-md focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 dark:focus:ring-yellow-500 hover:bg-blue-500 dark:hover:bg-yellow-700"
              >
                <p className="text-lg font-semibold text-[#f8f9fa] dark:text-[#222]">
                  Login
                </p>
              </Button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/register">
                <span className="dark:text-yellow-500 text-blue-700 hover:underline">
                  Register
                </span>
              </Link>
            </p>
          </div>
        </div>
        <div className="hidden md:inline-flex">
          <Link href="/">
            <Image
              src={Login_Img}
              alt="login Image"
              className="w-full mx-2 rounded-3xl cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
