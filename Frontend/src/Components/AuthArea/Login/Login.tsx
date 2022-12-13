import "./Login.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import { NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Login(): JSX.Element {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<CredentialsModel>();

  async function send(credentials: CredentialsModel) {
    try {
      await authService.login(credentials);
      notifyService.success("Welcome!");
      navigate("/vacations");
    } catch (err: any) {
      notifyService.error("Incorrect user name or password");
    }
  }
  return (
    <div className="Login">
      <Container>
        <Row className="g-8 justify-content-center">
          <h5>Welcome!</h5>
          <div>
            <Form onSubmit={handleSubmit(send)}>
              <Form.Group className="mb-3" controlId="formGroupUserName">
                <Form.Label>User Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter user name"
                  {...register("userName")}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  required
                />
              </Form.Group>

              <Button variant="light" type="submit">
                Sign in
              </Button>
              <NavLink to="/register">
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Form>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
