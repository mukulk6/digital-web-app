"use client"
import { useState } from 'react'
import {QueryClient} from '@tanstack/react-query'

export const Providers = () => {
    const [queryClient] = useState(()=>new QueryClient())
    const [trpcClient] = useState(()=>)

}