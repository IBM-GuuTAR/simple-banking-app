package com.guutar.simplebankingapp.repository;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.guutar.simplebankingapp.model.Account;

@Repository
public class AccountRepository {

    private final JdbcTemplate jdbc;

    public AccountRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public List<Account> findAll() {
        String sql = "SELECT id, display_name FROM account";
        return jdbc.query(sql, (rs, rowNum)
                -> new Account(
                        rs.getInt("id"),
                        rs.getString("display_name")
                )
        );
    }
}
