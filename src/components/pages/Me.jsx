import { Container } from "react-bootstrap";
import Header from "../common/Header";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Me() {
  const [auth] = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  });

  return (
    <>
      <Container>
        <Header title="My profile" />
      </Container>
    </>
  );
}

export default Me;
