package com.guutar.simplebankingapp.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.guutar.simplebankingapp.model.Account;

@Repository
public class AccountRepository {
    private final List<Account> accounts;

    public AccountRepository() {
        this.accounts = new ArrayList<>();
        accounts.add(new Account(0, "Tony Stark", 100_000_000));
        accounts.add(new Account(1, "Peter Parker", 0));
        accounts.add(new Account(2, "Tar Richman", 500));
    }

    public List<Account> findAll() {
        return this.accounts;
    }
}
