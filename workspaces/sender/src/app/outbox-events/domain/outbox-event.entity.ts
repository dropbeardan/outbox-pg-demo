import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("outbox_events")
export class OutboxEventEntity {
  @CreateDateColumn()
  createdAt: Date;

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "jsonb" })
  payload: string;

  @Column({ type: "text" })
  topic: string;

  @UpdateDateColumn()
  updatedAt: Date;

  static create(params: {
    createdAt?: Date;
    id?: string;
    payload: Record<string, unknown>;
    topic: string;
    updatedAt?: Date;
  }) {
    const outboxEvent = new OutboxEventEntity();

    outboxEvent.createdAt = params.createdAt;
    outboxEvent.id = params.id;
    outboxEvent.payload = JSON.stringify(params.payload);
    outboxEvent.topic = params.topic;
    outboxEvent.updatedAt = params.updatedAt;

    return outboxEvent;
  }
}
