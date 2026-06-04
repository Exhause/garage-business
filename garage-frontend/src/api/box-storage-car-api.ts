import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import type { CreateRent } from "./types";

export function useMultiplyPrices() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (factor: number) => {
      const { data } = await api.put(
        "/box-storage-car/prices-multiplier",
        {},
        {
          params: { factor },
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
    },
  });
}

export function useCreateRent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (rent: CreateRent) => {
      const { data } = await api.post("/box-storage-car", rent);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["boxes"],
      });
      queryClient.invalidateQueries({
        queryKey: ["clients"],
      });
    },
  });
}

export function useDeleteRent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ boxId, carId }: { boxId: number; carId: number }) => {
      await api.delete(`/box-storage-car/${boxId}/${carId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
    },
  });
}
