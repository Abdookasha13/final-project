import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { loginSuccess } from "../../Store/Slices/authSlice";
import { toast } from "react-toastify";
import handleGetUserById from "../../utilities/handleGetUserById";

const GoogleSuccess = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(location.search).get("token");

    if (!token) {
      navigate("/login");
      return;
    }

    localStorage.setItem("token", token);

    const fetchUser = async () => {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const userId = decoded.id;

        const fullUser = await handleGetUserById(userId);

        localStorage.setItem("user", JSON.stringify(fullUser));

        dispatch(
          loginSuccess({
            token,
            user: fullUser,
          })
        );

        toast.success("Login successful via Google");
        navigate("/");
      } catch (err) {
        console.error(err);
        navigate("/login");
        toast.error("Failed to login via Google");
      }
    };

    fetchUser();
  }, [dispatch, location, navigate]);

  return <p>Logging you in...</p>;
};

export default GoogleSuccess;
