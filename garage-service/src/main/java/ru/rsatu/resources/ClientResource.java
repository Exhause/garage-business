package ru.rsatu.resources;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import ru.rsatu.dto.ClientSaveDto;
import ru.rsatu.services.ClientService;

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
}