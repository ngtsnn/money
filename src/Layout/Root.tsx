import { Header } from "components/Header";
import { FC, PropsWithChildren } from "react";
import { Outlet } from "react-router-dom";

const RootContainer: FC = () => {
  return (
    <>
      <Header />
      <div className="h-8 sm:h-10 md:h-12 lg:h-14"></div>
      <Outlet/>
    </>
  );
};

export default RootContainer;
