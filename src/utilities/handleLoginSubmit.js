import { toast } from "react-toastify";
import axios from "axios";
import { loginSuccess } from "../Store/Slices/authSlice";
import { fetchCart } from "../Store/Slices/cartSlice";

const handleLoginSubmit = async (data, dispatch) => {
  try {
    const res = await axios.post("http://localhost:1911/login", data);

    if (res.status === 200) {
      dispatch(
        loginSuccess({
          user: res.data.user,
          token: res.data.token,
        })
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      dispatch(fetchCart());

      toast.success("Login successful");
      return { success: true };
    }
  } catch (error) {
    console.error("Login error:", error);
    const errorMessage =
      error.response?.data?.message || "Invalid email or password";
    toast.error(errorMessage);
    return { success: false, message: errorMessage };
  }
};

export default handleLoginSubmit;
