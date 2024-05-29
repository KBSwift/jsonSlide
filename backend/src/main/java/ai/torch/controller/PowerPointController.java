package ai.torch.controller;

import ai.torch.service.PowerPointService;
import io.micronaut.http.MediaType;
import io.micronaut.http.annotation.*;
import io.micronaut.http.multipart.CompletedFileUpload;
import jakarta.inject.Inject;

@Controller("/ppt")
public class PowerPointController {

    @Inject
    private PowerPointService powerPointService;

    @Post(consumes = MediaType.MULTIPART_FORM_DATA, produces = MediaType.APPLICATION_JSON) // explicitly defining response for consistency and clarity
    public String convertToJSON(@Part("file") CompletedFileUpload file) {
        if (!file.getFilename().endsWith(".ppt") && !file.getFilename().endsWith(".pptx")) {
            return "Unsupported file type";
        }
        return powerPointService.convertPowerPointToJson(file);
    }
}