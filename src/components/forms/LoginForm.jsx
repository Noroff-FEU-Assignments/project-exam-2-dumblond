import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginAPI } from "../../constants/api";
import { Button, Container, Form, FormLabel } from "react-bootstrap";
import DisplayMessage from "../common/DisplayMessage";
import ValidationError from "./ValidationError";

const schema = yup.object().shape({
  email: yup
    .string()
    .email()
    .matches(
      /@(stud\.)?noroff.no/,
      "The email must be a @noroff.no or @stud.noroff.no "
    )
    .required("Enter your email"),
  password: yup.string().required("Enter your password"),
});

function LoginForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(function () {
    if (auth) {
      navigate("/");
    }
  });

  async function onSubmit(data) {
    setSubmitted(true);
    setLoginError(null);

    try {
      const response = await axios.post(loginAPI, data);
      setAuth(response.data);
      navigate("/me");
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitted(false);
    }
  }

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          {loginError && (
            <DisplayMessage
              messageType="danger"
              message="Your login information are wrong"
            />
          )}

          <fieldset disabled={submitted}>
            <Form.Group className="my-3" controlId="email">
              <FormLabel>Email</FormLabel>
              <Form.Control placeholder="email" {...register("email")} />
              {errors.email && (
                <ValidationError>{errors.email.message}</ValidationError>
              )}
            </Form.Group>
            <Form.Group className="my-3" controlId="password">
              <FormLabel>Password</FormLabel>
              <Form.Control
                type="password"
                placeholder="password"
                {...register("password")}
              />
              {errors.password && (
                <ValidationError>{errors.password.message}</ValidationError>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              {submitted ? "You are login in" : "Login"}
            </Button>
          </fieldset>
        </Form>
      </Container>
    </>
  );
}

export default LoginForm;
