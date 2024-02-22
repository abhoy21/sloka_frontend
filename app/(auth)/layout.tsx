import { Toaster } from "@/components/ui/toaster";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen flex flex-col bg-[#1F1F1F] overflow-x-hidden">
      <h1 className="text-3xl md:text-5xl font-extrabold text-center text-white mt-10 md:mt-10">
        Welcome to Sloka
      </h1>

      <div className="flex items-center justify-center flex-grow">
        {children}
      </div>

      <Toaster />
    </div>
  );
};

export default AuthLayout;
