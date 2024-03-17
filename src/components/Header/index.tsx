import React, { FC } from "react";
import BrandLogo from "assets/svg/BrandLogo";
import Container from "atoms/Container";
import { ThemeSwitch } from "components/Switch/ThemeSwitch";
import UserController from "components/UserController";

interface IProps {}

export const Header: FC<IProps> = (props) => {
  return (
    <div className="h-10 py-3 border-0 border-b border-solid border-border dark:border-border-dark">
      <Container className="h-full flex justify-between items-center">
        <BrandLogo className="h-full w-auto" />

        <div className="flex items-center space-x-6">
          <UserController />
          <ThemeSwitch />
        </div>
      </Container>
    </div>
  );
};
