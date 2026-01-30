package com.guutar.simplebankingapp.repository;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.guutar.simplebankingapp.model.Transaction;
import com.guutar.simplebankingapp.model.TransactionInput;

@Repository
public class TransactionRepository {

    private final List<Transaction> transactions;

    public TransactionRepository() {
        this.transactions = new ArrayList<>();
        transactions.add(new Transaction(0, -1, 0, 100_000_000, Instant.now()
                .minus(1, ChronoUnit.MINUTES)
                .getEpochSecond()));
        transactions.add(new Transaction(1, -1, 2, 500, Instant.now().getEpochSecond()));
    }

    public List<Transaction> findAll() {
        return this.transactions;
    }

    public void save(TransactionInput transaction) {
        this.transactions.add(new Transaction(transactions.size(), transaction.getSenderId(), transaction.getReceiverId(), transaction.getAmount(), transaction.getTimestamp()));
    }
}
