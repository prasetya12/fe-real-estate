'use client';
import { useMutation } from "@tanstack/react-query";
import { deleteProperty } from "@/api/property.service";
import { useToast } from "@/components/hooks/use-toast"
import { useRouter } from "next/navigation"

export const useDeleteProperty = () => {
    const { toast } = useToast()
    const router = useRouter()
    return useMutation({
        mutationFn: async (id:string) => {
            const response = deleteProperty(id)
            return response
        },
        onSuccess: (() => {
            toast({
                title: "Success",
                description: "Property Success Deleted!",
            })
            router.push("/properties")

        })
    }
    );
};