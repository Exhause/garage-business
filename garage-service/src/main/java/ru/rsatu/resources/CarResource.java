package ru.rsatu.resources;

import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import ru.rsatu.dto.AvailableCarDto;
import ru.rsatu.dto.CarSaveDto;
import ru.rsatu.services.CarService;

import java.util.List;

@Path("/cars")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CarResource {

    @Inject
    CarService carService;

    @POST
    public void createCar(CarSaveDto dto) {
        carService.createCar(dto);
    }

    @DELETE
    @Path("/{carId}")
    public void deleteCar(@PathParam("carId") Long carId) {
        carService.deleteCar(carId);
    }

    @GET
    @Path("/available-for-box/{boxId}")
    public List<AvailableCarDto> getAvailableCarsForBox(@PathParam("boxId") Long boxId) {
        return carService.getAvailableCarsForBox(boxId);
    }
}