"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";

import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateBoard } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { title, id } = data;

  let board;
  try {
    board = await db.board.update({
      where: {
        id,
        orgId, //only user who created the org can update the board
      },
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      error: "Failed to Update.",
    };
  }

  //refresh the page to immediately update the page
  revalidatePath(`/board/${id}`);
  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);
