import React from "react";

const BoardIdLayout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  return (
    <main className="relative pt-20 h-full">
      <div>{children}</div>;
    </main>
  );
};

export default BoardIdLayout;
