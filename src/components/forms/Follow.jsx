import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import PropTypes from "prop-types";

function Follow({ profile }) {
  const [auth] = useContext(AuthContext);

  const following = profile.followers.find((user) => {
    return user.name === auth.name;
  });

  if (!following) {
    return <div>Hei Verden</div>;
  }

  if (following) {
    return <div>hadet på badet!</div>;
  }

  console.log(following);
  console.log(profile);
  return <div>Follow</div>;
}

export default Follow;

Follow.propTypes = {
  profile: PropTypes.func,
};
