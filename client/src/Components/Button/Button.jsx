import "./Button.css";

function Button({ children, className }) {
  return (
    <>
      <button className={`animated-button ${className || ""}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="arr-2"
          viewBox="0 0 24 24"
        >
          <path d="M16.1716 11L10.8076 5.636 12.2218 4.222 20 12l-7.778 7.778-1.414-1.414L16.1716 13H4v-2h12.1716Z" />
        </svg>
        <span className="text">{children}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="arr-1"
          viewBox="0 0 24 24"
        >
          <path d="M16.1716 11L10.8076 5.636 12.2218 4.222 20 12l-7.778 7.778-1.414-1.414L16.1716 13H4v-2h12.1716Z" />
        </svg>
      </button>
    </>
  );
}

export default Button;
