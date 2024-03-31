import { request } from "http";
import { useEffect, useRef } from "react";

interface Drop {
  char: string;
  x: number;
  y: number;
  s: number;
}

const Rain = () => {
  const canvas = useRef<HTMLCanvasElement>(null);
  let drops: Drop[] = [];
  let ctx: CanvasRenderingContext2D | null = null;
  let deltaTime = 0;

  const rain = (ctx: CanvasRenderingContext2D | null) => {
    if (ctx === null) return;
    const now = Date.now();
    const deltaTime = (now - (rain as any).then) / 1000;
    (rain as any).then = now;

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
      "🔮",
      "🎭",
      "💀",
      "👻",
      "👽",
      "💩",
      "🧻",
      "🧨",
      "🚬",
      "🪦",
    ];

    const pastHalf =
      drops.filter((drop) => drop.y > h / 2).length > 0.2 * drops.length;
    if (
      drops.length < Math.round(w * 0.035) ||
      (pastHalf && drops.length < Math.round(w * 0.04))
    ) {
      drops.push({
        char: redpillEmojis[Math.floor(Math.random() * redpillEmojis.length)],
        x: Math.random() * w,
        y: 0,
        s: Math.random() * 40 + 10,
      });
    }

    ctx.fillStyle = "rgba(0, 0, 0, 1.0)";
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < drops.length; i++) {
      ctx.font = `${drops[i].s / 20}em Arial`;
      ctx.fillText(drops[i].char, drops[i].x, drops[i].y);
      drops[i].y += drops[i].s * deltaTime * 2;
      if (drops[i].y > h + 20) {
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
    if (ctx === null) return;

    ctx.filter = "blur(1px)";

    document.onmousemove = (e) => {
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

    requestAnimationFrame(() => rain(ctx));
  }, []);

  return (
    <canvas className="w-screen h-screen absolute z-[-1]" ref={canvas}></canvas>
  );
};

export default Rain;
