import React from "react";
import { ServerSideAssets } from "../Types";
import createTransformer from "tailwind-group-variant";
const expandVariant = createTransformer();

function QuoteCard({ quote }: ServerSideAssets) {
  return (
    <div
      className={expandVariant(
        "w-screen text-white  py-4 flex flex-row justify-center bg-gradient-to-b from-zinc-900"
      )}
    >
      <div className="w-10/12 px-4">
        <p className="text-xl text-start">{quote.quote}</p>
        <p className="text-end pt-2">-{quote.author}</p>
      </div>
    </div>
  );
}

export default QuoteCard;
