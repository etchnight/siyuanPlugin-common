import { Constants, Viz } from "siyuan";

const getTopAloneElement = (topSourceElement: Element) => {
  if (
    "NodeBlockquote" ===
      topSourceElement.parentElement.getAttribute("data-type") &&
    topSourceElement.parentElement.childElementCount === 2
  ) {
    while (
      !topSourceElement.parentElement.classList.contains("protyle-wysiwyg")
    ) {
      if (
        topSourceElement.parentElement.getAttribute("data-type") ===
          "NodeBlockquote" &&
        topSourceElement.parentElement.childElementCount === 2
      ) {
        topSourceElement = topSourceElement.parentElement;
      } else {
        topSourceElement = getTopAloneElement(topSourceElement);
        break;
      }
    }
  } else if (
    "NodeSuperBlock" ===
      topSourceElement.parentElement.getAttribute("data-type") &&
    topSourceElement.parentElement.childElementCount === 2
  ) {
    while (
      !topSourceElement.parentElement.classList.contains("protyle-wysiwyg")
    ) {
      if (
        topSourceElement.parentElement.getAttribute("data-type") ===
          "NodeSuperBlock" &&
        topSourceElement.parentElement.childElementCount === 2
      ) {
        topSourceElement = topSourceElement.parentElement;
      } else {
        topSourceElement = getTopAloneElement(topSourceElement);
        break;
      }
    }
  } else if (
    "NodeListItem" ===
      topSourceElement.parentElement.getAttribute("data-type") &&
    topSourceElement.parentElement.childElementCount === 3
  ) {
    while (
      !topSourceElement.parentElement.classList.contains("protyle-wysiwyg")
    ) {
      if (
        topSourceElement.parentElement.getAttribute("data-type") ===
          "NodeListItem" &&
        topSourceElement.parentElement.childElementCount === 3
      ) {
        topSourceElement = topSourceElement.parentElement;
      } else if (
        topSourceElement.parentElement.getAttribute("data-type") ===
          "NodeList" &&
        topSourceElement.parentElement.childElementCount === 2
      ) {
        topSourceElement = topSourceElement.parentElement;
      } else {
        topSourceElement = getTopAloneElement(topSourceElement);
        break;
      }
    }
  } else if (
    "NodeList" === topSourceElement.parentElement.getAttribute("data-type") &&
    topSourceElement.parentElement.childElementCount === 2
  ) {
    while (
      !topSourceElement.parentElement.classList.contains("protyle-wysiwyg")
    ) {
      if (
        "NodeList" ===
          topSourceElement.parentElement.getAttribute("data-type") &&
        topSourceElement.parentElement.childElementCount === 2
      ) {
        topSourceElement = topSourceElement.parentElement;
      } else if (
        topSourceElement.parentElement.getAttribute("data-type") ===
          "NodeListItem" &&
        topSourceElement.parentElement.childElementCount === 3
      ) {
        topSourceElement = topSourceElement.parentElement;
      } else {
        topSourceElement = getTopAloneElement(topSourceElement);
        break;
      }
    }
  }
  return topSourceElement;
};
const hasNextSibling = (element: Node) => {
  let nextSibling = element.nextSibling;
  while (nextSibling) {
    if (nextSibling.textContent === "" && nextSibling.nodeType === 3) {
      nextSibling = nextSibling.nextSibling;
    } else {
      return nextSibling;
    }
  }
  return false;
};
const hasPreviousSibling = (element: Node) => {
  let previousSibling = element.previousSibling;
  while (previousSibling) {
    if (previousSibling.textContent === "" && previousSibling.nodeType === 3) {
      previousSibling = previousSibling.previousSibling;
    } else {
      return previousSibling;
    }
  }
  return false;
};
const addStyle = (url: string, id: string) => {
  if (!document.getElementById(id)) {
    const styleElement = document.createElement("link");
    styleElement.id = id;
    styleElement.rel = "stylesheet";
    styleElement.type = "text/css";
    styleElement.href = url;
    const pluginsStyle = document.querySelector("#pluginsStyle");
    if (pluginsStyle) {
      pluginsStyle.before(styleElement);
    } else {
      document.getElementsByTagName("head")[0].appendChild(styleElement);
    }
  }
};
const looseJsonParse = (text: string) => {
  return Function(`"use strict";return (${text})`)();
};
const objEquals = (a: any, b: any): boolean => {
  if (a === b) return true;
  if (typeof a === "number" && isNaN(a) && typeof b === "number" && isNaN(b))
    return true;
  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime();
  if (!a || !b || (typeof a !== "object" && typeof b !== "object"))
    return a === b;
  if (a.prototype !== b.prototype) return false;
  const keys = Object.keys(a);
  if (keys.length !== Object.keys(b).length) return false;
  return keys.every((k) => objEquals(a[k], b[k]));
};
const hasClosestByAttribute = (
  element: Node,
  attr: string,
  value: string | null,
  top = false
) => {
  if (!element || element.nodeType === 9) {
    return false;
  }
  if (element.nodeType === 3) {
    element = element.parentElement;
  }
  let e = element as HTMLElement;
  let isClosest = false;
  while (
    e &&
    !isClosest &&
    (top ? e.tagName !== "BODY" : !e.classList.contains("protyle-wysiwyg"))
  ) {
    if (
      typeof value === "string" &&
      e.getAttribute(attr)?.split(" ").includes(value)
    ) {
      isClosest = true;
    } else if (typeof value !== "string" && e.hasAttribute(attr)) {
      isClosest = true;
    } else {
      e = e.parentElement;
    }
  }
  return isClosest && e;
};
const hasClosestBlock = (element: Node) => {
  const nodeElement = hasClosestByAttribute(element, "data-node-id", null);
  if (
    nodeElement &&
    nodeElement.tagName !== "BUTTON" &&
    nodeElement.getAttribute("data-type")?.startsWith("Node")
  ) {
    return nodeElement;
  }
  return false;
};
const hasClosestByClassName = (
  element: Node,
  className: string,
  top = false
) => {
  if (!element || element.nodeType === 9) {
    return false;
  }
  if (element.nodeType === 3) {
    element = element.parentElement;
  }
  let e = element as HTMLElement;
  let isClosest = false;
  while (
    e &&
    !isClosest &&
    (top ? e.tagName !== "BODY" : !e.classList.contains("protyle-wysiwyg"))
  ) {
    if (e.classList?.contains(className)) {
      isClosest = true;
    } else {
      e = e.parentElement;
    }
  }
  return isClosest && e;
};
const genIconHTML = (element?: false | HTMLElement) => {
  let enable = true;
  if (element) {
    const readonly = element.getAttribute("contenteditable");
    if (typeof readonly === "string") {
      enable = element.getAttribute("contenteditable") === "true";
    } else {
      return '<div class="protyle-icons"></div>';
    }
  }
  return `<div class="protyle-icons">
        <span aria-label="${window.siyuan.languages.edit}" class="b3-tooltips__nw b3-tooltips protyle-icon protyle-icon--first protyle-action__edit${enable ? "" : " fn__none"}"><svg><use xlink:href="#iconEdit"></use></svg></span>
        <span aria-label="${window.siyuan.languages.more}" class="b3-tooltips__nw b3-tooltips protyle-icon protyle-action__menu protyle-icon--last${enable ? "" : " protyle-icon--first"}"><svg><use xlink:href="#iconMore"></use></svg></span>
    </div>`;
};
const addScript = (path: string, id: string) => {
  return new Promise((resolve) => {
    if (document.getElementById(id)) {
      // 脚本加载后再次调用直接返回
      resolve(false);
      return false;
    }
    const scriptElement = document.createElement("script");
    scriptElement.src = path;
    scriptElement.async = true;
    // 循环调用时 Chrome 不会重复请求 js
    document.head.appendChild(scriptElement);
    scriptElement.onload = () => {
      if (document.getElementById(id)) {
        // 循环调用需清除 DOM 中的 script 标签
        scriptElement.remove();
        resolve(false);
        return false;
      }
      scriptElement.id = id;
      resolve(true);
    };
  });
};
const htmlRender = (element: Element) => {
  let htmlElements: Element[] = [];
  if (element.getAttribute("data-type") === "NodeHTMLBlock") {
    // 编辑器内代码块编辑渲染
    htmlElements = [element];
  } else {
    htmlElements = Array.from(
      element.querySelectorAll('[data-type="NodeHTMLBlock"]')
    );
  }
  if (htmlElements.length === 0) {
    return;
  }
  if (htmlElements.length > 0) {
    htmlElements.forEach((e: HTMLDivElement) => {
      e.firstElementChild.firstElementChild.setAttribute(
        "aria-label",
        window.siyuan.languages.edit
      );
      e.firstElementChild.lastElementChild.setAttribute(
        "aria-label",
        window.siyuan.languages.more
      );
    });
  }
};

const plantumlRender = (element: Element, cdn = Constants.PROTYLE_CDN) => {
  let plantumlElements: Element[] = [];
  if (element.getAttribute("data-subtype") === "plantuml") {
    // 编辑器内代码块编辑渲染
    plantumlElements = [element];
  } else {
    plantumlElements = Array.from(
      element.querySelectorAll('[data-subtype="plantuml"]')
    );
  }
  if (plantumlElements.length === 0) {
    return;
  }
  addScript(
    `${cdn}/js/plantuml/plantuml-encoder.min.js?v=0.0.0`,
    "protylePlantumlScript"
  ).then(() => {
    const wysiswgElement = hasClosestByClassName(
      element,
      "protyle-wysiwyg",
      true
    );
    plantumlElements.forEach((e: HTMLDivElement) => {
      if (e.getAttribute("data-render") === "true") {
        return;
      }
      if (!e.firstElementChild.classList.contains("protyle-icons")) {
        e.insertAdjacentHTML("afterbegin", genIconHTML(wysiswgElement));
      }
      const renderElement = e.firstElementChild
        .nextElementSibling as HTMLElement;
      try {
        renderElement.innerHTML = `<img src=${window.siyuan.config.editor.plantUMLServePath}${window.plantumlEncoder.encode(window.Lute.UnEscapeHTMLStr(e.getAttribute("data-content")))}">`;
        renderElement.classList.remove("ft__error");
        e.setAttribute("data-render", "true");
      } catch (error) {
        renderElement.classList.add("ft__error");
        renderElement.innerHTML = `plantuml render error: <br>${error}`;
      }
    });
  });
};
declare const flowchart: {
  parse(text: string): { drawSVG: (type: Element) => void };
};
const flowchartRender = (element: Element, cdn = Constants.PROTYLE_CDN) => {
  let flowchartElements: Element[] = [];
  if (element.getAttribute("data-subtype") === "flowchart") {
    // 编辑器内代码块编辑渲染
    flowchartElements = [element];
  } else {
    flowchartElements = Array.from(
      element.querySelectorAll('[data-subtype="flowchart"]')
    );
  }
  if (flowchartElements.length === 0) {
    return;
  }
  addScript(
    `${cdn}/js/flowchart.js/flowchart.min.js?v=1.18.0`,
    "protyleFlowchartScript"
  ).then(() => {
    if (flowchartElements[0].firstElementChild.clientWidth === 0) {
      const observer = new MutationObserver(() => {
        initFlowchart(flowchartElements);
        observer.disconnect();
      });
      const hideElement = hasClosestByAttribute(
        flowchartElements[0],
        "fold",
        "1"
      );
      if (hideElement) {
        observer.observe(hideElement, { attributeFilter: ["fold"] });
      } else {
        const cardElement = hasClosestByClassName(
          flowchartElements[0],
          "card__block",
          true
        );
        if (cardElement) {
          observer.observe(cardElement, { attributeFilter: ["class"] });
        }
      }
    } else {
      initFlowchart(flowchartElements);
    }
  });
};
const initFlowchart = (flowchartElements: Element[]) => {
  const wysiswgElement = hasClosestByClassName(
    flowchartElements[0],
    "protyle-wysiwyg",
    true
  );
  flowchartElements.forEach((item: HTMLElement) => {
    if (item.getAttribute("data-render") === "true") {
      return;
    }
    if (!item.firstElementChild.classList.contains("protyle-icons")) {
      item.insertAdjacentHTML("afterbegin", genIconHTML(wysiswgElement));
    }
    const renderElement = item.firstElementChild.nextElementSibling;
    renderElement.innerHTML = `<span style="position: absolute;left:0;top:0;width: 1px;">${Constants.ZWSP}</span><div class="ft__error" contenteditable="false"></div>`;
    try {
      flowchart
        .parse(window.Lute.UnEscapeHTMLStr(item.getAttribute("data-content")))
        .drawSVG(renderElement.lastElementChild);
    } catch (error) {
      renderElement.innerHTML = `<span style="position: absolute;left:0;top:0;width: 1px;">${Constants.ZWSP}</span><div class="ft__error" contenteditable="false">Flow Chart render error: <br>${error}</div>`;
    }
    item.setAttribute("data-render", "true");
  });
};
const mindmapRender = (element: Element, cdn = Constants.PROTYLE_CDN) => {
  let mindmapElements: Element[] = [];
  if (element.getAttribute("data-subtype") === "mindmap") {
    // 编辑器内代码块编辑渲染
    mindmapElements = [element];
  } else {
    mindmapElements = Array.from(
      element.querySelectorAll('[data-subtype="mindmap"]')
    );
  }
  if (mindmapElements.length === 0) {
    return;
  }
  addScript(
    `${cdn}/js/echarts/echarts.min.js?v=0.0.0`,
    "protyleEchartsScript"
  ).then(() => {
    const wysiswgElement = hasClosestByClassName(
      element,
      "protyle-wysiwyg",
      true
    );
    let width: number = undefined;
    if (
      wysiswgElement &&
      wysiswgElement.clientWidth > 0 &&
      mindmapElements[0].firstElementChild.clientWidth === 0 &&
      wysiswgElement.firstElementChild
    ) {
      width = wysiswgElement.firstElementChild.clientWidth;
    }
    mindmapElements.forEach((e: HTMLDivElement) => {
      if (e.getAttribute("data-render") === "true") {
        return;
      }
      if (!e.firstElementChild.classList.contains("protyle-icons")) {
        e.insertAdjacentHTML("afterbegin", genIconHTML(wysiswgElement));
      }
      const renderElement = e.firstElementChild
        .nextElementSibling as HTMLElement;
      try {
        renderElement.style.height = e.style.height;
        window.echarts
          .init(
            renderElement,
            window.siyuan.config.appearance.mode === 1 ? "dark" : undefined,
            {
              width,
            }
          )
          .setOption({
            series: [
              {
                data: [
                  JSON.parse(
                    window.Lute.EChartsMindmapStr(
                      window.Lute.UnEscapeHTMLStr(
                        e.getAttribute("data-content")
                      )
                    )
                  ),
                ],
                initialTreeDepth: -1,
                itemStyle: {
                  borderWidth: 0,
                  color: "#4285f4",
                },
                label: {
                  backgroundColor: "#f6f8fa",
                  borderColor: "#d1d5da",
                  borderRadius: 6,
                  borderWidth: 0.5,
                  color: "#586069",
                  lineHeight: 20,
                  offset: [-5, 0],
                  padding: [0, 5],
                  position: "insideRight",
                },
                lineStyle: {
                  color: "#d1d5da",
                  width: 1,
                },
                roam: true,
                symbol: (
                  value: number,
                  params: { data?: { children?: string } }
                ) => {
                  if (params?.data?.children) {
                    return "circle";
                  } else {
                    return "path://";
                  }
                },
                type: "tree",
              },
            ],
            tooltip: {
              trigger: "item",
              triggerOn: "mousemove",
            },
            backgroundColor: "transparent",
          });
        e.setAttribute("data-render", "true");
        if (!renderElement.textContent.endsWith(Constants.ZWSP)) {
          renderElement.firstElementChild.insertAdjacentText(
            "beforeend",
            Constants.ZWSP
          );
        }
        renderElement.classList.remove("ft__error");
      } catch (error) {
        renderElement.classList.add("ft__error");
        renderElement.innerHTML = `Mindmap render error: <br>${error}`;
      }
    });
  });
};
const mermaidRender = (element: Element, cdn = Constants.PROTYLE_CDN) => {
  let mermaidElements: Element[] = [];
  if (element.getAttribute("data-subtype") === "mermaid") {
    // 编辑器内代码块编辑渲染
    mermaidElements = [element];
  } else {
    mermaidElements = Array.from(
      element.querySelectorAll('[data-subtype="mermaid"]')
    );
  }
  if (mermaidElements.length === 0) {
    return;
  }
  addScript(
    `${cdn}/js/mermaid/mermaid.min.js?v=11.4.0`,
    "protyleMermaidScript"
  ).then(() => {
    const config: any = {
      securityLevel: "loose", // 升级后无 https://github.com/siyuan-note/siyuan/issues/3587，可使用该选项
      altFontFamily: "sans-serif",
      fontFamily: "sans-serif",
      startOnLoad: false,
      flowchart: {
        htmlLabels: true,
        useMaxWidth: !0,
      },
      sequence: {
        useMaxWidth: true,
        diagramMarginX: 8,
        diagramMarginY: 8,
        boxMargin: 8,
        showSequenceNumbers: true, // Mermaid 时序图增加序号 https://github.com/siyuan-note/siyuan/pull/6992 https://mermaid.js.org/syntax/sequenceDiagram.html#sequencenumbers
      },
      gantt: {
        leftPadding: 75,
        rightPadding: 20,
      },
    };
    if (window.siyuan.config.appearance.mode === 1) {
      config.theme = "dark";
    }
    window.mermaid.initialize(config);
    if (mermaidElements[0].firstElementChild.clientWidth === 0) {
      const observer = new MutationObserver(() => {
        initMermaid(mermaidElements);
        observer.disconnect();
      });
      const hideElement = hasClosestByAttribute(
        mermaidElements[0],
        "fold",
        "1"
      );
      if (hideElement) {
        observer.observe(hideElement, { attributeFilter: ["fold"] });
      } else {
        const cardElement = hasClosestByClassName(
          mermaidElements[0],
          "card__block",
          true
        );
        if (cardElement) {
          observer.observe(cardElement, { attributeFilter: ["class"] });
        }
      }
    } else {
      initMermaid(mermaidElements);
    }
  });
};
const initMermaid = (mermaidElements: Element[]) => {
  const wysiswgElement = hasClosestByClassName(
    mermaidElements[0],
    "protyle-wysiwyg",
    true
  );
  mermaidElements.forEach(async (item: HTMLElement) => {
    if (item.getAttribute("data-render") === "true") {
      return;
    }
    if (!item.firstElementChild.classList.contains("protyle-icons")) {
      item.insertAdjacentHTML("afterbegin", genIconHTML(wysiswgElement));
    }
    const renderElement = item.firstElementChild
      .nextElementSibling as HTMLElement;
    const id = "mermaid" + window.Lute.NewNodeID();
    renderElement.innerHTML = `<span style="position: absolute;left:0;top:0;width: 1px;">${Constants.ZWSP}</span><div contenteditable="false"><span id="${id}"></span></div>`;
    try {
      const mermaidData = await window.mermaid.render(
        id,
        window.Lute.UnEscapeHTMLStr(item.getAttribute("data-content"))
      );
      renderElement.lastElementChild.innerHTML = mermaidData.svg;
    } catch (e) {
      const errorElement = document.querySelector("#" + id);
      renderElement.lastElementChild.innerHTML = `${errorElement.outerHTML}<div class="fn__hr"></div><div class="ft__error">${e.message.replace(/\n/, "<br>")}</div>`;
      errorElement.parentElement.remove();
    }

    item.setAttribute("data-render", "true");
  });
};
const mathRender = (
  element: Element,
  cdn = Constants.PROTYLE_CDN,
  maxWidth = false
) => {
  let mathElements: Element[] = [];
  if (element.getAttribute("data-subtype") === "math") {
    // 编辑器内代码块编辑渲染
    mathElements = [element];
  } else {
    mathElements = Array.from(
      element.querySelectorAll('[data-subtype="math"]')
    );
  }
  if (mathElements.length === 0) {
    return;
  }
  addStyle(`${cdn}/js/katex/katex.min.css?v=0.16.9`, "protyleKatexStyle");
  addScript(`${cdn}/js/katex/katex.min.js?v=0.16.9`, "protyleKatexScript").then(
    () => {
      addScript(
        `${cdn}/js/katex/mhchem.min.js?v=0.16.9`,
        "protyleKatexMhchemScript"
      ).then(() => {
        mathElements.forEach((mathElement: HTMLElement) => {
          if (mathElement.getAttribute("data-render") === "true") {
            return;
          }
          mathElement.setAttribute("data-render", "true");
          let renderElement = mathElement;
          if (mathElement.tagName === "DIV") {
            renderElement = mathElement.firstElementChild as HTMLElement;
          }
          let macros = {};
          try {
            macros = looseJsonParse(
              window.siyuan.config.editor.katexMacros || "{}"
            );
          } catch (e) {
            console.warn("KaTex macros is not JSON", e);
          }
          try {
            renderElement.innerHTML = window.katex.renderToString(
              window.Lute.UnEscapeHTMLStr(
                mathElement.getAttribute("data-content")
              ),
              {
                displayMode: mathElement.tagName === "DIV",
                output: "html",
                macros,
                trust: true, // REF: https://katex.org/docs/supported#html
                strict: (errorCode) =>
                  errorCode === "unicodeTextInMathMode" ? "ignore" : "warn",
              }
            );
            renderElement.classList.remove("ft__error");
            const blockElement = hasClosestBlock(mathElement);
            if (mathElement.tagName === "DIV") {
              renderElement.firstElementChild.setAttribute(
                "contenteditable",
                "false"
              );
              if (renderElement.childElementCount < 2) {
                // 不能使用 contenteditable="false"，否则光标无法移动到该块
                renderElement.insertAdjacentHTML(
                  "beforeend",
                  `<span style="position: absolute;right: 0;top: 0;">${Constants.ZWSP}</span>`
                );
              }
              // https://github.com/siyuan-note/siyuan/issues/3541
              const baseElements = renderElement.querySelectorAll(".base");
              if (baseElements.length > 0) {
                baseElements[baseElements.length - 1].insertAdjacentHTML(
                  "afterend",
                  "<span class='fn__flex-1'></span>"
                );
              }
              // https://github.com/siyuan-note/siyuan/issues/4334
              const newlineElement = renderElement.querySelector(
                ".katex-html > .newline"
              );
              if (newlineElement) {
                newlineElement.parentElement.style.display = "block";
              }
            } else {
              if (
                blockElement &&
                mathElement.getBoundingClientRect().width >
                  blockElement.clientWidth
              ) {
                mathElement.style.maxWidth = "100%";
                mathElement.style.overflowX = "auto";
                mathElement.style.overflowY = "hidden";
                mathElement.style.display = "inline-block";
              } else {
                mathElement.style.maxWidth = "";
                mathElement.style.overflowX = "";
                mathElement.style.overflowY = "";
                mathElement.style.display = "";
              }
              const nextSibling = hasNextSibling(mathElement) as HTMLElement;
              if (!nextSibling) {
                // 表格编辑问题 https://ld246.com/article/1629191424824
                if (
                  mathElement.parentElement.tagName !== "TH" &&
                  mathElement.parentElement.tagName !== "TD"
                ) {
                  // 光标无法移动到末尾 https://github.com/siyuan-note/siyuan/issues/2112
                  mathElement.insertAdjacentText("afterend", "\n");
                } else {
                  // https://ld246.com/article/1651595975481，https://ld246.com/article/1658903123429
                  // 随着浏览器的升级，从 beforeend 修改为 afterend
                  mathElement.insertAdjacentText("afterend", Constants.ZWSP);
                }
              } else if (
                nextSibling &&
                nextSibling.nodeType !== 3 &&
                (nextSibling.getAttribute("data-type")?.indexOf("inline-math") >
                  -1 ||
                  nextSibling.classList.contains("img"))
              ) {
                // 相邻的数学公式删除或光标移动有问题
                mathElement.after(document.createTextNode(Constants.ZWSP));
              } else if (
                nextSibling &&
                !nextSibling.textContent.startsWith("\n") && // https://github.com/siyuan-note/insider/issues/1089
                // 输入 $a$ 后，光标移动到其他块，再点击 a 后，光标不显示 https://github.com/siyuan-note/insider/issues/1076#issuecomment-1253215515
                nextSibling.textContent !== Constants.ZWSP
              ) {
                // 数学公式后一个字符删除多 br https://ld246.com/article/1647157880974
                // 数学公式后有 \n 不能再添加 &#xFEFF; https://ld246.com/article/1647329437541
                mathElement.insertAdjacentHTML("beforeend", "&#xFEFF;");
              }
              // 光标无法移动到段首 https://ld246.com/article/1623551823742
              if (mathElement.previousSibling?.textContent.endsWith("\n")) {
                mathElement.insertAdjacentText("beforebegin", Constants.ZWSP);
              } else if (
                !hasPreviousSibling(mathElement) &&
                ["TH", "TD"].includes(mathElement.parentElement.tagName)
              ) {
                // 单元格中只有数学公式时，光标无法移动到数学公式前
                mathElement.insertAdjacentText("afterbegin", Constants.ZWSP);
              }
            }

            // export pdf
            if (maxWidth) {
              setTimeout(() => {
                if (mathElement.tagName === "DIV") {
                  const katexElement =
                    mathElement.querySelector(".katex-display");
                  if (katexElement.clientWidth < katexElement.scrollWidth) {
                    katexElement.firstElementChild.setAttribute(
                      "style",
                      `font-size:${(katexElement.clientWidth * 100) / katexElement.scrollWidth}%`
                    );
                  }
                } else {
                  if (
                    blockElement &&
                    mathElement.offsetWidth > blockElement.clientWidth
                  ) {
                    mathElement.firstElementChild.setAttribute(
                      "style",
                      `font-size:${(blockElement.clientWidth * 100) / mathElement.offsetWidth}%`
                    );
                  }
                }
              });
            }
          } catch (e) {
            renderElement.innerHTML = e.message;
            renderElement.classList.add("ft__error");
          }
        });
      });
    }
  );
};
const graphvizRender = (element: Element, cdn = Constants.PROTYLE_CDN) => {
  let graphvizElements: Element[] = [];
  if (element.getAttribute("data-subtype") === "graphviz") {
    // 编辑器内代码块编辑渲染
    graphvizElements = [element];
  } else {
    graphvizElements = Array.from(
      element.querySelectorAll('[data-subtype="graphviz"]')
    );
  }
  if (graphvizElements.length === 0) {
    return;
  }
  addScript(`${cdn}/js/graphviz/viz.js?v=0.0.0`, "protyleGraphVizScript").then(
    () => {
      const wysiswgElement = hasClosestByClassName(
        element,
        "protyle-wysiwyg",
        true
      );
      graphvizElements.forEach((e: HTMLDivElement) => {
        if (e.getAttribute("data-render") === "true") {
          return;
        }
        if (!e.firstElementChild.classList.contains("protyle-icons")) {
          e.insertAdjacentHTML("afterbegin", genIconHTML(wysiswgElement));
        }
        const renderElement = e.firstElementChild
          .nextElementSibling as HTMLElement;
        try {
          const blob = new Blob(
            [
              `importScripts('${(document.getElementById("protyleGraphVizScript") as HTMLScriptElement).src.replace("viz.js", "full.render.js")}');`,
            ],
            { type: "application/javascript" }
          );
          const url = window.URL || window.webkitURL;
          const blobUrl = url.createObjectURL(blob);
          const worker = new Worker(blobUrl);
          new Viz({ worker })
            .renderSVGElement(
              window.Lute.UnEscapeHTMLStr(e.getAttribute("data-content"))
            )
            .then((result: HTMLElement) => {
              renderElement.innerHTML = `<span style="position: absolute;left:0;top:0;width: 1px;">${Constants.ZWSP}</span><div contenteditable="false">${result.outerHTML}</div>`;
            })
            .catch((error) => {
              renderElement.innerHTML = `<span style="position: absolute;left:0;top:0;width: 1px;">${Constants.ZWSP}</span><div class="ft__error" contenteditable="false">graphviz render error: <br>${error}</div>`;
            });
        } catch (e) {
          console.error("Graphviz error", e);
        }
        e.setAttribute("data-render", "true");
      });
    }
  );
};
export const chartRender = (element: Element, cdn = Constants.PROTYLE_CDN) => {
  let echartsElements: Element[] = [];
  if (element.getAttribute("data-subtype") === "echarts") {
    // 编辑器内代码块编辑渲染
    echartsElements = [element];
  } else {
    echartsElements = Array.from(
      element.querySelectorAll('[data-subtype="echarts"]')
    );
  }
  if (echartsElements.length === 0) {
    return;
  }
  if (echartsElements.length > 0) {
    addScript(
      `${cdn}/js/echarts/echarts.min.js?v=5.3.2`,
      "protyleEchartsScript"
    ).then(() => {
      addScript(
        `${cdn}/js/echarts/echarts-gl.min.js?v=2.0.9`,
        "protyleEchartsGLScript"
      ).then(() => {
        const wysiswgElement = hasClosestByClassName(
          element,
          "protyle-wysiwyg",
          true
        );
        let width: number = undefined;
        if (
          wysiswgElement &&
          wysiswgElement.clientWidth > 0 &&
          echartsElements[0].firstElementChild.clientWidth === 0 &&
          wysiswgElement.firstElementChild
        ) {
          width = wysiswgElement.firstElementChild.clientWidth;
        }
        echartsElements.forEach(async (e: HTMLDivElement) => {
          if (e.getAttribute("data-render") === "true") {
            return;
          }
          if (!e.firstElementChild.classList.contains("protyle-icons")) {
            e.insertAdjacentHTML("afterbegin", genIconHTML(wysiswgElement));
          }
          const renderElement = e.firstElementChild
            .nextElementSibling as HTMLElement;
          try {
            renderElement.style.height = e.style.height;
            const option = await looseJsonParse(
              window.Lute.UnEscapeHTMLStr(e.getAttribute("data-content"))
            );
            window.echarts
              .init(
                renderElement,
                window.siyuan.config.appearance.mode === 1 ? "dark" : undefined,
                { width }
              )
              .setOption(option);
            e.setAttribute("data-render", "true");
            renderElement.classList.remove("ft__error");
            if (!renderElement.textContent.endsWith(Constants.ZWSP)) {
              renderElement.firstElementChild.insertAdjacentText(
                "beforeend",
                Constants.ZWSP
              );
            }
          } catch (error) {
            window.echarts.dispose(renderElement);
            renderElement.classList.add("ft__error");
            renderElement.innerHTML = `echarts render error: <br>${error}`;
          }
        });
      });
    });
  }
};
const ABCJS_PARAMS_KEY = "%%params";
const getAbcParams = (abcString: string): any => {
  let params = {
    responsive: "resize",
  };
  const firstLine = abcString.substring(0, abcString.indexOf("\n"));
  if (firstLine.startsWith(ABCJS_PARAMS_KEY)) {
    try {
      params = looseJsonParse(firstLine.substring(ABCJS_PARAMS_KEY.length));
    } catch (e) {
      console.error(`Failed to parse ABCJS params: ${e}`);
    }
  }
  return params;
};
export const abcRender = (element: Element, cdn = Constants.PROTYLE_CDN) => {
  let abcElements: Element[] = [];
  if (element.getAttribute("data-subtype") === "abc") {
    // 编辑器内代码块编辑渲染
    abcElements = [element];
  } else {
    abcElements = Array.from(element.querySelectorAll('[data-subtype="abc"]'));
  }
  if (abcElements.length === 0) {
    return;
  }
  if (abcElements.length > 0) {
    addScript(
      `${cdn}/js/abcjs/abcjs-basic-min.js?v=6.2.2`,
      "protyleAbcjsScript"
    ).then(() => {
      const wysiswgElement = hasClosestByClassName(
        element,
        "protyle-wysiwyg",
        true
      );
      abcElements.forEach((e: HTMLDivElement) => {
        if (e.getAttribute("data-render") === "true") {
          return;
        }
        if (!e.firstElementChild.classList.contains("protyle-icons")) {
          e.insertAdjacentHTML("afterbegin", genIconHTML(wysiswgElement));
        }
        const renderElement = e.firstElementChild
          .nextElementSibling as HTMLElement;
        renderElement.innerHTML = `<span style="position: absolute;left:0;top:0;width: 1px;">${Constants.ZWSP}</span><div contenteditable="false"></div>`;
        const abcString = window.Lute.UnEscapeHTMLStr(
          e.getAttribute("data-content")
        );
        window.ABCJS.renderAbc(
          renderElement.lastElementChild,
          abcString,
          getAbcParams(abcString)
        );
        e.setAttribute("data-render", "true");
      });
    });
  }
};

export const processRender = (previewPanel: Element) => {
  const language = previewPanel.getAttribute("data-subtype");
  if (
    !Constants.SIYUAN_RENDER_CODE_LANGUAGES.includes(language) ||
    previewPanel.getAttribute("data-type") !== "NodeHTMLBlock"
  ) {
    abcRender(previewPanel);
    htmlRender(previewPanel);
    plantumlRender(previewPanel);
    mermaidRender(previewPanel);
    flowchartRender(previewPanel);
    chartRender(previewPanel);
    mindmapRender(previewPanel);
    graphvizRender(previewPanel);
    mathRender(previewPanel);
    return;
  }
  if (language === "abc") {
    abcRender(previewPanel);
  } else if (language === "plantuml") {
    plantumlRender(previewPanel);
  } else if (language === "mermaid") {
    mermaidRender(previewPanel);
  } else if (language === "flowchart") {
    flowchartRender(previewPanel);
  } else if (language === "echarts") {
    chartRender(previewPanel);
  } else if (language === "mindmap") {
    mindmapRender(previewPanel);
  } else if (language === "graphviz") {
    graphvizRender(previewPanel);
  } else if (language === "math") {
    mathRender(previewPanel);
  } else if (previewPanel.getAttribute("data-type") === "NodeHTMLBlock") {
    htmlRender(previewPanel);
  }
};
