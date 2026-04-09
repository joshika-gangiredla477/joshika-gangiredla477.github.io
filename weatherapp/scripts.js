/* javascript to enabled drag-scrolling */

let scrollingBox;
let offsetLeftStart;
let scrollLeftStart;
let isMoving;

document.addEventListener("DOMContentLoaded", function () {
  scrollingBox = document.querySelector("#futureInfo"); /* get a handle on the parent container by tag or ID */
  isMoving = false;

  scrollingBox.addEventListener("mousedown", function (e) {
    scrollLeftStart = scrollingBox.scrollLeft;
    offsetLeftStart = e.pageX - scrollingBox.offsetLeft;
    isMoving = true;
  });

  scrollingBox.addEventListener("mouseleave", function (e) {
    isMoving = false;
  });
  
  scrollingBox.addEventListener("mouseup", function (e) {
    isMoving = false;
  });

  scrollingBox.addEventListener("mousemove", function (e) {
    e.preventDefault();
    if (!isMoving) return;
    scrollingBox.scrollLeft = scrollLeftStart - (e.pageX - offsetLeftStart - scrollingBox.offsetLeft);
  });
});
