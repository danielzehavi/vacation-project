import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { NavLink } from "react-router-dom";

function Header(): JSX.Element {
  return (
    <div className="Header">
      <Container>
        <Row className="g-8 justify-content-center">
          <Col sm={12}>
            <NavLink className="default-link" to="/vacations">
              <h2>Vinder</h2>
            </NavLink>
          </Col>
          <Col sm={4}>
            <AuthMenu />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Header;
