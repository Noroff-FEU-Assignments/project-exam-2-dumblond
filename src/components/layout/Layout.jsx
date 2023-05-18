import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navigation from "./Navigation";

function Layout() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
