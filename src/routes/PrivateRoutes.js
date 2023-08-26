import { useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { Alert } from "react-bootstrap";

const PrivateRoutes = (props) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };
  if (user && !user.auth) {
    return (
      <>
        <Alert variant="danger">
          <Alert.Heading>You got an error!</Alert.Heading>
          <p>
            Please{" "}
            <span
              onClick={() => handleLogin()}
              style={{
                textDecoration: "underline",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              login
            </span>{" "}
            to see this content!
          </p>
        </Alert>
      </>
    );
  }
  return <>{props.children}</>;
};

export default PrivateRoutes;
