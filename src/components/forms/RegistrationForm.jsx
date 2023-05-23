import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Container, Form } from "react-bootstrap";
import {
  MAIL_VALIDATION,
  MINIMUM_PASSWORD_LENGTH,
  NAME,
} from "../../constants/Validation";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ValidationError from "./ValidationError";
import DisplayMessage from "../common/DisplayMessage";
import AuthContext from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { registerAPI } from "../../constants/api";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter an name")
    .matches(NAME, "Your name must only contain letters and _"),

  email: yup
    .string()
    .email()
    .matches(
      MAIL_VALIDATION,
      "The email must be a @noroff.no or @stud.noroff.no"
    )
    .required("Enter your email"),

  password: yup
    .string()
    .required("Please enter a password")
    .min(
      MINIMUM_PASSWORD_LENGTH,
      `Your password must be at least ${MINIMUM_PASSWORD_LENGTH} characters`
    ),
});

function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [registered, setRegistered] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth] = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(function () {
    if (auth) {
      navigate("/");
    }
  });

  async function onSubmit(data) {
    setSubmitted(true);
    setError(null);

    try {
      const response = await axios.post(registerAPI, data);
      console.log(response);
      if (response.data.name === data.name) {
        setRegistered(true);
      }
    } catch (error) {
      console.log("error", error);
      setError(error);
    } finally {
      setSubmitted(false);
    }
  }

  return (
    <Container>
      {registered && (
        <DisplayMessage
          messageType="success"
          message={
            <>
              {"You are now registrated, "}
              <Link to="/login">click here to login</Link>
            </>
          }
        />
      )}

      {error && (
        <DisplayMessage
          messageType="danger"
          message={error.response.data.errors[0].message}
        />
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="my-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control placeholder="name" {...register("name")} />
          {errors.name && (
            <ValidationError>{errors.name.message}</ValidationError>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>E-mail</Form.Label>
          <Form.Control placeholder="email" {...register("email")} />
          {errors.email && (
            <ValidationError>{errors.email.message}</ValidationError>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Your password</Form.Label>
          <Form.Control
            type="password"
            placeholder="your password"
            {...register("password")}
          />
          {errors.password && (
            <ValidationError>{errors.password.message}</ValidationError>
          )}
        </Form.Group>

        <Button variant="secondary" type="submit" disabled={submitted}>
          Register
        </Button>
      </Form>
    </Container>
  );
}

export default RegistrationForm;
