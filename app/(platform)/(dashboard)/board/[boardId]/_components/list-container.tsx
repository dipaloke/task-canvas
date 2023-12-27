"use client";

import { ListWithCards } from "@/types";

import { ListForm } from "./list-form";

interface ListContainerProps {
  data: ListWithCards[];
  boardId: string;
}

export const ListContainer = ({data, boardId}: ListContainerProps) => {
    return (
        <ol>
            <ListForm />
            {/* represents the empty space at the end of the x axis */}
            <div className="flex-shrink-0 w-1" />
        </ol>
    )
}
