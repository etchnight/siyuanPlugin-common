import { Setting, Plugin } from "siyuan";

export const switchEle = (): HTMLInputElement => {
  const ele = document.createElement("input");
  ele.className = "b3-switch fn__flex-center";
  ele.type = "checkbox";
  return ele;
};
export const textEle = () => {
  const ele = document.createElement("input");
  ele.className = "b3-text-field fn__flex-center";
  ele.type = "text";
  return ele;
};

const sliderEle = (min: number, max: number, step: number) => {
  const ele = document.createElement("input");
  ele.className = "b3-slider fn__size200";
  ele.type = "range";
  ele.min = min.toString();
  ele.max = max.toString();
  ele.step = step.toString();
  /*   ele.addEventListener("input", (e) => {
    parent.setAttribute("aria-label", (e.target as HTMLInputElement).value);
  }); */

  return ele;
};

const sliderParent = (slider: HTMLInputElement) => {
  const parent = document.createElement("div");
  parent.className = "b3-tooltips b3-tooltips__n fn__flex-center";
  //parent.setAttribute("aria-label", max.toString());
  parent.appendChild(slider);
  slider.addEventListener("mouseenter", (e) => {
    parent.setAttribute("aria-label", (e.target as HTMLInputElement).value);
  });
  slider.addEventListener("mouseleave", (e) => {
    parent.setAttribute("aria-label", (e.target as HTMLInputElement).value);
  });
  return parent;
};
/**
 * @param type "switch" | "input";
 */
export type SettingData = {
  type: "switch" | "input" | "slider";
  range?: { min: number; max: number; step: number }; //用于初始化slider的值
  title: string;
  value: string | boolean | number;
  description?: string;
};

export const buildSetting = (
  data: { [key: string]: SettingData },
  config: {
    storageName: string;
    isReload?: boolean;
    plugin: Plugin;
    confirmCallback?: () => Promise<void>; //其他需要执行的回调
  }
): Setting => {
  const eleList: { [key: string]: HTMLInputElement } = {};
  for (const key of Object.keys(data)) {
    let ele: HTMLInputElement;
    switch (data[key].type) {
      case "switch":
        ele = switchEle();
        break;
      case "input":
        ele = textEle();
        break;
      case "slider": {
        if (!data[key].range) throw new Error("slider need range");
        const setValue = data[key].range;
        ele = sliderEle(setValue.min, setValue.max, setValue.step);
        break;
      }
    }
    eleList[key] = ele;
  }
  const setting = new Setting({
    confirmCallback: async () => {
      for (const key of Object.keys(data)) {
        let value: string | boolean | number;
        switch (data[key].type) {
          case "switch":
            value = eleList[key].checked;
            break;
          case "input":
            value = eleList[key].value;
            break;
          case "slider":
            value = parseInt(eleList[key].value);
            break;
        }
        data[key].value = value;
      }
      await config.plugin.saveData(config.storageName, data);
      config.isReload ? window.location.reload() : null;
      config.confirmCallback ? await config.confirmCallback() : null;
    },
  });
  for (const key of Object.keys(data)) {
    setting.addItem({
      title: data[key].title,
      description: data[key].description || "",
      createActionElement: () => {
        switch (data[key].type) {
          case "switch":
            eleList[key].checked = data[key].value as boolean;
            break;
          case "input":
            eleList[key].value = data[key].value as string;
            break;
          case "slider":
            eleList[key].value = String(data[key].value);
            return sliderParent(eleList[key]);
        }
        return eleList[key];
      },
    });
  }
  config.plugin.setting = setting;
  return setting;
};
