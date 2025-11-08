import { toast } from "react-toastify";

const handleLoginSubmit = async (data) => {
  try {
    const res = await fetch("http://localhost:1911/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (res.ok) {
      console.log("Token:", result.token);
      localStorage.setItem("token", result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      toast.success("Login successful");
    } else {
      toast.error(result.message || "Login failed");
    }
  } catch (error) {
    console.error(error);
    toast.error("Invalid email or password");
  }
};

export default handleLoginSubmit;
