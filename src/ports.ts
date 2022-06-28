import { MessageChannel } from "node:worker_threads";
export const { port1, port2 } = new MessageChannel();
