import { Button, Form, Modal } from "react-bootstrap";
import ValidationError from "./ValidationError";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { MAXIMUM_BODY_LENGTH } from "../../constants/Validation";
import axios from "axios";
import DisplayMessage from "../common/DisplayMessage";
import { API } from "../../constants/api";
import PropTypes from "prop-types";
import AuthContext from "../../context/AuthContext";

function EditPost({ post, getPost }) {
  const [auth] = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const URL = API + "posts/" + post.id;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: post.title ?? "",
      body: post.body ?? "",
      media: post.media ?? "",
    },
  });

  async function submitForm(data) {
    setSubmitted(true);
    setError(null);

    try {
      await axios.put(URL, data, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      getPost();
      setShow(false);
    } catch (error) {
      console.log("error", error);
      setError(error.toString());
    } finally {
      setSubmitted(false);
    }
  }

  if (error) {
    return <DisplayMessage messageType="danger" message={error} />;
  }
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit post
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(submitForm)}>
            <fieldset disabled={submitted}>
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
              <Button variant="secondary" onClick={handleClose} className="m-2">
                Close
              </Button>
              <Button variant="primary" type="submit" className="m-2">
                Save Changes
              </Button>
            </fieldset>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditPost;

EditPost.propTypes = {
  getPost: PropTypes.func,
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    media: PropTypes.string,
    id: PropTypes.number,
  }),
};
