import { signUp } from "@/services/auth-services";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { SignUpData } from "@/interfaces/auth.interface";

export const useSignUp = (): UseMutationResult<any, Error, SignUpData> => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const authKey = ["auth"];

  return useMutation<any, Error, SignUpData>({
    mutationFn: async (data) => {
      try {
        const response = await signUp(data);

        if (response?.user) {
          setTimeout(() => {
            router.push(ROUTES.AUTH.LOGIN);
          }, 500);
        }

        return response;
      } catch (error) {
        if (error instanceof Error) {
          toast.error(`Kayıt işlemi başarısız oldu: ${error.message}`);
        } else {
          toast.error("Kayıt işlemi başarısız oldu");
        }
      }
    },
    onSuccess: () => {
      toast.success("Başarıyla kaydoldunuz");
      queryClient.invalidateQueries({ queryKey: [authKey, "signUp"] });
    },
  });
};
