import "bootstrap/dist/css/bootstrap.min.css";
import "../../Pages/Contact/Contact.css";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import sendMessage from "../../utilities/sendMessage";

const Form = () => {
  const {
    register,              
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    sendMessage(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          {/* Name */}
          <div className="form-group col-12 mb-25">
            <label htmlFor="exampleInputName">Name</label>
            <input
              type="text"
              {...register("name", {
                required: "This field is required",
                minLength: {
                  value: 3,
                  message: "Must be at least 3 characters",
                },
              })}
              className="form-control form-control-custom "
              id="exampleInputName"
              placeholder="Name"
              // style={{ height: "58px", fontSize: "14px",width:"440px" }}
            />
            {errors.name && (
              <small className="form-text text-danger">
                {errors.name.message}
              </small>
            )}
          </div>

          {/* Email */}
          <div className="form-group col-12 ">
            <label htmlFor="exampleInputEmail">Email address</label>
            <input
              {...register("email", {
                required: "This field is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              type="email"
              className="form-control form-control-custom  "
              id="exampleInputEmail"
              placeholder="Email"
            />
            {errors.email && (
              <small className="form-text text-danger">
                {errors.email.message}
              </small>
            )}
          </div>

          {/* Phone */}
          <div className="form-group col-12 ">
            <label htmlFor="exampleInputPhone">Phone</label>
            <input
              {...register("phone", {
                required: "This field is required",
                minLength: { value: 11, message: "Must be 11 digits" },
              })}
              type="tel"
              className="form-control form-control-custom "
              id="exampleInputPhone"
              placeholder="Phone"
            />
            {errors.phone && (
              <small className="form-text text-danger">
                {errors.phone.message}
              </small>
            )}
          </div>

          {/* Subject */}
          <div className="form-group col-12 ">
            <label htmlFor="exampleInputSubject">Subject</label>
            <input
              {...register("subject", {
                required: "This field is required",
              })}
              type="text"
              className="form-control form-control-custom "
              id="exampleInputSubject"
              placeholder="Subject"
            />
            {errors.subject && (
              <small className="form-text text-danger">
                {errors.subject.message}
              </small>
            )}
          </div>

          {/* Message */}
          <div className="form-group col-12 ">
            <label htmlFor="exampleFormControlTextarea">Message</label>
            <textarea
              {...register("message", {
                required: "This field is required",
                minLength: {
                  value: 10,
                  message: "Must be at least 10 characters",
                },
              })}
              className="form-control mb-3  "
              id="exampleFormControlTextarea"
              rows="4"
              placeholder="Message"
              style={{ resize: "none" }}
            ></textarea>
            {errors.message && (
              <small className="form-text text-danger">
                {errors.message.message}
              </small>
            )}
          </div>
          <button type="submit" className="border-0 bg-transparent p-0">
            <Button>Send Message</Button>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
