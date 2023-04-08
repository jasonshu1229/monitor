let lastEvent; // 用来存储用户操作最后一次的事件

["click", "mousedown", "keydown", "scroll", "touchstart"].forEach(
  (eventType) => {
    document.addEventListener(
      eventType,
      (event) => {
        lastEvent = event;
      },
      true // 捕获阶段
    );
  }
);

export default function getLastEvent() {
  return lastEvent;
}
