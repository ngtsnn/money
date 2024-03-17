import React, { FC, memo, useEffect, useState } from "react";
import { Loading } from "assets/svg/Loading";
import { useNavigate, useSearchParams } from "react-router-dom";
import httpService from "services/http";

interface IProps {}

const MagicAuth: FC<IProps> = memo(() => {
  const [query] = useSearchParams();
  const navigate = useNavigate();
  const token = query.get("token");
  const redirect = query.get("redirect") ?? "/";

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return () => {};
    }
    const aborter = new AbortController();

    httpService
      .post<boolean>(
        "/auth/magic",
        { token },
        {
          signal: aborter.signal,
        }
      )
      .then((isAuth) => {
        navigate(isAuth ? redirect : "/login");
      })
      .catch((e) => {
        httpService
          .get("/auth/refresh")
          .then((isVerified) => {
            navigate(isVerified ? redirect : "/login");
          })
          .catch(() => navigate("/login"));
      });

    return () => {
      aborter.abort("Rerender");
    };
  }, []);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Loading size={200} className="text-txt-highlight dark:text-txt-highlight-dark" />
    </div>
  );
});

export default MagicAuth;
