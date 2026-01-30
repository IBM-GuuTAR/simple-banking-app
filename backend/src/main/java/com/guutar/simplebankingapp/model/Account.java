package com.guutar.simplebankingapp.model;

public class Account {
    private int id;
    private String displayName;
    private int balance;

    public Account(int id, String displayName, int balance) {
        this.id = id;
        this.displayName = displayName;
        this.balance = balance;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public int getBalance() {
        return balance;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }
}
