import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("messages")
export class MessageEntity {
  @CreateDateColumn()
  createdAt: Date;

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  message: string;

  @Column({ type: "varchar", length: 256 })
  user: string;

  @UpdateDateColumn()
  updatedAt: Date;

  static create(params: {
    createdAt?: Date;
    id?: string;
    message: string;
    updatedAt?: Date;
    user: string;
  }) {
    const message = new MessageEntity();

    message.createdAt = params.createdAt;
    message.id = params.id;
    message.message = params.message;
    message.updatedAt = params.updatedAt;
    message.user = params.user;

    return message;
  }
}
