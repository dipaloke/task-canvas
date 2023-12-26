import React from "react";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";

import { notFound, redirect } from "next/navigation";

import { BoardNavbar } from "./_components/board-navbar";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: "Board",
    };
  }

  const board = await db.board.findUnique({
    where: {
      id: params.boardId,
      orgId,
    },
  });

  return {
    title: board?.title || "Board",
  };
}

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
    <div
      className="relative h-full bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      {/* Making the bg little bit darker */}
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative pt-28 h-full">
        <div>{children}</div>
      </main>
    </div>
  );
};

export default BoardIdLayout;
