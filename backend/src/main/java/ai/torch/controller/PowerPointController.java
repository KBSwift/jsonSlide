package ai.torch.controller;

import ai.torch.service.PowerPointService;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.QueryValue;
import jakarta.inject.Inject;

@Controller("/ppt")
public class PowerPointController {

    @Inject
    private PowerPointService powerPointService;

    @Get(produces = MediaType.APPLICATION_JSON) // explicitly defining response for consistency and clarity
    public String convertToJSON(@QueryValue String filePath) {
        return powerPointService.convertPowerPointToJson(filePath);
    }
}