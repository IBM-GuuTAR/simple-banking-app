import amqp from "amqplib";

import { pool } from "./db.js";

const RABBITMQ_URL =
  process.env.RABBITMQ_URL || "amqp://simplebank:simplebankpass@localhost:5672";

const QUEUE = "bank.transaction.queue";

async function start() {
  const conn = await amqp.connect(RABBITMQ_URL);
  const channel = await conn.createChannel();

  await channel.assertQueue(QUEUE, { durable: true });
  channel.prefetch(5);

  console.log("🐰 Waiting for messages...");

  channel.consume(QUEUE, async (msg) => {
    if (!msg) return;

    const payload = JSON.parse(msg.content.toString());

    console.log("📩 Received:", payload);

    try {
      const { senderId, receiverId, amount, timestamp } = payload;

      const conn = await pool.getConnection();
      try {
        await conn.beginTransaction();

        await conn.execute(
          `INSERT INTO transaction (sender_id, receiver_id, amount, timestamp)
           VALUES (?, ?, ?, ?)`,
          [senderId, receiverId, amount, timestamp],
        );

        await conn.commit();
        channel.ack(msg);

        console.log("✅ Inserted into DB");
      } catch (err) {
        await conn.rollback();
        throw err;
      } finally {
        conn.release();
      }
    } catch (err) {
      console.error("❌ DB insert failed:", err);
      channel.nack(msg, false, false); // reject → DLQ (if exists)
    }
  });
}

start().catch(console.error);
