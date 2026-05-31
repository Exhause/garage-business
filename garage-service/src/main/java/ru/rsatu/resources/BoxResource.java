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

    @POST
    public void addBox() {
        boxService.addBox();
    }

    @DELETE
    @Path("/{id}")
    public void closeBox(@PathParam("id") Long id) {
        boxService.closeBox(id);
    }

    @GET
    @Path("/free")
    public List<BoxDto> getFreeBoxes() {
        return boxService.getFreeBoxes()
                .stream()
                .map(BoxDto::fromEntity)
                .collect(Collectors.toList());
    }

    @GET
    @Path("/{id}/allowed-brands")
    public List<BrandResponse> getAllowedBrands(@PathParam("id") Long id) {
        return boxService.getAllowedBrands(id)
                .stream()
                .map(BrandResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @POST
    @Path("/{id}/specialization")
    public Response addSpecialization(@PathParam("id") Long boxId,
                                      @QueryParam("brandId") Long brandId) {
        BoxSpecializationBrand spec = boxService.addSpecialization(boxId, brandId);
        return Response.status(Response.Status.CREATED).entity(spec).build(); // можно вернуть сам объект или DTO при необходимости
    }
}