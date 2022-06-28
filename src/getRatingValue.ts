export function getRatingValue(document: Document, node: typeof window.Node) {
  for (const paragraph of document.querySelectorAll("div.post p")) {
    for (const { nodeType, textContent } of paragraph.childNodes) {
      if (nodeType == node.TEXT_NODE && textContent?.includes("【全国順位】")) {
        return parseInt(textContent.replace("【全国順位】", "").replaceAll("\n", "").replace("位", "").trim());
      }
    }
  }

  return null;
}
