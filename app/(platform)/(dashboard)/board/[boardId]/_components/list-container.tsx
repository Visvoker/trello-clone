"use client";

import { ListWithCards } from "@/type";
import ListForm from "./list-form";
import { useEffect, useState } from "react";
import ListItem from "./list-item";

type ListContainerProps = {
  boardId: string;
  data: ListWithCards[];
};

export default function ListContainer({ boardId, data }: ListContainerProps) {
  const [orderedData, setOrderedData] = useState(data);

  useEffect(() => {
    setOrderedData(data);
  }, [data]);

  return (
    <ol className="flex gap-x-3 h-full">
      {orderedData.map((list, index) => {
        return <ListItem key={list.id} data={list} index={index} />;
      })}
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
}
