/* javascript to enabled drag-scrolling */

//preparing variables
let scrollingBox;
let offsetLeftStart;
let scrollLeftStart;
let isMoving;


//function to get remote JSON
async function getData(url, options) {
    try {
        const response = await fetch(url, options);
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            throw (response.status);
        }
    } catch (error) {
        console.error(error);
    }
}



//wait for dom to load
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

    let sampleURL = "https://tordevries.github.io/477/examples/ajax-api-test/current.js";
    let sampleOptions = {}

    //get sample data
    getData(sampleURL, sampleOptions).then(function (result) {
        // code to operate on “result” JSON object
        console.log(result.current.temp_f);
    });






});
