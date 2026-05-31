package ru.rsatu.resources;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import ru.rsatu.dto.ClientResponse;
import ru.rsatu.dto.RentResponse;
import ru.rsatu.entities.BoxStorageCar;
import ru.rsatu.services.BoxStorageCarService;
import ru.rsatu.dto.BoxStorageCarDto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Path("/box-storage-car")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BoxStorageCarResource {

    @Inject
    BoxStorageCarService boxStorageCarService;

    @POST
    public void rentBox(BoxStorageCarDto boxStorageCarDto) {
        boxStorageCarService.rentBox(boxStorageCarDto);
    }

    @DELETE
    @Path("/{boxId}")
    public Response evictClient(@PathParam("boxId") Long boxId) {
        boxStorageCarService.evictClientFromBox(boxId);
        return Response.noContent().build();
    }

    @GET
    @Path("/client-in-box/{boxId}")
    public Response getClientInBox(@PathParam("boxId") Long boxId) {
        BoxStorageCar rent = boxStorageCarService.getRentByBox(boxId);
        if (rent == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
        return Response.ok(RentResponse.fromEntity(rent)).build();
    }

    @GET
    @Path("/expiring")
    public List<RentResponse> getExpiringRents(@QueryParam("date") String date) {
        LocalDate localDate = LocalDate.parse(date);
        return boxStorageCarService.getRentsExpiringByDate(localDate)
                .stream()
                .map(RentResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @GET
    @Path("/by-brand/{brandId}")
    public List<ClientResponse> getClientsByBrand(@PathParam("brandId") Long brandId) {
        return boxStorageCarService.getClientsByBrand(brandId)
                .stream()
                .map(ClientResponse::fromEntity)
                .collect(Collectors.toList());
    }

    @PUT
    @Path("/price-multiplier")
    public Response multiplyPrices(@QueryParam("factor") BigDecimal factor) {
        boxStorageCarService.multiplyAllPrices(factor);
        return Response.ok("Цены обновлены").build();
    }
}