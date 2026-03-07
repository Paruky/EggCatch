"use strict";
let ctx;
let score = 0;
let prob = 0.96;
let basketX = 0;
let timerId = NaN;
let basket, chick, egg1, egg2, div1, div2;
let height = window.innerHeight;
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
    scoreDisplay = document.getElementById("score");
    div1 = document.getElementsByClassName("header")[0];
    div2 = document.getElementsByClassName("footer")[0];
    div1.style.height = (height - 600) / 2 + "px";
    div2.style.height = (height - 600) / 2 + "px";

    timerId = setInterval(tick, 50);
    window.onmousemove = (e) => {
        basketX = e.offsetX;
    };
};

function tick() {
    ctx.drawImage(back, 0, 0);
    ctx.drawImage(basket, basketX - 50, 500);
    if (Math.random() > prob) {
        eggs.push({x: Math.random() * 500, y: 1});
    }
    let prev = eggs.length;
    eggs = eggs.filter((e) => {
        return (
            e.y < 400 || e.y > 600 || e.x < basketX - 50 || e.x > basketX + 50
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

        if (e.y > 550) {
            clearInterval(timerId);
            ctx.font = "90px 'sniglet', 'Roboto', 'Arial', sans-serif";
            ctx.fillText("Game Over", 80, 300);
            ctx.drawImage(egg2, e.x, 500);
        }
    });
}