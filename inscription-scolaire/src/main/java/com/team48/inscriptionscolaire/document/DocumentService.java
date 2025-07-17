package com.team48.inscriptionscolaire.document;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DocumentService {
    private final DocumentRepository repository;

    //store the image to the db
    public String uploadImage(MultipartFile file) throws IOException {
       Document fileData = repository.save(
                Document.builder()
                        .name(file.getOriginalFilename())
                        .type(DocumentTypeSubmitted.valueOf(file.getContentType()))
                        .fileData(DocumentUtils.compressImage(file.getBytes()))
                        .build()
        );

       if (fileData != null){
           return "file uploaded successfully : " +file.getOriginalFilename();

       }

        return null;
    }

    //dowload the image from the db
    public byte[] downloadImage(String fileName){

        Optional<Document> dbDocument = repository.findByName(fileName);
        byte[] images = DocumentUtils.decompressImage(dbDocument.get().getFileData());

        return images;
    }

}
