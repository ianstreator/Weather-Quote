import React, { useEffect } from "react";
import useTime from "../hooks/useTime";
import { Weather } from "../Types";

function RainGraph({ data: { hourly } }: { data: Weather }) {
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const width = (canvas.width = 400);
    const height = (canvas.height = 200);
    const originY = height;

    const nextDayIndex = hourly.findIndex(({ dt }, i) => {
      const { hour, timeAbbr } = useTime(dt);
      if (timeAbbr === "AM" && hour === 12) {
        return i;
      }
    });
    const graphHour = width / 24;
    let graphTime = 0;
    ctx.lineWidth = 5;
    ctx.font = "35px Gill Sans";
    ctx.textAlign = "center";

    hourly?.forEach(({ pop, dt }, i) => {
      const popScaled = pop * 200;
      if (i > 24) return;
      ctx.fillStyle = "hsla(200,100%,75%,0.5)";
      ctx.strokeStyle = "hsl(200,100%,75%)";

      if (i > nextDayIndex) {
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
      <h1 className="text-xs text-start font-bold">
        <span>24/Hr</span> Chance of rain
      </h1>
      <canvas id="canvas" className="w-full"></canvas>
    </div>
  );
}

export default RainGraph;
