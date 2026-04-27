import { useMutation, useQuery } from "@tanstack/react-query";
import { listUsers as listUsersApi, login as loginApi, signup as signupApi } from "@/api/auth";

export const useLoginMutation = () =>
  useMutation<any, any, string>({
    mutationFn: (username: string) => loginApi(username),
  });

export const useSignupMutation = () =>
  useMutation<any, any, string>({
    mutationFn: (username: string) => signupApi(username),
  });

export const useAuthUsersQuery = (enabled = true, limit = 100) =>
  useQuery<any[], any>({
    queryKey: ["authUsers", limit],
    queryFn: () => listUsersApi(limit),
    enabled,
    staleTime: 30_000,
  });
