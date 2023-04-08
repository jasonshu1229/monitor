/**
 *
 * @param {*} event 事件对象
 * @returns {string} 选择器，比如：.container .content input
 */
function getSelector(event) {
  const path = event.composedPath();
  console.log("path", path);

  return path
    .reverse()
    .filter((elementType) => elementType !== document && elementType !== window)
    .map((element) => {
      let selector = element.tagName.toLowerCase();
      if (element.id) {
        selector += `#${element.id}`;
      } else if (element.className) {
        selector += `.${element.className}`;
      } else if (element.tagName) {
        selector;
      }
      return selector;
    })
    .join(" ");
}

export default getSelector;
