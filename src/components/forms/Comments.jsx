import { Form } from "react-bootstrap";
import * as yup from "yup";
import { API } from "../../constants/api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import ValidationError from "./ValidationError";
import DisplayMessage from "../common/DisplayMessage";
import { MAXIMUM_BODY_LENGTH } from "../../constants/validation";
import PropTypes from "prop-types";

const schema = yup.object().shape({
  body: yup
    .string()
    .required()
    .max(
      MAXIMUM_BODY_LENGTH,
      `Your body can be ${MAXIMUM_BODY_LENGTH} characters`
    ),
});

function Comments({ id, refreshPosts }) {
  const [submitted, setSubmitted] = useState(false);
  const [postError, setPostError] = useState(null);
  const URL = API + "posts/" + id + "/comment";

  const {
    register,
    handleSubmit,
    reset,
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
      refreshPosts();
      reset();
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
    <Form onSubmit={handleSubmit(submitForm)}>
      <Form.Control
        className="my-3"
        type="text"
        placeholder="Make a comment to the post"
        {...register("body")}
      />
      {errors.body && <ValidationError>{errors.body.message}</ValidationError>}
      {submitted}
    </Form>
  );
}

export default Comments;

Comments.propTypes = {
  id: PropTypes.number,
  refreshPosts: PropTypes.func,
};
