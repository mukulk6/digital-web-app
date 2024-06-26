"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

const UserAccountNav = () =>{
return <DropdownMenu>
    <DropdownMenuTrigger asChild className="overflow-visible">
        <Button variant={'ghost'} size='sm' className="relative">My account</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="bg-white w-60" align="end">
    <div className="flex items-center justify-start gap-2 p-2">
        <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-medium text-sm text-black">username</p>
        </div>
    </div>
    </DropdownMenuContent>
</DropdownMenu>
}

export default UserAccountNav;