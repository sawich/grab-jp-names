import { JSDOM } from "jsdom";
import { SomeDick } from "./SomeDick";

(async () => {
  const { window } = await JSDOM.fromURL("https://myoji-yurai.net/prefectureRanking.htm");
  const { document } = window;

  const links = document.querySelectorAll<HTMLAnchorElement>('table.simple[width="98%"] tbody tr a');
  console.log(`total links found: ${links.length}`);

  const some = new SomeDick(links);
  await some.wait();

  console.log("exit");

  process.exit(0);
})();
