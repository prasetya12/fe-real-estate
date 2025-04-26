'use client';

import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/api/auth.service';
import { setTokenCookie } from '@/lib/auth';
import { useRouter } from "next/navigation"

import { useToast } from "@/components/hooks/use-toast"

export const useLogin = () => {
  const { toast } = useToast()
  const router = useRouter()

  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const token = await loginUser({ email, password });
      setTokenCookie(token);
      return token;
    },
    onSuccess: (() => {
      toast({
        title: "Login successful",
        description: "Welcome back to RealEstate!",
      })
      router.push("/properties")
    })
  });
};