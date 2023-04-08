const project = "jason-monitor";
const logStore = "jasonshumonitor-store";
const host = "cn-beijing.log.aliyuncs.com";

function getExtraData() {
  return {
    title: document.title,
    // 浏览器信息
    userAgent: navigator.userAgent,
    // 当前页面的URL
    currentUrl: location.href,
    timestamp: Date.now(),
  };
}

class SendTraker {
  constructor() {
    this.url = `https://${project}.${host}/logstores/${logStore}/track`; // 上报的路径
    this.xhr = new XMLHttpRequest();
  }

  send(data = {}) {
    let extraData = getExtraData();
    let log = { ...extraData, ...data };
    // 对象的值不能是数字（阿里云的要求）
    for (let key in log) {
      if (typeof log[key] === "number") {
        log[key] = `${log[key]}`;
      }
    }

    console.log("log", log);

    let body = JSON.stringify({
      __logs__: [log],
    });
    this.xhr.open("POST", this.url, true);
    this.xhr.setRequestHeader("Content-Type", "application/json");
    this.xhr.setRequestHeader("x-log-bodyrawsize", data.length);
    this.xhr.setRequestHeader("x-log-apiversion", "0.6.0");

    this.xhr.onload = function () {
      console.log("上报成功");
    };

    this.xhr.onerror = function () {
      console.log("上报失败");
    };
    this.xhr.send(body);
  }
}

export default new SendTraker();
