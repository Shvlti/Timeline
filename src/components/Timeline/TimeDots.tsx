import React from "react";

interface Props {
  className?: string;
}

export const TimeDots: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <button>1</button>
      <span>Наука</span>
    </div>
  );
};
