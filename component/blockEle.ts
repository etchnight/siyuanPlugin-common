import { Lute as LuteClass } from "siyuan";
declare const Lute: typeof LuteClass;

//* 可使用detail.protyle.lute.SpinBlockDOM(`<div>`)直接渲染
//*详细信息见'app\src\protyle\hint\extend.ts'
//*转换函数为 test\IHintData2Enum.js
//* 不可见字符"\u200b" 及 Lute.Caret="‸"
export enum EHintType {
  "模版" = "​",
  "挂件" = "​1",
  "资源" = "​2",
  "引用块" = "((",
  "嵌入块" = "{{",
  "ai chat" = "​5",
  "数据库" = '<div data-type="NodeAttributeView" data-av-type="table"></div>',
  "文档" = "​4",
  "一级标题" = "# ‸",
  "二级标题" = "## ‸",
  "三级标题" = "### ‸",
  "四级标题" = "#### ‸",
  "五级标题" = "##### ‸",
  "六级标题" = "###### ‸",
  "无序列表" = "* ‸",
  "有序列表" = "1. ‸",
  "任务列表" = "* [ ] ‸",
  "引述" = "> ‸",
  "代码块" = "```",
  "表格" = "| ‸ |  |  |\n| --- | --- | --- |\n|  |  |  |\n|  |  |  |",
  "分割线" = "---",
  "数学公式块" = "$$",
  html = "<div>",
  "表情" = "emoji",
  "链接" = "a",
  "粗体" = "strong",
  "斜体" = "em",
  "下划线" = "u",
  "删除线" = "s",
  "标记" = "mark",
  "上标" = "sup",
  "下标" = "sub",
  "标签" = "tag",
  "行内代码" = "code",
  "行内数学公式" = "inline-math",
  "插入图片或文件" = "​3",
  "嵌入网址" = '<iframe sandbox="allow-forms allow-presentation allow-same-origin allow-scripts allow-modals" src="" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>',
  "插入图片链接" = "![]()",
  "插入视频链接" = '<video controls="controls" src=""></video>',
  "插入音频链接" = '<audio controls="controls" src=""></audio>',
  "五线谱" = "```abc\n```",
  "图表" = "```echarts\n```",
  "流程图" = "```mermaid\n```",
  "状态图" = "```graphviz\n```",
  "脑图" = "```mindmap\n```",
  "统一建模语言" = "```plantuml\n```",
  "信息样式" = "style​color: var(--b3-card-info-color);background-color: var(--b3-card-info-background);",
  "成功样式" = "style​color: var(--b3-card-success-color);background-color: var(--b3-card-success-background);",
  "警告样式" = "style​color: var(--b3-card-warning-color);background-color: var(--b3-card-warning-background);",
  "错误样式" = "style​color: var(--b3-card-error-color);background-color: var(--b3-card-error-background);",
  "移除样式" = "style​",
}

export const buildParaBlock = (html: string) => {
  const div = document.createElement("div");
  div.innerHTML = `<div
    data-node-id="${Lute.NewNodeID()}"
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
  data-node-id="${Lute.NewNodeID()}"
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

export const buildBlock = (type: EHintType, html: string, lute: LuteClass) => {
  const blockHtml = lute.SpinBlockDOM(type);
  const div = document.createElement("div");
  div.innerHTML = blockHtml;
  if (type === EHintType.html) {
    div
      .querySelector("protyle-html")
      .setAttribute("data-content", `<div>${html}</div>`);
  }
  const child = div.firstChild as HTMLElement;
  return child;
};
