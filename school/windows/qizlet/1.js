(function () {
    let x = document.createElement("script");
    x.src = "https://cdn.jsdelivr.net/gh/SnowLord7/quizlet@master/index.js";
    x.onload = function () {
        x.remove();
    };
    document.body.appendChild(x);
})()
