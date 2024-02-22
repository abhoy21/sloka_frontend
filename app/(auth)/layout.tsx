import { Toaster } from "@/components/ui/toaster";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex bg-[#f8f9fa]  dark:bg-[#1F1F1F]">
      <h1 className="absolute left-[40%] top-20 text-5xl items justify-center">
        Welcome to <span className="font-extrabold">Sloka</span>
      </h1>

      <div className="flex items-center justify-center w-full">{children}</div>
      <Toaster />
    </div>
  );
};

export default AuthLayout;
