import { FC, StrictMode, Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import RootContainer from "Layout/Root";
import ProtectedRoute from "Layout/Protected";
import useNotification from "antd/es/notification/useNotification";

const Home = lazy(() => import("pages/Home"));
const AuthPage = lazy(() => import("pages/Auth/"));
const MagicAuth = lazy(() => import("pages/Auth/Magic"));

const Router: FC = () => {

  const [, contextHolder] = useNotification();

  return (
    <Suspense fallback={<></>}>
      {contextHolder}
      <Routes>
        <Route path="/" element={<RootContainer />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<AuthPage />} />
          <Route
            element={
              <StrictMode>
                <ProtectedRoute />
              </StrictMode>
            }
          >
            <Route path="/me" element={<Home />} />
            <Route path="/budgets" element={<Home />} />
            <Route path="/expense" element={<Home />} />
          </Route>
        </Route>
        <Route path="/auth/magic" element={<MagicAuth />} />
        <Route path="*" element={"404"} />
      </Routes>
    </Suspense>
  );
};

export default Router;
