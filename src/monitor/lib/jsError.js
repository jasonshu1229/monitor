import getLastEvent from "../utils/getLastEvent";
import getSelector from "../utils/getSelector";
import tracker from "../utils/tracker";

// 插入监控js错误脚本
export function injectJsError() {
  // 监听全局未捕获的错误
  window.addEventListener("error", function (event) {
    console.log(event);
    const lastEvent = getLastEvent(); // 获取用户最后一次操作的事件
    // console.log(lastEvent.composedPath());
    let log = {
      kind: "stability", // 监控指标的大类
      type: "error", // 小类型 这是一个错误
      errorType: "jsError", // js错误
      url: location.href, // 当前页面的url
      message: event.message, // 错误信息 ''
      filename: event.filename, // 出错的文件
      position: `${event.lineno}:${event.colno}`, // 出错的位置
      stacl: getLines(event.error.stack), // 错误的堆栈信息
      selector: lastEvent ? getSelector(lastEvent) : "", // 代表当前用户操作的元素
    };
    tracker.send(log); // 上报给服务器
    console.log("log", log);
  });

  function getLines(stack) {
    return stack
      .split("\n")
      .slice(1)
      .map((item) => item.replace(/^\s+at\s+/g, ""))
      .join("^");
  }
}
