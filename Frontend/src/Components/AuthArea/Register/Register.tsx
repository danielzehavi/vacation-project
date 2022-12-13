import "./Register.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notifyService from "../../../Services/NotifyService";
import { NavLink } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Register(): JSX.Element {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<UserModel>();

  async function send(user: UserModel) {
    try {
      await authService.register(user);
      notifyService.success("You have been successfully registered");
      navigate("/login");
    } catch (err: any) {
      notifyService.error(err);
      console.log(err);
    }
  }
  return (
    <div className="Register">
      <Container>
        <Row className="g-8 justify-content-center">
          <h5>Register</h5>

          <Form onSubmit={handleSubmit(send)}>
            <Form.Group className="mb-3" controlId="formGroupFirstName">
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                {...register("firstName")}
                required
                minLength={3}
                maxLength={50}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupLastName">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                {...register("lastName")}
                required
                minLength={3}
                maxLength={50}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupUserName">
              <Form.Label>User Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter user name"
                {...register("userName")}
                required
                minLength={3}
                maxLength={50}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...register("password")}
                required
                minLength={6}
                maxLength={50}
              />
            </Form.Group>

            <Button type="submit" variant="light">
              Register
            </Button>
            <NavLink to="/login">{"Already have an account? Sign in"}</NavLink>
          </Form>
        </Row>
      </Container>
    </div>
  );
}

export default Register;
