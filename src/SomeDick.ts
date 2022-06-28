import { cpus } from "node:os";
import { Worker } from "node:worker_threads";
import { writeFile } from "node:fs/promises";
import _ from "lodash";
import { Name } from "./types";

export class SomeDick {
  public async wait() {
    await Promise.all(this.#workers);
    await writeFile("names.json", JSON.stringify(this.#data));
  }

  public constructor(links: NodeListOf<HTMLAnchorElement>) {
    this.#total = links.length;

    const size = Math.ceil((links.length / cpus().length) * 2);

    this.#workers = _.chunk(links, size).map(this.createWorker.bind(this));
  }

  private onParsed(msg: any) {
    const names: Name[] = JSON.parse(msg);

    console.log(`${(this.#parsed += names.length)} / ${this.#total}`);

    this.#data.push(...names);
  }

  private createWorker(e: HTMLAnchorElement[]) {
    return new Promise<void>((resolve) => {
      const worker = new Worker("./src/parser.worker.ts", {
        workerData: JSON.stringify(e.map((e) => e.href)),
      });

      worker.on("messageerror", console.error);
      worker.on("error", console.error);

      worker.once("message", this.onParsed.bind(this));
      worker.once("exit", resolve);
    });
  }

  #total = 0;
  #parsed = 0;
  #workers;
  #data: Name[] = [];
}
