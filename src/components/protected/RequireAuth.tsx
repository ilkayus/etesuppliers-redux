import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "hooks/useAuth";

export interface Props {
  allowedRoles: Set<string>;
}

const RequireAuth = ({ allowedRoles }: Props) => {
  const { auth } = useAuth();
  const location = useLocation();

  return auth ? (
    allowedRoles.has(auth.role) ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorized" state={{ from: location }} replace />
    )
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
