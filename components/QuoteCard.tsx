import React from "react";
import { ServerSideAssets } from "../Types";
import createTransformer from "tailwind-group-variant";
const expandVariant = createTransformer();

function QuoteCard({ quote: { quote, author } }: ServerSideAssets) {
  return (
    <div
      className={expandVariant(
        "w-screen text-white  py-4 flex flex-row justify-center"
      )}
    >
      <div className="w-10/12 px-4">
        <p className="text-xl text-start">{quote}</p>
        <p className="text-end pt-2">-{author}</p>
      </div>
    </div>
  );
}

export default QuoteCard;
