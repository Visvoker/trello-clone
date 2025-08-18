"use client";

import { useRef, useState } from "react";

import { ListWithCards } from "@/type";

import ListHeader from "./list-header";
import { CardForm } from "./card-item";

type ListItemProps = {
  data: ListWithCards;
  index: number;
};

export default function ListItem({ data, index }: ListItemProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  return (
    <li className="shrink-0 h-full w-[272px] select-non!e">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader data={data} onAddCard={disableEditing} />
        <CardForm
          listId={data.id}
          ref={textareaRef}
          isEditing={isEditing}
          enableEditing={enableEditing}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  );
}
