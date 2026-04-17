package com.bnr.bondsystem.controller;

import com .bnr.bondsystem.entity.Document;
import com.bnr.bondsystem.service.DocumentService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("documents")

public class DocumentController {
    private final DocumentService documentService;

    public DocumentController(DocumentService documentService) {
        this.documentService = documentService;
    }
    @GetMapping
    public List<Document> getAllDocuments() {
        return documentService.getAllDocuments();
    }
    @PostMapping
    public Document createDocument(@RequestBody Document document) {
        return documentService.saveDocument(document);
    }
    @GetMapping("{id}")
    public Document getDocument(@PathVariable long id) {
        return documentService.getDocumentById(id);
    }
    @DeleteMapping("{id}")
    public String deleteDocument(@PathVariable long id) {
        documentService.deleteDocument(id);
        return "successfully deleted";
    }
    @PutMapping("{id}")
    public Document updateDocument(@PathVariable long id, @RequestBody Document document) {
        return documentService.updateDocument(id, document);
    }

}
