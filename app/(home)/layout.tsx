import Header from "./_components/Header";
import { Toaster } from "@/components/ui/toaster";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-w-full dark:bg-[#1F1F1F]">
      <Header />
      <main className="pt-16">{children}</main>
      <Toaster />
    </div>
  );
};

export default HomeLayout;
