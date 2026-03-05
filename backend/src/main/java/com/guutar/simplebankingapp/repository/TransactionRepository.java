package com.guutar.simplebankingapp.repository;

import java.util.List;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.guutar.simplebankingapp.config.RabbitMQConfig;
import com.guutar.simplebankingapp.model.Transaction;
import com.guutar.simplebankingapp.model.TransactionInput;

@Repository
public class TransactionRepository {

    private final JdbcTemplate jdbc;
    private final RabbitTemplate rabbitTemplate;
    private boolean isLatency;

    public TransactionRepository(JdbcTemplate jdbc, RabbitTemplate rabbitTemplate) {
        this.jdbc = jdbc;
        this.rabbitTemplate = rabbitTemplate;
        this.isLatency = false;
    }

    public List<Transaction> findAll() {
        if (this.isLatency) {
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }

        String sql = "SELECT * FROM transaction";
        return jdbc.query(sql, (rs, rowNum)
                -> new Transaction(
                        rs.getInt("id"),
                        rs.getInt("sender_id"),
                        rs.getInt("receiver_id"),
                        rs.getInt("amount"),
                        rs.getLong("timestamp")
                )
        );
    }

    public void save(TransactionInput transaction) {
        String sql = """
        INSERT INTO transaction (sender_id, receiver_id, amount, timestamp)
        VALUES (?, ?, ?, ?)
        """;

        jdbc.update(
                sql,
                transaction.getSenderId(),
                transaction.getReceiverId(),
                transaction.getAmount(),
                transaction.getTimestamp()
        );
    }

    public void sendTxMessage(TransactionInput transaction) {
        if (this.isLatency) {
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }

        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE,
                RabbitMQConfig.ROUTING_KEY,
                transaction
        );
    }

    public boolean getLatencyStatus() {
        return this.isLatency;
    }

    public void toggleLatency() {
        this.isLatency = !this.isLatency;
    }
}
