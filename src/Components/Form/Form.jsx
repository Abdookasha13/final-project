import "bootstrap/dist/css/bootstrap.min.css";
import "../../Pages/Contact/Contact.css";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import sendMessage from "../../utilities/sendMessage";
import { useTranslation } from "react-i18next";

const Form = () => {
  const { t } = useTranslation();
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
            <label htmlFor="exampleInputName">{t("form.name")}</label>
            <input
              type="text"
              {...register("name", {
                required: t("form.required"),
                minLength: {
                  value: 3,
                  message: t("form.minLength"),
                },
              })}
              className="form-control form-control-custom "
              id="exampleInputName"
              placeholder={t("form.name")}
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
            <label htmlFor="exampleInputEmail">{t("form.email")}</label>
            <input
              {...register("email", {
                required: t("form.required"),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("form.invalidEmail"),
                },
              })}
              type="email"
              className="form-control form-control-custom  "
              id="exampleInputEmail"
              placeholder={t("form.email")}
            />
            {errors.email && (
              <small className="form-text text-danger">
                {errors.email.message}
              </small>
            )}
          </div>

          {/* Phone */}
          <div className="form-group col-12 ">
            <label htmlFor="exampleInputPhone">{t("form.phone")}</label>
            <input
              {...register("phone", {
                required: t("form.required"),
                minLength: { value: 11, message: t("form.phoneLength") },
              })}
              type="tel"
              className="form-control form-control-custom "
              id="exampleInputPhone"
              placeholder={t("form.phone")}
            />
            {errors.phone && (
              <small className="form-text text-danger">
                {errors.phone.message}
              </small>
            )}
          </div>

          {/* Subject */}
          <div className="form-group col-12 ">
            <label htmlFor="exampleInputSubject">{t("form.subject")}</label>
            <input
              {...register("subject", {
                required: t("form.required"),
              })}
              type="text"
              className="form-control form-control-custom "
              id="exampleInputSubject"
              placeholder={t("form.subject")}
            />
            {errors.subject && (
              <small className="form-text text-danger">
                {errors.subject.message}
              </small>
            )}
          </div>

          {/* Message */}
          <div className="form-group col-12 ">
            <label htmlFor="exampleFormControlTextarea">
              {t("form.message")}
            </label>
            <textarea
              {...register("message", {
                required: t("form.required"),
                minLength: {
                  value: 10,
                  message: t("form.messageMinLength"),
                },
              })}
              className="form-control mb-3  "
              id="exampleFormControlTextarea"
              rows="4"
              placeholder={t("form.message")}
              style={{ resize: "none" }}
            ></textarea>
            {errors.message && (
              <small className="form-text text-danger">
                {errors.message.message}
              </small>
            )}
          </div>
          <button type="submit" className="border-0 bg-transparent p-0">
            <Button>{t("form.sendMessage")}</Button>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
