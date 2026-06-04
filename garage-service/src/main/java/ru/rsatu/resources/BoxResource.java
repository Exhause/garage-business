package ru.rsatu.resources;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import ru.rsatu.dto.*;
import ru.rsatu.entities.Box;
import ru.rsatu.entities.BoxSpecializationBrand;
import ru.rsatu.services.BoxService;

import java.util.List;
import java.util.stream.Collectors;

@Path("/boxes")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BoxResource {

    @Inject
    BoxService boxService;

    @GET
    public List<BoxDto> getAllBoxes() {
        return boxService.getAllBoxes();
    }

    @POST
    public void addBox() {
        boxService.addBox();
    }

    @DELETE
    @Path("/{boxId}")
    public void deleteBox(@PathParam("boxId") Long boxId) {
        boxService.deleteBox(boxId);
    }
}