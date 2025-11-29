import { toast } from "react-toastify";

const sendMessage = async (data) => {
    try{
        const response = await fetch("http://localhost:1911/addContactUsMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (response.ok) {
            console.log("Message sent successfully:", result);
            toast.success("Message sent successfully!");
        } else {
            toast.error(result.message || "Failed to send message");
        }
    } catch (error) {
        console.error(error);
        toast.error("An error occurred while sending the message");
    }
}

export default sendMessage;