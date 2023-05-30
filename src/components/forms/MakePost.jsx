import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { API } from "../../constants/api";
import { Button, Form, Modal } from "react-bootstrap";
import ValidationError from "./ValidationError";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

const schema = yup.object().shape({
  title: yup.string().required(),
  body: yup.string().required(),
  tags: yup.string(),
  media: yup.string().url(),
});

function MakePost({ postId, getPostId }) {
  const [auth] = useContext(AuthContext);
  const [submitted, setSubmitted] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [show, setShow] = useState(false);
  const URL = API + "/posts";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: postId.title ?? "",
      body: postId.body ?? "",
      tags: postId.tags ?? "",
      media: postId.media ?? "",
    },
  });

  async function submitForm(data) {
    setSubmitted(true);
    setLoginError(null);

    try {
      const response = await axios.put(URL, data, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      getPostId();
      setShow(false);
    } catch (error) {
      console.log("error", error);
      setLoginError(error.toString());
    } finally {
      setSubmitted(false);
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit profile
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Form.Group className="mb-3" controlId="avatar">
              <Form.Label>Avatar url</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://..."
                {...register("avatar")}
              />
              {errors.avatar && (
                <ValidationError>{errors.avatar.message}</ValidationError>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="banner">
              <Form.Label>Banner url</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://..."
                {...register("banner")}
              />
              {errors.banner && (
                <ValidationError>{errors.banner.message}</ValidationError>
              )}
            </Form.Group>
            <Button variant="secondary" onClick={handleClose} className="m-2">
              Close
            </Button>
            <Button variant="primary" type="submit" className="m-2">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default MakePost;
