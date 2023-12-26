"use server";

import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/db";

import { InputType, ReturnType } from "./types";

import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteBoard} from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized",
    };
  }

  const { id } = data;

  let board;
  try {
    board = await db.board.delete({
      where: {
        id,
        orgId, //only user who created the org can update the board
      }
    });
  } catch (error) {
    return {
      error: "Failed to Delete.",
    };
  }

  //refresh the page and redirect  to org id page
  revalidatePath(`/organization/${orgId}`);
  redirect(`/organization/${orgId}`)
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);
