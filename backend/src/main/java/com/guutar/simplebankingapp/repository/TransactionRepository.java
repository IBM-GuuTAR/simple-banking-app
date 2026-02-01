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

    public TransactionRepository(JdbcTemplate jdbc, RabbitTemplate rabbitTemplate) {
        this.jdbc = jdbc;
        this.rabbitTemplate = rabbitTemplate;
    }

    public List<Transaction> findAll() {
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
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE,
                RabbitMQConfig.ROUTING_KEY,
                transaction
        );
    }
}
