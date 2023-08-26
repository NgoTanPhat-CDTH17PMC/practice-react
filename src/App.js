import logo from "./logo.svg";
import "./App.scss";
import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import Home from "./components/Home";
import { Routes, Route, Link } from "react-router-dom";
import TableUser from "./components/TableUser";
function App() {
  return (
    <>
      {/* <Header />
      <Container>
        <Home />
      </Container> */}
      <Header />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<TableUser />} />
        </Routes>
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
