package ru.rsatu.resources;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import ru.rsatu.dto.ClientRequest;
import ru.rsatu.dto.ClientResponse;
import ru.rsatu.entities.Client;
import ru.rsatu.services.ClientService;

import java.util.List;
import java.util.stream.Collectors;

@Path("/clients")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ClientResource {

    @Inject
    ClientService clientService;

    @POST
    public Response addClient(ClientRequest request) {
        Client client = clientService.addClient(
                request.firstName, request.lastName,
                request.middleName, request.address);
        return Response.status(Response.Status.CREATED)
                .entity(ClientResponse.fromEntity(client))
                .build();
    }

    @GET
    public List<ClientResponse> getAllClients() {
        return clientService.getAllClients()
                .stream()
                .map(ClientResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @GET
    @Path("/{id}")
    public Response getClient(@PathParam("id") Long id) {
        Client client = clientService.getClient(id);
        if (client == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(ClientResponse.fromEntity(client)).build();
    }
}