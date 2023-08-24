import logo from "./logo.svg";
import "./App.scss";
import Header from "./components/Header";
import TableUser from "./components/TableUser";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <>
      <Header />
      <Container>
        <TableUser />
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
