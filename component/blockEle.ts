export const buildParaBlock = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = `<div
    data-node-id="${window.Lute.NewNodeID()}"
    data-node-index="2"
    data-type="NodeParagraph"
    class="p"
    updated="20240328104420"
  >
    <div contenteditable="true" spellcheck="false">
    ${html}
    </div>
    <div class="protyle-attr" contenteditable="false">​</div>
  </div>`;
  const child = div.firstChild as HTMLElement;
  return child;
};
/**
 *
 * @param layout
 * @returns 请使用innerHTML或返回值的firstChild
 */
export const buildSuperBlock = (layout: "col" | "row", htmls: string[]) => {
  const div = document.createElement("div");
  div.innerHTML = `<div
  data-node-id="${window.Lute.NewNodeID()}"
  data-node-index="0"
  data-type="NodeSuperBlock"
  class="sb"
  updated="20240328094114"
  data-sb-layout="${layout}"
>
${htmls.reduce((pre, cur) => pre + cur, "")}
<div class="protyle-attr" contenteditable="false">​</div>
</div>`;
  const child = div.firstChild as HTMLElement;
  return child;
};
