import React, { FC } from "react";
import Container from "atoms/Container";
import { Button } from "antd";
import TelegramIcon from "assets/svg/Telegram";
import { useUser } from "hooks/useUser";

interface IProps {}

export const Auth: FC<IProps> = (props) => {

  return (
    <Container className="flex items-center gap-4 flex-wrap">
      <div className="flex-1">
        <img
          className="max-h-60 md:w-full md:h-auto md:max-h-full block m-auto"
          src="/img/banner.svg"
          alt=""
          width={300}
          height={200}
        />
      </div>
      <div className="md:w-1/3 w-full">
        <div className="text-xl sm:text-2xl lg:text-3xl text-center font-semibold">
          Welcome to Money
        </div>
        <div className="h-6"></div>
        <div className="sm:text-base text-sm text-center">Continue with</div>
        <div className="h-3"></div>
        <div className="flex items-center flex-wrap justify-center">
          <a href="https://t.me/money_not_easy_bot" target="_blank">
            <TelegramIcon size={32} />
          </a>
        </div>
      </div>
    </Container>
  );
};
