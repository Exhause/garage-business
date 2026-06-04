import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

export function useAddSpecialization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      boxId,
      brandId,
    }: {
      boxId: number;
      brandId: number;
    }) => {
      const { data } = await api.post(
        `/box-specialization-brand/${boxId}`,
        {},
        {
          params: { brandId },
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
}

export function useDeleteSpecialization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      boxId,
      brandId,
    }: {
      boxId: number;
      brandId: number;
    }) => {
      await api.delete(`/box-specialization-brand/${boxId}/${brandId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
}
