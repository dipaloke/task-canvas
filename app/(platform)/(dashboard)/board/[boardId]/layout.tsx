import React from "react";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

import { notFound, redirect } from "next/navigation";

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }
  //fetching current board
  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  //redirects to 404 not found page
  if (!board) {
    notFound();
  }
  return (
    <main className="relative pt-20 h-full">
      <div>{children}</div>;
    </main>
  );
};

export default BoardIdLayout;
