import clsx from "clsx";
import React, { FC, HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  username: string;
  userId: number;
}
const bg = [
  "#C51D34",
  "#25221B",
  "#287233",
  "#8B8C7A",
  "#3B3C36",
  "#E1CC4F",
  "#015D52",
  "#4E5754",
  "#A65E2E",
  "#343E40",
  "#F75E25",
  "#641C34",
  "#F3A505",
  "#1D334A",
  "#826C34",
  "#102C54",
  "#5E2129",
  "#E5BE01",
  "#D36E70",
  "#F44611",
  "#CF3476",
  "#3B83BD",
  "#7f0ac8",
  "#1b12ce",
  "#12cbce",
];

const UsernameAvatar: FC<Props> = ({ username, userId, className }) => {
  const splitted = username.trim().split(" ");
  const shortenName =
    splitted
      .slice(0, 2)
      .map((n) => n[0])
      .join("") ?? "Us";
  const randomColor = bg[userId % bg.length];

  return (
    <div
      className={clsx("w-full h-full flex items-center justify-center text-white", className)}
      style={{ background: randomColor }}
    >
      {shortenName}
    </div>
  );
};

export default UsernameAvatar;
