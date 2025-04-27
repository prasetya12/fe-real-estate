'use client';
import { useMutation } from "@tanstack/react-query";
import { updateProperty } from "@/api/property.service";
import { useToast } from "@/components/hooks/use-toast"
import { useRouter } from "next/navigation"

export const useEditProperty = () => {
    const { toast } = useToast()
    const router = useRouter()
    return useMutation({
        mutationFn: async ({formData,id}:{formData:any,id:string}) => {
            const response = updateProperty(formData,id)
            return response
        },
        onSuccess: (() => {
            toast({
                title: "Success",
                description: "Property Success Created!",
            })
            router.push("/properties")

        })
    }
    );
};