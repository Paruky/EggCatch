"use strict";
let ctx;
let score = 0;
let prob = 0.96;
let basketX = 0;
let timerId = NaN;
let basket, chick, egg1, egg2, div1, div2;
let height;
let width;
let canvas;
let canvasSize = 600; // 自由に変更してね！canvasの大きさだよ！

let scoreDisplay;
let eggs = [];
let back;

onload = function() {
    ctx = document.getElementById("field").getContext("2d");
    ctx.font = "40px 'sniglet', 'Roboto', 'Arial', sans-serif";
    
    basket = document.getElementById("basket");
    chick = document.getElementById("chick");
    egg1 = document.getElementById("egg1");
    egg2 = document.getElementById("egg2");
    back = document.getElementById("back");
    canvas = document.getElementById("field");
    width = window.innerWidth;
    height = window.innerHeight;
    scoreDisplay = document.getElementById("score");
    div1 = document.getElementsByClassName("header")[0];
    div2 = document.getElementsByClassName("footer")[0];

    if (width < 600) {
        canvasSize = width;
    }

    canvas.width = canvasSize;
    canvas.height = canvasSize;
    
    div1.style.height = (height - canvasSize) / 2 + "px";
    div2.style.height = (height - canvasSize) / 2 + "px";
    div1.style.width = canvasSize + "px";
    div2.style.width = canvasSize + "px";

    timerId = setInterval(tick, 50);
    window.onmousemove = (e) => {
        basketX = e.offsetX;
    };
    window.ontouchmove = (e) => {
        basketX = e.touches[0].offsetX;
    }
};

function tick() {
    ctx.drawImage(back, 0, 0);
    ctx.drawImage(basket, basketX - 50, canvasSize - 100);
    if (Math.random() > prob) {
        eggs.push({x: Math.random() * (canvasSize - 100), y: 1});
    }
    let prev = eggs.length;
    eggs = eggs.filter((e) => {
        return (
            e.y < (canvasSize - 200) || e.y > canvasSize || e.x < basketX - 50 || e.x > basketX + 50
        );
    });
    if (prev != eggs.length) {
        score++;
        prob -= 0.001;
    }

    ctx.fillStyle = "green";
    scoreDisplay.textContent = "Score: " + score;
    eggs.forEach((e) => {
        e.y += e.y * 0.05 + 1;
        if (e.y < 50) {
            ctx.drawImage(chick, e.x, 10);
        } else {
            ctx.drawImage(egg1, e.x, e.y);
        }

        if (e.y > (canvasSize - 50)) {
            clearInterval(timerId);
            ctx.font = "calc(" + canvasSize * (3 / 20) + "px) 'sniglet', 'Roboto', 'Arial', sans-serif";
            ctx.fillText("Game Over", (canvasSize * (2 / 15)), canvasSize / 2);
            ctx.drawImage(egg2, e.x, canvasSize - 100);
        }
    });
}