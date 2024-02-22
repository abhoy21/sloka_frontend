import AddNoteComponent from "./_components/Add_Note";
import CalenderComponent from "./_components/Calender";
import Doc_List_Head_Component from "./_components/Doc_List_head";
import Each_Doc_Row_Component from "./_components/Each_Doc_Row";

import Footer from "./_components/footer";

const HomePage = () => {
  return (
    <div className=" ">
      <div className="pb-10 px-4 md:px-10 flex flex-col justify-center md:flex-row md:justify-center">
        <CalenderComponent />
        <AddNoteComponent />
      </div>
      <div className="py-4 px-8">
        <Doc_List_Head_Component />
        <Each_Doc_Row_Component />
      </div>
      <div className="fixed bottom-0 w-full mt-32">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
