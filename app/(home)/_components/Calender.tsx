"use client";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
const CalenderComponent = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <div className="mb-4 md:mb-0 md:mr-4">
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border shadow"
      />
    </div>
  );
};

export default CalenderComponent;
