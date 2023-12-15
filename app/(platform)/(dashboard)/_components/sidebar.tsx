"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";

interface SidebarProps {
  stoarageKey?: string;
}

export const Sidebar = ({ stoarageKey = "t-sidebar-state" }: SidebarProps) => {
  // state is going to be connected to our local storage which will keep track which accordion is extended which is not.
  const [expanded,  setExpanded] = useLocalStorage<Record<string, any>>(
    stoarageKey,
    {}
  );

  const { organization: activeOrganization, isLoaded: isLoadedOrg } =
    useOrganization();

  const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  //default value of expanded is not same value as expected in  our accordion.accordion needs array of default Ids. But we get objects of id and boolean from expended.
  // So we create this const to reduce over the extended obj and then we are creating an array of active id's . ex: {"123": true} => ["123"]

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
    return (
      <>
        <Skeleton />
      </>
    );
  }
  return (
    <>
      <div className="font-medium text-xs flex items-center mb-1">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        />
        <Link href="/select-org">
          <Plus className="h-4 w-4" />
        </Link>
      </div>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data.map(({organization}) => (
          <navItem
           key = {organization.id}
           isActive = {activeOrganization?.id === organization.id}
           isExpanded = {expanded[organization.id]}
           organization = {organization}
           onExpand = {onExpand}
          />
        ))}
      </Accordion>
    </>
  );
};
