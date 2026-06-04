package ru.rsatu.resources;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import ru.rsatu.services.BoxSpecializationBrandService;

public class BoxSpecializationBrandResource {
    @Inject
    BoxSpecializationBrandService boxSpecializationBrandService;

    @POST
    @Path("/{boxId}")
    public void addSpecialization(@PathParam("boxId") Long boxId, @QueryParam("brandId") Long brandId) {
        boxSpecializationBrandService.addSpecialization(boxId, brandId);
    }

    @DELETE
    @Path("/{boxId}/{brandId}")
    public void removeSpecialization(@PathParam("boxId") Long boxId, @PathParam("brandId") Long brandId) {
        boxSpecializationBrandService.removeSpecialization(boxId, brandId);
    }
}
