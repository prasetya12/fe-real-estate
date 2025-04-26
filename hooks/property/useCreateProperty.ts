'use client';
import { useMutation } from "@tanstack/react-query";
import { createProperty } from "@/api/property.service";
import { useToast } from "@/components/hooks/use-toast"
import { useRouter } from "next/navigation"

export const useCreateProperty = () => {
    const { toast } = useToast()
    const router = useRouter()
    return useMutation({
        mutationFn: async (formData: any) => {
            const response = createProperty(formData)
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