import { getUser } from "./services/authorize";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ element: Element, ...rest }) => {
  return getUser() ? <Element {...rest} /> : <Navigate to="/login" replace />;
};

export default AdminRoute;
