import React from "react";
import { ServerSideAssets } from "../Types";

function QuoteCard({ quote }: ServerSideAssets) {
  return (
    <div className="w-screen max-h-72 text-white py-4 flex flex-row justify-center bg-gradient-to-b from-zinc-900 md:w-max md:m-0 md:ml-6 md:h-fit md:bg-gradient-to-tl md:from-zinc-800/50 md:to-zinc-800 ">
      <div className="w-10/12 max-w-xs px-4">
        <p className="text-md text-start">{quote.quote}</p>
        <p className="text-end pt-2">-{quote.author}</p>
      </div>
    </div>
  );
}

export default QuoteCard;
