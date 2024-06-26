"use client";

import { CardModal } from "@/components/modals/card-modal";
import { useEffect, useState } from "react";
import { ProModal } from "@/components/modals/pro-modal";

export const ModalProvider = () => {
  //Protection from hydration error
  const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted) {
        return null
    }
    //protection end

  return (
    <>
      <CardModal />
      <ProModal />
    </>
  );
};
