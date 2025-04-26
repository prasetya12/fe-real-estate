import { useQuery } from "@tanstack/react-query"

import { getProperties } from "@/api/property.service"
export const useGetProperty =()=>{
    return useQuery({
        queryKey:['get-property'],
        queryFn:getProperties
    })
}