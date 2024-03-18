import * as React from "react"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useSession } from 'next-auth/react'

export function SelectRole() {

    const { data: session, status } = useSession()
  const loading = status === 'loading'

  if (loading) {
    return null
  }

  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue defaultValue={session?.user?.role || 'Please select user role.'} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Administrator</SelectItem>
          <SelectItem value="banana">System User</SelectItem>
          <SelectItem value="blueberry">Tenant</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
