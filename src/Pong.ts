import p5 from "p5";
import { WIDTH, HEIGHT } from "./main";
import Paddle from "./Paddle";
import { TCoords } from "./types";

export default class Pong {
  coords: TCoords;
  size: number = 20;
  xdir: -1 | 1 = 1;
  ydir: number = 0.1;
  speed = 5;
  constructor() {
    this.coords = { x: WIDTH / 2, y: this.#randomRange(20, HEIGHT - 20) };
  }

  #randomRange(min: number, max: number) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  move() {
    this.wallCollide();
    this.coords.x += this.xdir * this.speed;
    this.coords.y += this.ydir * 2;
  }

  wallCollide() {
    if (
      !(
        this.coords.y - this.size / 2 > 0 &&
        this.coords.y + this.size / 2 < HEIGHT
      )
    )
      this.ydir = -this.ydir;
  }

  collide(pad: Paddle): [boolean, Paddle] {
    const r1 = {
      x: pad.coords.x - pad.size.w / 2,
      y: pad.coords.y - pad.size.h / 2,
    };
    const r2 = {
      x: this.coords.x - this.size / 2,
      y: this.coords.y - this.size / 2,
    };

    return [
      r1.x + pad.size.w >= r2.x &&
        r1.x <= r2.x + this.size &&
        r1.y + pad.size.h >= r2.y &&
        r1.y <= r2.y + this.size,
      pad,
    ];
  }

  draw($: p5) {
    $.push();
    $.rectMode($.CENTER);
    $.rect(this.coords.x, this.coords.y, this.size, this.size);
    $.pop();
  }
}
