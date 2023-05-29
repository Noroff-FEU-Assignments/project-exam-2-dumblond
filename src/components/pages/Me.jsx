import { useCallback, useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { useState } from "react";
import Loading from "../common/Loading";
import DisplayMessage from "../common/DisplayMessage";
import { profileAPI } from "../../constants/api";
import Profile from "../posts/Profile";
import { Breadcrumb } from "react-bootstrap";

function Me() {
  const [auth] = useContext(AuthContext);
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = profileAPI + "/" + auth.name;

  const getProfile = useCallback(async function () {
    async function fetchData() {
      try {
        const response = await axios.get(URL, {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        });

        if (response.status === 200) {
          setProfile(response.data);
          console.log(response.data);
        } else {
          setError("Faen!");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(function () {
    getProfile();
  }, []);

  if (loading) {
    return <Loading animation="border" />;
  }

  if (error) {
    return <DisplayMessage messageType="danger" message="Helvete" />;
  }

  return (
    <>
      <Breadcrumb className="pt-3">
        <Breadcrumb.Item href="/profiles">Profiles</Breadcrumb.Item>
        <Breadcrumb.Item active>My profile</Breadcrumb.Item>
      </Breadcrumb>

      <Profile profile={profile} getProfile={getProfile} />
    </>
  );
}

export default Me;
