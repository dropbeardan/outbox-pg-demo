import { Consumer, Kafka, Producer } from "kafkajs";

let kafka: Kafka;
let kafkaConsumers: Record<string, Consumer> = {};
let kafkaProducer: Producer;

export const createKafkaInstance = async () => {
  if (kafka) {
    return kafka;
  }

  kafka = new Kafka({
    clientId: process.env.APP_NAME,
    brokers: [process.env.KAFKA_BROKER_URI],
  });

  return kafka;
};

export const getKafkaConsumer = async (groupId: string) => {
  if (!kafka) {
    throw new Error("Kafka instance has not yet been initialized.");
  }

  if (kafkaConsumers.groupId) {
    return kafkaConsumers.groupId;
  }

  const consumer = kafka.consumer({ groupId });
  await consumer.connect();

  kafkaConsumers.groupId = consumer;

  return kafkaConsumers.groupId;
};

export const getKafkaProducer = async () => {
  if (!kafka) {
    throw new Error("Kafka instance has not yet been initialized.");
  }

  if (kafkaProducer) {
    return kafkaProducer;
  }

  const producer = kafka.producer();
  await producer.connect();

  kafkaProducer = producer;

  return kafkaProducer;
};
