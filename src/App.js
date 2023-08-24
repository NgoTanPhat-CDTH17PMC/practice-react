import logo from "./logo.svg";
import "./App.scss";
import Header from "./components/Header";
import TableUser from "./components/TableUser";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ModalAddNew from "./components/ModalAddNew";
import { useState } from "react";

function App() {
  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const handleClose = () => {
    setIsShowModalAddNew(false);
  };
  return (
    <div className="App">
      <Header />
      <Container>
        <div className="my-3 add-new d-flex justify-content-between">
          <span>List User:</span>
          <Button variant="success" onClick={() => setIsShowModalAddNew(true)}>
            Add new user
          </Button>
        </div>
        <TableUser />
      </Container>

      <ModalAddNew show={isShowModalAddNew} handleClose={handleClose} />
    </div>
  );
}

export default App;
