import React, { FC } from "react";
import Container from "atoms/Container";
import useNotification from "antd/es/notification/useNotification";
import TelegramIcon from "assets/svg/Telegram";
import TelegramLoginButton, { TelegramUser } from "telegram-login-button";
import httpService from "services/http";
import { useUser } from "hooks/useUser";
import { useNavigate } from "react-router-dom";

interface IProps {}

const BOT_NAME = import.meta.env.VITE_TELE_BOTNAME || "moneytizerrrr_bot";
export const Auth: FC<IProps> = (props) => {

  const { mutate } = useUser();
  const navigate = useNavigate();

  const [api] = useNotification();

  const onTeleCallback = async (user: TelegramUser) => {
    try {
      await httpService.post("/oauth/tele", user);
      api.success({
        message: "Logged in",
      })
      await mutate();
      navigate("/");
    } catch (error) {
      api.error({
        message: "Fail to login via Telegram, try another method"
      });
    }
  }

  return (
    <Container className="flex items-center gap-4 flex-wrap">
      <div className="flex-1">
        <img
          className="max-h-48 md:w-full md:h-auto md:max-h-full block m-auto"
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

        <div className="h-3"></div>

        <TelegramLoginButton
          botName={BOT_NAME}
          // dataAuthUrl={teleOauthCallbackURL}
          className="w-fit m-auto"
          dataOnauth={onTeleCallback}
        />
      </div>
    </Container>
  );
};
