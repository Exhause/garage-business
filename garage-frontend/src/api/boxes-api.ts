import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import type { Box, BoxDetail, Brand, OccupiedBoxPrice } from "./types";

export function useBoxes() {
  return useQuery({
    queryKey: ["boxes"],
    queryFn: async () => {
      const { data } = await api.get<Box[]>("/boxes");
      return data;
    },
  });
}

export function useFreeBoxes() {
  return useQuery({
    queryKey: ["boxes", "free"],
    queryFn: async () => {
      const { data } = await api.get<number[]>("/boxes/free");
      return data;
    },
  });
}

export function useBoxDetail(id: number) {
  return useQuery({
    queryKey: ["boxes", id],
    queryFn: async () => {
      const { data } = await api.get<BoxDetail>(`/boxes/${id}`);
      return data;
    },
    enabled: !!id,
  });
}

export function useAvailableBrands(boxId: number) {
  return useQuery({
    queryKey: ["boxes", boxId, "available-brands"],
    queryFn: async () => {
      const { data } = await api.get<Brand[]>(
        `/boxes/${boxId}/available-brands`,
      );
      return data;
    },
    enabled: !!boxId,
  });
}

export function useBoxesSpecializedOnCar(carId: number) {
  return useQuery({
    queryKey: ["boxes", "specialized-on-car", carId],
    queryFn: async () => {
      const { data } = await api.get<number[]>(
        `/boxes/specialized-on-car/${carId}`,
      );
      return data;
    },
    enabled: !!carId,
  });
}

export function useOccupiedBoxesWithPrices() {
  return useQuery({
    queryKey: ["boxes", "occupied-with-prices"],
    queryFn: async () => {
      const { data } = await api.get<OccupiedBoxPrice[]>(
        "/boxes/occupied-with-prices",
      );
      return data;
    },
  });
}

export function useCreateBox() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post("/boxes");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
    },
  });
}

export function useDeleteBox() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/boxes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boxes"] });
    },
  });
}
