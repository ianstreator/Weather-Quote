import React, { useEffect } from "react";
import { Hourly } from "../Types";
import Image from "next/image";

function RainGraph({ hourly }: { hourly: Hourly[] }) {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const width = (canvas.width = 400);
    const height = (canvas.height = 200);
    const originY = height;

    const nextDayIndex = hourly.findIndex(({ dt }, i) => {
      const t = new Date(dt * 1000);
      if (t.getHours() === 0) {
        return i;
      }
    });

    const graphHour = width / 24;
    let graphTime = 0;
    ctx.lineWidth = 5;
    ctx.font = "35px Gill Sans";
    ctx.textAlign = "center";

    hourly.forEach(({ pop, dt }, i) => {
      const popScaled = pop * 200;
      if (i > 24) return;
      ctx.fillStyle = "hsla(200,100%,75%,0.5)";
      ctx.strokeStyle = "hsl(200,100%,75%)";

      if (i > nextDayIndex!) {
        ctx.strokeStyle = "hsla(0,100%,100%,0)";
        ctx.fillStyle = "hsla(200,100%,75%,0.25)";
      }
      ctx.fillRect(graphTime, originY - popScaled, graphHour, popScaled);
      ctx.lineWidth = 2.5;

      ctx.strokeRect(graphTime, originY - popScaled, graphHour, popScaled);
      graphTime += graphHour;
    });
    ctx.lineWidth = 5;
    ctx.strokeStyle = "hsl(0,0%,100%)";
    ctx.strokeRect(0, 0, width, height);
    ctx.fill();
  }, [hourly]);

  return (
    <div className="w-10/12 mx-auto my-2">
      <h1 className="w-full text-xs text-start font-bold flex items-center bg-black/25 justify-between p-1 rounded-sm">
        24hr chance of
        <Image src={"/rain-drop.svg"} alt="rain" width={15} height={15}></Image>
        <Image
          src={"/snow-flake.svg"}
          alt="snow"
          width={15}
          height={15}
        ></Image>
      </h1>
      <canvas id="canvas" className="w-full"></canvas>
    </div>
  );
}

export default RainGraph;
