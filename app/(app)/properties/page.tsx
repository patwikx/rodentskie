import { Metadata } from "next"
import { z } from "zod"

import { columns } from "./components/columns"
import { DataTable } from "./components/data-table"
import { UserNav } from "../dashboard/components/user-nav"
import { propertiesSchema } from "./data/schema"
import TeamSwitcher from "../dashboard/components/team-switcher"
import { Search } from "../dashboard/components/search"
import { ModeToggle } from "@/components/mode-toggle"
import { SystemMenu } from "../dashboard/components/system-menu"
import { prisma } from "@/lib/prisma";
import React, { useEffect, useState } from 'react';

export const metadata: Metadata = {
  title: "Task Manager",
  description: "A task and issue tracker built using Tanstack Table.",
}

// Simulate a database read for tasks.
export async function getProperties() {
  const properties = await prisma.properties.findMany({
    include: {
      sysUser: {
        select: {
          name: true,
        },
      },
    },
  });

  return properties;
}

export type Property = {
  sysUser: { name: string };
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  propertyCode: string;
  propertyName: string | null;
  regOwnerName: string | null;
  titleNo: string | null;
  landBuilding: string | null;
  lotNo: string | null;
  location: string | null;
  cityRegion: string | null;
  classification: string | null;
  leasableArea: string | null;
  orate: string | null;
  taxDecNo: string | null;
  propertyImage: string | null;
  sysUserId: string;
  createdBy: string | null;
  updatedBy: string | null;
  // ... add the rest of the properties here
  deletedAt: Date | null;
};

export default function PropertyPage() {
  const [properties, setProperties] = useState<Property[]>([]);

  return (
    <div className="min-h-screen flex flex-col">
          <div className="w-full h-auto md:h-16">
            <div className="flex h-16 items-center px-4">
            <div className="hidden sm:block">
                  <TeamSwitcher />
            </div>
            <SystemMenu />
              <div className="ml-auto flex items-center space-x-2">
                <Search />
                <ModeToggle />
                <UserNav />
              </div>
          </div>
          </div>
       <div className="flex-1 flex flex-col p-4">
        <div className="flex flex-col space-y-5">
          <h2 className="text-2xl font-bold tracking-tight">Property Management</h2>
          <p className="text-muted-foreground">
            This is where you can manage your properties.
          </p>
          <p></p>
        </div>
        <div className="flex-1 overflow-auto">
          <PropertyPage />
        </div>
      </div>
    </div>
  )
}