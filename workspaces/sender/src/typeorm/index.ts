import { dataSource } from "./data-source";

export const createPostgresConnection = async () => {
  await dataSource.initialize();
};
