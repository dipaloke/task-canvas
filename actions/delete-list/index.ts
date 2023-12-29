"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";

import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteList } from "./schema";


const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id, boardId } = data;

  let list;
  try {
    list = await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId, //only user who created the org can update the board
        },
      },
    });
  } catch (error) {
    return {
      error: "Failed to Delete.",
    };
  }

  //refresh the page and redirect  to org id page
  revalidatePath(`/board/${boardId}`);
  return {data: list}
};

export const deleteList = createSafeAction(DeleteList, handler);
