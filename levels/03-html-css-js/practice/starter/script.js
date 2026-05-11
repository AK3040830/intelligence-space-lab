/**
 * 第 03 关练习：点击按钮后，把 #msg 里的文字改成你想要的一句话。
 * 也可以改 alert 里的内容（若你改成 alert）。
 */
(function () {
  "use strict";

  var btn = document.getElementById("helloBtn");
  var msg = document.getElementById("msg");

  if (!btn || !msg) return;

  btn.addEventListener("click", function () {
    msg.textContent = "请把这句话改成：按钮点击后你想显示的一句提示（例如：你好，三件套我学会了！）";
  });
})();
