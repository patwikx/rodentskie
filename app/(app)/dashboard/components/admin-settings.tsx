import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
  } from "@/components/ui/menubar"

  import Link from 'next/link';
  
  export function AdminControl() {
    return (
      <Menubar>
        <MenubarMenu>
        <MenubarTrigger style={{fontWeight: 'bold'}}>Admin Panel</MenubarTrigger>
          <MenubarContent>
            <MenubarRadioGroup value="benoit">
              <MenubarRadioItem value="andy">User Access</MenubarRadioItem>
              <MenubarRadioItem value="benoit">
  <Link href="/register">
    Create User
  </Link>
</MenubarRadioItem>
              <MenubarRadioItem value="Luis">Update User</MenubarRadioItem>
            </MenubarRadioGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    )
  }
  