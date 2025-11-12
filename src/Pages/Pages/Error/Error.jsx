import "./Error.css";
import Button from "../../../Components/Button/Button";

function ErrorPage() {
  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center py-5">
      <div className="row align-items-center text-center text-lg-start">
        <div className="col-lg-6 order-2 order-lg-1 mt-4 mt-lg-0">
          <h1 className="display-5 fw-bold text-dark mb-4">
            SORRY, PAGE NOT FOUND!
          </h1>
          <p className="text-muted fs-5 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <Button children="Back To Home" />
        </div>

        <div className="col-lg-6 order-1 order-lg-2 d-flex justify-content-center">
          <img
            src="../Images/404-illustration-dDv1XxrA.png"
            alt="404 Error - Page Not Found"
            className="img-fluid w-75"
          />
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
