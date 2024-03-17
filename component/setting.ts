export const switchEle = (): HTMLInputElement => {
  let ele = document.createElement("input");
  ele.className = "b3-switch fn__flex-center";
  ele.type = "checkbox";
  return ele;
};
export const textEle = () => {
  let ele = document.createElement("input");
  ele.className = "b3-text-field fn__flex-center";
  ele.type = "text";
  return ele;
};
