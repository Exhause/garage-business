package ru.rsatu.resources;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import ru.rsatu.dto.BrandRequest;
import ru.rsatu.dto.BrandResponse;
import ru.rsatu.entities.Brand;
import ru.rsatu.services.BrandService;

import java.util.List;
import java.util.stream.Collectors;

@Path("/brands")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BrandResource {

    @Inject
    BrandService brandService;

    @POST
    public Response addBrand(BrandRequest request) {
        Brand brand = brandService.addBrand(request.name);
        return Response.status(Response.Status.CREATED)
                .entity(BrandResponse.fromEntity(brand))
                .build();
    }

    @DELETE
    @Path("/{id}")
    public void removeBrand(@PathParam("id") Long id) {
        brandService.removeBrand(id);
    }

    @GET
    public List<BrandResponse> getAllBrands() {
        return brandService.getAllBrands()
                .stream()
                .map(BrandResponse::fromEntity)
                .collect(Collectors.toList());
    }
}