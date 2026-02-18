USE simplebank;

-- ===== ACCOUNT =====
CREATE TABLE account (
  id INT PRIMARY KEY,
  display_name VARCHAR(100) NOT NULL
);

INSERT INTO account (id, display_name) VALUES
(1, 'SYSTEM'),
(2, 'Tony Stark'),
(3, 'Peter Parker'),
(4, 'Tar Richman');

-- ===== TRANSACTIONS =====
CREATE TABLE transaction (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  amount INT NOT NULL,
  timestamp BIGINT NOT NULL,

  CONSTRAINT fk_sender
    FOREIGN KEY (sender_id) REFERENCES account(id),
  CONSTRAINT fk_receiver
    FOREIGN KEY (receiver_id) REFERENCES account(id)
);

INSERT INTO transaction (sender_id, receiver_id, amount, timestamp) VALUES
(1, 2, 100000000, UNIX_TIMESTAMP() - 60),
(1, 4, 500, UNIX_TIMESTAMP());
