import p5 from "p5";
import Paddle from "./Paddle.js";
import Pong from "./Pong.js";

export const WIDTH = 858;
export const HEIGHT = 525;

const keys = {
  ArrowUp: 38,
  ArrowDown: 40,
  s: 83,
  x: 88,
};

const sketch = ($: p5) => {
  const paddles = [new Paddle("LEFT"), new Paddle("RIGHT")] as const;
  let pong = new Pong();
  let dir: -1 | 1 = 1;
  $.setup = () => {
    const canvas = $.createCanvas(WIDTH, HEIGHT);
    canvas.parent("app");
  };

  $.draw = () => {
    $.noStroke();
    $.background(0);
    $.push();
    $.textSize(25);
    $.textAlign($.CENTER);
    $.fill(255);
    $.text(paddles[0].score, WIDTH / 4, 20);
    $.text(paddles[1].score, (WIDTH * 3) / 4, 20);
    $.pop();

    $.push();
    $.stroke(255);
    $.line(WIDTH / 2, 0, WIDTH / 2, HEIGHT);
    $.pop();

    pong.move();
    pong.draw($);

    let x: [boolean, Paddle | null] = [false, null];
    if (pong.coords.x > WIDTH / 2) x = pong.collide(paddles[1]);
    else x = pong.collide(paddles[0]);
    if (x[0] && x[1]) {
      pong.xdir = -pong.xdir as typeof pong.xdir;
      pong.ydir = $.map(
        pong.coords.y - x[1].coords.y,
        -HEIGHT,
        HEIGHT,
        -30,
        30
      );
    }

    if ($.keyIsDown(keys["s"])) {
      paddles[0].move("UP");
    } else if ($.keyIsDown(keys["x"])) {
      paddles[0].move("DOWN");
    }

    if ($.keyIsDown(keys["ArrowUp"])) {
      paddles[1].move("UP");
    } else if ($.keyIsDown(keys["ArrowDown"])) {
      paddles[1].move("DOWN");
    }

    paddles.forEach((p) => {
      p.draw($);
    });

    let y = false;
    if (
      (y = pong.coords.x - pong.size / 2 > WIDTH) ||
      pong.coords.x + pong.size / 2 < 0
    ) {
      paddles[y ? 0 : 1].scored();
      dir = -dir as typeof dir;
      pong = new Pong();
      pong.xdir = dir;
    }
  };
};

new p5(sketch);
