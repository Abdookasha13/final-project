import { toast } from "react-toastify";

const handleRegistrationSubmit = async (data, profileImageUrl, navigate) => {
  try {
    if (data.isInstructor) data.role = "instructor";
    else data.role = "student";

    // attach profile image url
    data.profileImage = profileImageUrl;

    const response = await fetch("http://localhost:1911/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.ok) {
      toast.success("Registered successfully!");
      console.log(result);
      navigate("/login");
    } else {
      toast.error(result.message || "Registration failed");
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong!");
  }
};

export default handleRegistrationSubmit;
