import { Breadcrumb, Button, Container, Form } from "react-bootstrap";
import ValidationError from "./ValidationError";
import { useContext, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { API } from "../../constants/api";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import PropTypes from "prop-types";
import Header from "../common/Header";
import { MAXIMUM_BODY_LENGTH } from "../../constants/Validation";
import { useNavigate } from "react-router-dom";
import DisplayMessage from "../common/DisplayMessage";

const schema = yup.object().shape({
  title: yup
    .string()
    .required()
    .max(
      MAXIMUM_BODY_LENGTH,
      `Your title can be ${MAXIMUM_BODY_LENGTH} characters`
    ),
  body: yup
    .string()
    .required()
    .max(
      MAXIMUM_BODY_LENGTH,
      `Your body can be ${MAXIMUM_BODY_LENGTH} characters`
    ),
  media: yup.string().url(),
});

function MakePost() {
  const [submitted, setSubmitted] = useState(false);
  const [postError, setPostError] = useState(null);
  const URL = API + "posts";

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [auth] = useContext(AuthContext);

  async function submitForm(data) {
    setSubmitted(true);
    setPostError(null);

    try {
      await axios.post(URL, data, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      navigate("/posts");
    } catch (error) {
      console.log("error", error);
      setPostError(error.toString());
    } finally {
      setSubmitted(false);
    }
  }

  if (postError) {
    return <DisplayMessage message={postError} messageType="danger" />;
  }

  return (
    <>
      <Container>
        <Breadcrumb className="pt-3">
          <Breadcrumb.Item href="/posts">Latest Posts</Breadcrumb.Item>
          <Breadcrumb.Item active>Make a post</Breadcrumb.Item>
        </Breadcrumb>
        <Header title="Make a post" />

        <Form onSubmit={handleSubmit(submitForm)}>
          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              {...register("title")}
            />
            {errors.title && (
              <ValidationError>{errors.title.message}</ValidationError>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="body">
            <Form.Label>Body</Form.Label>
            <Form.Control
              type="text"
              as="textarea"
              rows={8}
              placeholder="Body (max 280 characters)"
              {...register("body")}
            />
            {errors.body && (
              <ValidationError>{errors.body.message}</ValidationError>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="media">
            <Form.Label>Media url</Form.Label>
            <Form.Control
              type="text"
              placeholder="https://..."
              {...register("media")}
            />
            {errors.media && (
              <ValidationError>{errors.media.message}</ValidationError>
            )}
          </Form.Group>
          <Button variant="primary" type="submit" className="m-2">
            {submitted ? "You are creating a post" : "Create the post"}
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default MakePost;

MakePost.propTypes = {
  getPostId: PropTypes.func,
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    media: PropTypes.string,
  }),
};
