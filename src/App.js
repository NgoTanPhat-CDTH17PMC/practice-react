import logo from "./logo.svg";
import "./App.scss";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";

import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const { user, loginContext } = useContext(UserContext);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      loginContext(
        localStorage.getItem("email"),
        localStorage.getItem("token")
      );
    }
  }, []);
  return (
    <>
      {/* <Header />
      <Container>
        <Home />
      </Container> */}
      <Header />
      <Container>
        <AppRoutes />
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
