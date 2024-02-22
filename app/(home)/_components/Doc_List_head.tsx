import { File, FolderClosed } from "lucide-react";

const Doc_List_Head_Component = () => {
  return (
    <div className="mx-auto py-8 max-w-3xl">
      <div className="flex items-center justify-between pb-5">
        <File />
        <h2 className="text-lg flex-grow ml-6">Document Name</h2>
        <p className="text-lg mr-14">
          <span>Date</span>
        </p>
        <FolderClosed className="mr-4" />
      </div>
    </div>
  );
};

export default Doc_List_Head_Component;
