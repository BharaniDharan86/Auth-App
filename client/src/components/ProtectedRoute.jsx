/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

function ProtectedRoute() {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      return navigate("/sign-up", { replace: true });
    }
  }, [user]);

  return <Outlet />;
}

export default ProtectedRoute;
