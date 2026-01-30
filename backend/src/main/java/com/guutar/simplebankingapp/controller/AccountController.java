package com.guutar.simplebankingapp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.guutar.simplebankingapp.model.Account;
import com.guutar.simplebankingapp.service.AccountService;

@RestController
@RequestMapping("/account")
public class AccountController {
    private final AccountService service;

    public AccountController(AccountService service) {
        this.service = service;
    }

    @GetMapping
    public List<Account> getAccount() {
        return service.findAll();
    }
}
