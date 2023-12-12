import React from "react";

const IdPage = ({ params }: { params: { id: string } }) => {
  return <div>page id : {params.id}</div>;
};

export default IdPage;
