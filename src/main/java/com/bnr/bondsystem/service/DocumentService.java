package com.bnr.bondsystem.service;

import com.bnr.bondsystem.repository.DocumentRepository;
import com.bnr.bondsystem.entity.Document;
import org.springframework.stereotype.Service;
import java.util.List;
@Service

public class DocumentService {
    private final DocumentRepository documentRepository;

    public DocumentService(DocumentRepository documentRepository) {
        this.documentRepository = documentRepository;
    }
    public List<Document> getAllDocuments() {
        return documentRepository.findAll();
    }
    public Document saveDocument(Document document) {
        return documentRepository.save(document);
    }
    public Document getDocumentById(long id) {
        return documentRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Document not found"));
    }
    public void deleteDocument(long id) {
        documentRepository.deleteById(id);
    }
    public Document updateDocument(Long id, Document updateDocument) {
        Document existingDocument = documentRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Document not found"));

        existingDocument.setFileName(updateDocument.getFileName());
        existingDocument.setFilePath(updateDocument.getFilePath());
        existingDocument.setUploadDate(updateDocument.getUploadDate());

        return documentRepository.save(existingDocument);
    }
}
