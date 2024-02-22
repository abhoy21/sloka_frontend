import Header from "./_components/Header";
import { Toaster } from "@/components/ui/toaster";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full max-w-screen overflow-hidden dark:bg-[#1F1F1F]">
      <Header />
      <main className="h-screen overflow-y-auto pt-16">{children}</main>
      <Toaster />
    </div>
  );
};

export default HomeLayout;
