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

/**
 * @param type "switch" | "input";
 */
export type SettingData = {
  type: string;
  title: string;
  value: string | boolean;
  description?: string;
};

export const buildSetting = (
  data: { [key: string]: SettingData },
  config: {
    storageName: string;
    isReload?: boolean;
    plugin: Plugin;
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
    }
    eleList[key] = ele;
  }
  const setting = new Setting({
    confirmCallback: async () => {
      for (const key of Object.keys(data)) {
        let value: string | boolean;
        switch (data[key].type) {
          case "switch":
            value = eleList[key].checked;
            break;
          case "input":
            value = eleList[key].value;
            break;
        }
        data[key].value = value;
      }
      config.isReload
        ? await config.plugin.saveData(config.storageName, data)
        : null;
      window.location.reload();
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
        }
        return eleList[key];
      },
    });
  }
  config.plugin.setting = setting;
  return setting;
};
