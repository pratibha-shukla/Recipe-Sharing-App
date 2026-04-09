import React from 'react';
import { Link } from 'react-router-dom';

// Correct paths based on your folder structure
import react from "../assets/hero.png";
import hero from "../assets/react.svg";

const ERROR_DATA = {
  500: {
    title: "500 - Server Error",
    message: "Something went wrong on our end. Please try again later.",
    image: hero
  },
  503: {
    title: "503 - Service Unavailable",
    message: "Our service is currently unavailable. Please check back soon.",
    image: react
  }
};

const ErrorPage = ({ code = 500 }) => {
  const error = ERROR_DATA[code] || ERROR_DATA[500];

  return (
    <div className="container text-center mt-5 d-flex flex-column align-items-center">
      <h3 className="display-4 fw-bold">{error.title}</h3>

      <div className="my-4">
        <img
          src={error.image}
          alt={error.title}
          className="img-fluid"
          style={{ maxWidth: "100px" }}
        />
      </div>

      <p className="lead">{error.message}</p>

      <Link to="/" className="btn btn-primary mt-3 px-4 py-2">
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;





