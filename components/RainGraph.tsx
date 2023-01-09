import React, { useEffect } from "react";
import { Weather } from "../Types";
import useTime from "../hooks/useTime";
import useInches from "../hooks/useInches";

function RainGraph({ data: { hourly } }: { data: Weather }) {
  if (!hourly) return null;

  const first = hourly[0].dt;
  const last = hourly[23].dt;

  const { timeString: firstHour, timeAbbr: firstAbbr } = useTime(first);
  const { timeString: lastHour, timeAbbr: lastAbbr } = useTime(last);
  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const ctx = canvas.getContext("2d");

    const width = (canvas.width = 400);
    const origin = (canvas.height = 200);

    const graphHour = width / 47;
    let graphTime = 0;

    ctx?.beginPath();
    ctx!.strokeStyle = "hsl(200,100%,75%)";
    ctx!.lineWidth = 2.5;
    ctx!.font = "35px Arial";
    ctx!.textAlign = "center";
    ctx?.moveTo(0, origin);
    hourly?.forEach((hour, i) => {
      ctx?.lineTo(graphTime, origin - hour.pop * 50);
      if (i === hourly.length - 1) return;
      if (i === 55 || i === 5) {
        ctx!.fillStyle = "white";
        ctx?.fillText(`${hour.pop}%`, graphTime, origin - hour.pop * 50 - 10);
      }

      graphTime += graphHour;
    });
    ctx?.lineTo(graphTime, origin);
    ctx?.closePath();
    ctx!.fillStyle = "hsla(200,100%,75%,0.25)";
    ctx?.fill();
    ctx?.stroke();
  }, [hourly]);

  return (
    <div className="w-10/12 mx-auto my-2">
      <h1 className="text-sm text-start font-bold">Precipitation(%)</h1>
      {/* <div className="w-full flex justify-between">
        <p className="text-xs  text-start">{firstHour + " " + firstAbbr}</p>
        <p className="text-xs  text-start">{lastHour + " " + lastAbbr}</p>
      </div> */}
      <div className="canvas-container bg-gradient-to-tr from-cyan-900/10 to-cyan-900/30">
        <canvas id="canvas" className="w-full"></canvas>
      </div>
    </div>
  );
}

export default RainGraph;
