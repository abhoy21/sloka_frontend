import { Toaster } from "@/components/ui/toaster";

const Editorlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <main className="h-screen w-screen overflow-hidden bg-[#f8f9fa] dark:bg-[#1f1f1f]">
        {children}
      </main>
      <Toaster />
    </div>
  );
};

export default Editorlayout;
