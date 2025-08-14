"use client";

import { ListWithCards } from "@/type";
import ListHeader from "./list-header";

type ListItemProps = {
  data: ListWithCards;
  index: number;
};

export default function ListItem({ data, index }: ListItemProps) {
  return (
    <li className="shrink-0 h-full w-[272px] select-non!e">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader data={data} />
      </div>
    </li>
  );
}
