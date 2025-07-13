package com.team48.inscriptionscolaire.document;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/images")
@RequiredArgsConstructor
public class DocumentController {

    private final DocumentService service;

    //endpoint to uploadImage
    @PostMapping(value = "/upload", consumes = "multipart/form-data")
    @Operation(summary = "Upload an image", description = "Upload a single image file")
    public ResponseEntity<?> uploadImage(
            @Parameter(
                    description = "The image file to upload",
                    schema = @Schema(type = "string", format = "binary")
            )
            @RequestParam("file")MultipartFile file
    ) throws IOException {
        String uploadImage =  service.uploadImage(file);

        return ResponseEntity.status(HttpStatus.OK)
                .body(uploadImage);
    }


    //endpoint to download image
    @GetMapping("/{fileName}")
    public ResponseEntity<?> downloadImage (@PathVariable String fileName){
        byte[] imageData = service.downloadImage(fileName);

        return ResponseEntity.status(HttpStatus.OK)
                .contentType(MediaType.valueOf("image/png"))
                .body(imageData);

    }
}
