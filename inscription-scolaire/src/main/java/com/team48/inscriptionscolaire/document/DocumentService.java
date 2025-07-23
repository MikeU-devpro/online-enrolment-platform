package com.team48.inscriptionscolaire.document;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DocumentService {
    private final DocumentRepository repository;

    //store the image to the db
    public String uploadImage(MultipartFile file) throws IOException {
        // Valider le type de fichier d'abord
        String contentType = file.getContentType();
        try {
            DocumentTypeSubmitted type = DocumentTypeSubmitted.fromMimeType(contentType);

            Document fileData = repository.save(
                    Document.builder()
                            .name(file.getOriginalFilename())
                            .type(type)
                            .fileData(DocumentUtils.compressImage(file.getBytes()))
                            .build()
            );

            if (fileData != null) {
                return "file uploaded successfully : " + file.getOriginalFilename();
            }
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Type de fichier non supporté: " + contentType +
                    ". Types supportés: " + Arrays.stream(DocumentTypeSubmitted.values())
                    .map(DocumentTypeSubmitted::getMimeType)
                    .collect(Collectors.joining(", ")));
        }

        return null;
    }

    //dowload the image from the db
    public byte[] downloadImage(String fileName){

        Optional<Document> dbDocument = repository.findByName(fileName);
        byte[] images = DocumentUtils.decompressImage(dbDocument.get().getFileData());

        return images;
    }

    public Document saveDocument(MultipartFile file) throws IOException {
        Document document = new Document();
        document.setName(file.getOriginalFilename());
        document.setType(DocumentTypeSubmitted.valueOf(file.getContentType()));
        document.setFileData(DocumentUtils.compressImage(file.getBytes()));
        return repository.save(document);
    }
}
