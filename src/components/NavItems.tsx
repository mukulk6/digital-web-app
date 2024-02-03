"use client"
import { PRODUCT_CATEGORIES } from "@/app/config"
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import NavItem from "./NavItem";
import { useOnClickOutside } from "../hooks/use-onclick-outside";
const NavItems = () => {
    const [activeIndex,setActiveIndex] = useState<null | Number>(null)

    const isAnyOpen = activeIndex !== null

    const navRef =useRef<HTMLDivElement | null>(null)

     useOnClickOutside(navRef,()=>setActiveIndex(null))

     useEffect(()=>{
        const handler = (e:KeyboardEvent)=>{
            if(e.key ==='Escape')
            {
                setActiveIndex(null)
            }
        }
        document.addEventListener('keydown', handler)
        return ()=>{
            document.removeEventListener("keydown",(e)=> handler(e))
        }
     },[])
    return(
        <div className="flex gap-4 h-full" ref={navRef}>
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