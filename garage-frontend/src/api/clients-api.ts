import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";
import type {
  ClientWithCars,
  ClientWithCarsEndDate,
  CreateClient,
} from "./types";

export function useClientsWithCars() {
  return useQuery({
    queryKey: ["clients", "with-cars"],
    queryFn: async () => {
      const { data } = await api.get<ClientWithCars[]>("/clients/with-cars");
      return data;
    },
  });
}

export function useClientsWithCarsRentEndsByDate(date: string) {
  return useQuery({
    queryKey: ["clients", "with-cars", "rent-ends-by-date", date],
    queryFn: async () => {
      const { data } = await api.get<ClientWithCarsEndDate[]>(
        "/clients/with-cars/rent-ends-by-date",
        {
          params: { date },
        },
      );
      return data.map((value) => {
        return {
          ...value,
          ownedCars: value.ownedCars.map((value) => {
            return { ...value, occupyingBox: true };
          }),
        };
      });
    },
    enabled: !!date,
  });
}

export function useCreateClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (client: CreateClient) => {
      const { data } = await api.post("/clients", client);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}

export function useDeleteClient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (clientId: number) => {
      await api.delete(`/clients/${clientId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
}
