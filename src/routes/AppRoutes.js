import { Routes, Route, Link } from "react-router-dom";
import Home from "../components/Home";
import TableUser from "../components/TableUser";
import Login from "../components/Login";
import PrivateRoutes from "./PrivateRoutes";
import NotFound from "../components/NotFound";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <PrivateRoutes>
              <TableUser />
            </PrivateRoutes>
          }
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
};
export default AppRoutes;
