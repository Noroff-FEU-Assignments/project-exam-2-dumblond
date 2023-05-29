import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ValidationError from "./ValidationError";
import axios from "axios";
import { profileAPI } from "../../constants/api";
import AuthContext from "../../context/AuthContext";

import PropTypes from "prop-types";

const schema = yup.object().shape({
  avatar: yup.string().url(),
  banner: yup.string().url(),
});

function EditProfile({ profile, getProfile }) {
  const [auth] = useContext(AuthContext);
  const [submitted, setSubmitted] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [show, setShow] = useState(false);
  const URL = profileAPI + "/" + auth.name + "/media";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      avatar: profile.avatar ?? "",
      banner: profile.banner ?? "",
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
      getProfile();
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

export default EditProfile;

EditProfile.propTypes = {
  getProfile: PropTypes.func,
};
