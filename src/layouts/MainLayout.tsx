import React, { useEffect } from "react";
import { useAppDispatch } from "../store/hooks";
import { MainLayoutProps } from "../core/interface/layout.interface";
import { setEnableAuth } from "../page/Signin/store/AuthSlice";

/**
 * Main layout which will load the content with the children
 * @param children - Component
 */
const MainLayout = ({ children }: MainLayoutProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (typeof token === "string" && token.trim() !== "") {
      dispatch(setEnableAuth());
      console.log("s");
    }
  }, [dispatch]);

  return (
    <>
      {children}
      {/* {!data && <>{children}</>}
      {!data && <UnAuthorised data-testid="unautorised-fallback" />} */}
    </>
  );
};

export default React.memo(MainLayout);
