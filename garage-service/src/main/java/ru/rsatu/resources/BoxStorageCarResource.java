package ru.rsatu.resources;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import ru.rsatu.dto.BoxStorageCarSaveDto;
import ru.rsatu.services.BoxStorageCarService;

import java.math.BigDecimal;

@Path("/box-storage-car")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BoxStorageCarResource {

    @Inject
    BoxStorageCarService boxStorageCarService;

    @POST
    public void createBoxStorageCar(BoxStorageCarSaveDto dto) {
        boxStorageCarService.createBoxStorageCar(dto);
    }

    @DELETE
    @Path("/{boxId}/{carId}")
    public void deleteBoxStorageCar(@PathParam("boxId") Long boxId, @PathParam("carId") Long carId) {
        boxStorageCarService.deleteBoxStorageCar(boxId, carId);
    }

    @PUT
    @Path("/prices-multiplier")
    public void multiplyPrices(@QueryParam("factor") BigDecimal factor) {
        boxStorageCarService.multiplyPrices(factor);
    }
}