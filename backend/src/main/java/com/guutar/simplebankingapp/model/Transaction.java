package com.guutar.simplebankingapp.model;

public class Transaction extends TransactionInput  {
    private int id;

    public Transaction(int id, int senderId, int receiverId, int amount, long timestamp) {
        super(senderId, receiverId, amount, timestamp);
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
