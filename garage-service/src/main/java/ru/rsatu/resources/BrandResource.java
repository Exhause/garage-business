package ru.rsatu.resources;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import ru.rsatu.dto.BrandDto;
import ru.rsatu.dto.BrandSaveDto;
import ru.rsatu.services.BrandService;

import java.util.List;

@Path("/brands")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BrandResource {

    @Inject
    BrandService brandService;

    @GET
    public List<BrandDto> getAllBrands() {
        return brandService.getAllBrands();
    }

    @POST
    public void createBrand(BrandSaveDto dto) {
        brandService.createBrand(dto);
    }

    @DELETE
    @Path("/{brandId}")
    public void deleteBrand(@PathParam("brandId") Long brandId) {
        brandService.deleteBrand(brandId);
    }
}