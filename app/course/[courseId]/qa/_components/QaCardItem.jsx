import React from "react";

function QaCardItem({ qa }) {
  return (
    <div className="mt-5 md:mt-14 p-5">
      <h2 className="font-medium text-2xl md:text-3xl">{qa?.question}</h2>
      <div className="mt-5 text-lg md:text-xl">{qa?.answer}</div>
    </div>
  );
}

export default QaCardItem;
