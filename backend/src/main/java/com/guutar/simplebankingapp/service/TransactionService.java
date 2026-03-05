package com.guutar.simplebankingapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.guutar.simplebankingapp.model.Transaction;
import com.guutar.simplebankingapp.model.TransactionInput;
import com.guutar.simplebankingapp.repository.TransactionRepository;

@Service
public class TransactionService {
    private final TransactionRepository repo;
    
    public TransactionService(TransactionRepository repo) {
        this.repo = repo;
    }

    public List<Transaction> findAll() {
        return repo.findAll();
    }

    public void save(TransactionInput transaction) {
        repo.sendTxMessage(transaction);
    }

    public boolean getLatencyStatus() {
        return repo.getLatencyStatus();
    }

    public void toggleLatency() {
        repo.toggleLatency();
    }
}
