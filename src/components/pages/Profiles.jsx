import { useContext, useEffect } from "react";
import Header from "../common/Header";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { useState } from "react";
import { profileAPI } from "../../constants/api";
import Loading from "../common/Loading";
import DisplayMessage from "../common/DisplayMessage";
import { Container, Row } from "react-bootstrap";
import Profile from "../posts/Profile";

function Profiles() {
  const [auth] = useContext(AuthContext);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    const URL = profileAPI;
    async function fetchData() {
      try {
        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });

        if (response.status === 200) {
          setProfiles(response.data);
        } else {
          setError("Something is wrong");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return <Loading animation="border" />;
  }

  if (error) {
    return <DisplayMessage messageType="danger" message="Something is wrong" />;
  }

  return (
    <>
      <Container>
        <Header title="Profiles" />
        <Row xs={1} className="g-4">
          {profiles.map(function (profile) {
            return (
              <Profile
                key={profile.name}
                profile={profile}
                displayButton={true}
              />
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default Profiles;
