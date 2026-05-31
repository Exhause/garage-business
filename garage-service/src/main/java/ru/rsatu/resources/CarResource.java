package ru.rsatu.resources;

import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import ru.rsatu.dto.CarRequest;
import ru.rsatu.dto.CarResponse;
import ru.rsatu.entities.Car;
import ru.rsatu.services.CarService;

@Path("/cars")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CarResource {

    @Inject
    CarService carService;

    @POST
    public Response addCar(CarRequest request) {
        Car car = carService.addCar(request.clientId, request.brandId);
        return Response.status(Response.Status.CREATED)
                .entity(CarResponse.fromEntity(car))
                .build();
    }
}