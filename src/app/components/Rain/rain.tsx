import { request } from "http";
import { useEffect, useRef } from "react";

interface Drop {
  char: string;
  x: number;
  y: number;
  s: number;
  velocity: number;
}

const Rain = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  let drops: Drop[] = [];
  let ctx = null;

  const rain = (ctx: any) => {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    const redpillEmojis = [
      "💊",
      "🕳️",
      "🔄",
      "🚪",
      "🧠",
      "🕵️‍♂️",
      "👁️‍🗨️",
      "🤔",
      "🔍",
      "🤯",
      "🍷",
      "🗿",
    ];

    if (drops.length < 100) {
      drops.push({
        char: redpillEmojis[Math.floor(Math.random() * redpillEmojis.length)],
        x: Math.random() * w,
        y: 0,
        s: Math.random() * 1 + 0.2,
        velocity: Math.random() * 8 + 2,
      });
    }

    ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
    ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < drops.length; i++) {
      ctx.fillStyle = "#00FF41";

      ctx.font = `${drops[i].s}em Arial`;
      ctx.fillText(drops[i].char, drops[i].x, drops[i].y);
      drops[i].y += 0.3 * drops[i].velocity;

      if (drops[i].y > h) {
        drops.splice(i, 1);
      }
    }

    requestAnimationFrame(() => rain(ctx));
  };

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;

    c.width = window.innerWidth;
    c.height = window.innerHeight;

    ctx = c.getContext("2d");
    if (!ctx) return;

    ctx.filter = "blur(1px)";

    document.onmousemove = (e) => {
      // move drops away from the mouse, a little, if they are close, on the opposite vector
      for (let i = 0; i < drops.length; i++) {
        if (
          Math.abs(drops[i].x - e.clientX) < 150 &&
          Math.abs(drops[i].y - e.clientY) < 150
        ) {
          drops[i].x += Math.sign(drops[i].x - e.clientX) * 2;
          drops[i].y += Math.sign(drops[i].y - e.clientY) * 2;
        }
      }
    };

    rain(ctx);
  }, []);

  return (
    <canvas className="w-screen h-screen absolute z-[-1]" ref={canvas}></canvas>
  );
};

export default Rain;
