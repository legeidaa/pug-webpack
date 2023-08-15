import './sdkInit'

const divElem = document.querySelector("body > div");

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    entry.target.style.width = entry.contentBoxSize[0].inlineSize + 10 + "px";
  }
});

window.addEventListener("error", function (e) {
  console.error(e.message);
});