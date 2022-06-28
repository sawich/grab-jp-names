import { workerData, parentPort } from "node:worker_threads";
import { getName } from "./getName";

(async () => {
  const data = await Promise.all(JSON.parse(workerData).map(getName)).then(JSON.stringify);
  parentPort?.postMessage(data);
  parentPort?.close();
})();
