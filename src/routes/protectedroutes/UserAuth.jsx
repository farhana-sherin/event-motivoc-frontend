import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../component/AuthHook";
import { Outlet, useNavigate } from "react-router-dom";

const UserAuth = () => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>; // spinner while checking token
  }

  return isAuthenticated ? <Outlet /> : null;
};

export default UserAuth;
