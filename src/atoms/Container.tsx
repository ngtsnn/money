import React, { FC, HTMLAttributes } from "react";
import clsx from "clsx";

type Props = HTMLAttributes<HTMLDivElement>;

const Container: FC<Props> = ({ className, children, ...rest }) => {
  return <div className={clsx("max-w-screen-2xl px-4 m-auto", className)} {...rest}>{children}</div>;
};

export default Container;
