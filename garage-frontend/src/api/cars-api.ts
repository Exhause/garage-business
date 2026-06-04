import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import type { CarAvailable, CreateCar } from "./types";

export function useAvailableCarsForBox(boxId: number) {
  return useQuery({
    queryKey: ["cars", "available-for-box", boxId],
    queryFn: async () => {
      const { data } = await api.get<CarAvailable[]>(
        `/cars/available-for-box/${boxId}`,
      );
      return data;
    },
    enabled: !!boxId,
  });
}

export function useCreateCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (car: CreateCar) => {
      const { data } = await api.post("/cars", car);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}

export function useDeleteCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (carId: number) => {
      await api.delete(`/cars/${carId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}
