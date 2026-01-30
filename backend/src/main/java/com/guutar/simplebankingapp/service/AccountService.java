package com.guutar.simplebankingapp.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.guutar.simplebankingapp.model.Account;
import com.guutar.simplebankingapp.repository.AccountRepository;

@Service
public class AccountService {
    private final AccountRepository repo;
    
    public AccountService(AccountRepository repo) {
        this.repo = repo;
    }

    public List<Account> findAll() {
        return repo.findAll();
    }
}
