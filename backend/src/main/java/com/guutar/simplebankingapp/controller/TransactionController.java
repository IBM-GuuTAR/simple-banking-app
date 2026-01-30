package com.guutar.simplebankingapp.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.guutar.simplebankingapp.model.Transaction;
import com.guutar.simplebankingapp.model.TransactionInput;
import com.guutar.simplebankingapp.service.TransactionService;

@RestController
@RequestMapping("/transaction")
public class TransactionController {
    private final TransactionService service;

    public TransactionController(TransactionService service) {
        this.service = service;
    }

    @GetMapping
    public List<Transaction> getTransaction() {
        return service.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void insertTransaction(@RequestBody TransactionInput transaction) {
        service.save(transaction);
    }
}
