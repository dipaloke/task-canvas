"use server";

import { z } from "zod";

import { db } from "@/lib/db";
import { title } from "process";
import { revalidatePath } from "next/cache";

//schema: We will be creating an obj with a title field as string
const CreateBoard = z.object({
  title: z.string(),
});

export async function create(formData: FormData) {
  const { title } = CreateBoard.parse({
    title: formData.get("title"),
  });

  await db.board.create({
    data: {
      title,
    },
  });

  revalidatePath("/organization/org_2ZUeDuu2IJmRktGYSJ2VFIPe9Wx");
}
