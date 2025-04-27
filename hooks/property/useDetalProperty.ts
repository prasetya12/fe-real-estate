
import { useQuery } from "@tanstack/react-query"
import { getDetailProperty } from "@/api/property.service"
export const useGetDetailProperty =(id:string)=>{
    return useQuery({
        queryKey:['detil-property',id],
        queryFn:()=>getDetailProperty(id)
    })
}