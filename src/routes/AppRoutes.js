import { Routes, Route, Link } from "react-router-dom";
import Home from "../components/Home";
import TableUser from "../components/TableUser";
import Login from "../components/Login";
import PrivateRoutes from "./PrivateRoutes";

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
      </Routes>
    </>
  );
};
export default AppRoutes;
