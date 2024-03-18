import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "./ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import Image from "next/image"
import { useSession } from 'next-auth/react'
import { UpdateDialog } from "./update-dialog"
import { useEffect, useState } from 'react';

interface User {
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    // Add any other properties you expect to receive
  }

export function UserProfile() {
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const [userData, setUserData] = useState<User | null>(null);
  
    useEffect(() => {
      if (!loading && session) {
        fetch('/api/fetchUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: session.user.email }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === 'success') {
              setUserData(data.user);
            } else {
              console.error(data.message);
            }
          });
      }
    }, [loading, session]);
  
    if (loading) {
      return null;
    }

  return (
    <Sheet>
            <SheetTrigger asChild>
        <Button variant="outline" className="bg-transparent border-none">Profile Settings</Button>
      </SheetTrigger>
      <SheetContent>
     <SheetHeader>
        <SheetTitle>Edit profile</SheetTitle>
        <SheetDescription>
             Make changes to your profile here. Click save when you're done.
        </SheetDescription>
    </SheetHeader>
  <div className="flex flex-col items-center justify-center gap-4 py-4">
    <Separator />
    <Avatar className="h-32 w-32">
      {session?.user?.image ? (
        <AvatarImage src={session.user.image} alt="@shadcn" />
      ) : (
        <AvatarImage src="/assets/usericon.png" alt="@shadcn" />
      )}
      <AvatarFallback>
        <Image src="/assets/usericon.png" alt="Fallback Image" width={200} height={200}/>
      </AvatarFallback>
    </Avatar>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name">
              Name
            </Label>
            <Input id="name" value={userData?.name || ''} className="col-span-3" />
            <Label htmlFor="name">
              Email
            </Label>
            <Input id="name" value={session?.user?.email || ''} className="col-span-3" />
            <Label htmlFor="name">
              Role
            </Label>
            <Input id="name" value={userData?.role || ''} className="col-span-3" />
            <Label htmlFor="name" className="text-xs">
              Created At
            </Label>
            <Input id="name" value={userData?.createdAt || ''} className="col-span-3" />
            <Label htmlFor="name" className="text-xs">
              Updated by
            </Label>
            <Input id="name" value={userData?.updatedAt || 'No updates yet.'}className="col-span-3" />
          </div>
        </div>
            <SheetFooter className="flex items-center justify-center">
                <div className="flex justify-center w-full">
                <SheetClose asChild>
                    <UpdateDialog />
                </SheetClose>
                </div>
            </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
