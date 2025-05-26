import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "~/utils/users";
import { GET_AUTHENTICATED_USERS_KEY } from "~/constants/query-keys";
import { useRouter } from "@tanstack/react-router";

export default () => {
  const queryClient = useQueryClient();
  const { navigate, invalidate } = useRouter();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: GET_AUTHENTICATED_USERS_KEY });
      await invalidate();
      navigate({ to: "/" });
      return;
    },
  });
};
