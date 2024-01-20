"use client"
import { PRODUCT_CATEGORIES } from "@/app/config"
import { useState } from "react";
import NavItem from "./NavItem";
const NavItems = () => {
    const [activeIndex,setActiveIndex] = useState<null | Number>(null)

    const isAnyOpen = activeIndex !== null
    return(
        <div className="flex gap-4 h-full">
            {
                PRODUCT_CATEGORIES.map((category,index)=>{
                    const handleOpen=() =>{
                        if(activeIndex === index )
                        {
                            setActiveIndex(null)
                        }
                        else
                        {
                            setActiveIndex(index)
                        }
                    }

                    const isOpen = index === activeIndex

                    
                    return(
                        <NavItem category={category} isAnyOpen={isAnyOpen} handleOpen={handleOpen} isOpen={isOpen} key={category.value} />
                    )
                })
            }
        </div>
    )
}

export default NavItems;