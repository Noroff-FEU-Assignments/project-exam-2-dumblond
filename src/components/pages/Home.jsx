import { Accordion, Container } from "react-bootstrap";
import Header from "../common/Header";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Container>
        <Header title="Welcome" />
        <h2 className="p-2">
          This is Noroff social media page. Here you can get to know other
          students and discuss.
        </h2>
        <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>I have an account</Accordion.Header>
            <Accordion.Body>
              Welcome back! Go to the login sight here{" "}
              <Link to="/login">Login here</Link>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Do not have an account</Accordion.Header>
            <Accordion.Body>
              Welcome to nb SOME. You need to register to see the sight. Go to
              the register sight here <Link to="/register">Register here</Link>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  );
}

export default Home;
