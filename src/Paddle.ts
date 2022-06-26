import p5 from "p5";
import { WIDTH, HEIGHT } from "./main.js";
import { TCoords } from "./types";

type TSide = "LEFT" | "RIGHT";

export default class Paddle {
  side: TSide;
  coords: TCoords;
  size = { w: 10, h: 28 * 2 };
  score: number = 0;
  speed = 7;

  constructor(side: TSide) {
    this.side = side;
    this.coords = { x: this.side == "LEFT" ? 20 : WIDTH - 20, y: HEIGHT / 2 };
  }

  draw($: p5) {
    $.push();
    $.fill(255);
    $.rectMode($.CENTER);
    $.rect(this.coords.x, this.coords.y, this.size.w, this.size.h);
    $.pop();
  }

  scored() {
    this.score++;
  }

  move(dir: "UP" | "DOWN" = "UP") {
    if (this.coords.y - this.size.h / 2 > 0 && dir === "UP") {
      this.coords.y -= this.speed;
    }

    if (this.coords.y + this.size.h / 2 < HEIGHT && dir === "DOWN") {
      this.coords.y += this.speed;
    }
  }
}
