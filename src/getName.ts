import { JSDOM } from "jsdom";
import { getRatingValue } from "./getRatingValue";
import type { Name } from "./types";

export async function getName(href: string): Promise<Name> {
  const { window } = await JSDOM.fromURL(href);
  const { document, Node } = window;

  const name = document.querySelector("h1.title")?.textContent?.replace("【名字】", "");
  if (!name) throw new Error("Name not found");

  const readings = document.querySelector("p.meta")?.textContent?.replace("【読み】", "").split(",");
  if (!readings) throw new Error("Name not found");

  const rating = getRatingValue(document, Node);
  if (!rating) throw new Error("Name not found");

  return { name, readings, rating };
}
