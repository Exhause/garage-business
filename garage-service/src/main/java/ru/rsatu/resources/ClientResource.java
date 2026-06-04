package ru.rsatu.resources;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import ru.rsatu.dto.ClientSaveDto;
import ru.rsatu.dto.ClientWithCarsDto;
import ru.rsatu.services.ClientService;

import java.time.LocalDate;
import java.util.List;

@Path("/clients")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ClientResource {

    @Inject
    ClientService clientService;

    @POST
    public void createClient(ClientSaveDto dto) {
        clientService.createClient(dto);
    }

    @DELETE
    @Path("/{clientId}")
    public void deleteClient(@PathParam("clientId") Long clientId) {
        clientService.deleteClient(clientId);
    }

    @GET
    @Path("/with-cars")
    public List<ClientWithCarsDto> getClientsWithCars() {
        return clientService.getClientsWithCars();
    }

    @GET
    @Path("/with-cars/rent-ends-by-date")
    public List<ClientWithCarsDto> getClientsWithCarsRentEndsByDate(@QueryParam("date") LocalDate date) {
        return clientService.getClientsWithCarsRentEndsByDate(date);
    }
}