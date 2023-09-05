import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("outbox_events")
export class OutboxEventEntity {
  @Column({ name: "aggregateid", type: "text" })
  aggregateId: string;

  @Column({ name: "aggregatetype", type: "text" })
  aggregateType: string;

  @CreateDateColumn()
  createdAt: Date;

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "jsonb" })
  payload: Record<string, unknown>;

  @UpdateDateColumn()
  updatedAt: Date;

  static create(params: {
    aggregateId: string;
    aggregateType: string;
    createdAt?: Date;
    id?: string;
    payload: Record<string, unknown>;
    updatedAt?: Date;
  }) {
    const outboxEvent = new OutboxEventEntity();

    outboxEvent.aggregateId = params.aggregateId;
    outboxEvent.aggregateType = params.aggregateType;
    outboxEvent.createdAt = params.createdAt;
    outboxEvent.id = params.id;
    outboxEvent.payload = params.payload;
    outboxEvent.updatedAt = params.updatedAt;

    return outboxEvent;
  }
}
