import { dataSource } from "@/typeorm/data-source";

import { MessageEntity } from "@/app/messages/domain/message.entity";

export const messageRepository = dataSource.getRepository(MessageEntity);
