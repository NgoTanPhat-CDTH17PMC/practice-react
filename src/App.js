import logo from "./logo.svg";
import "./App.scss";
import Header from "./components/Header";
import TableUser from "./components/TableUser";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <TableUser />
      </Container>
    </div>
  );
}

export default App;
