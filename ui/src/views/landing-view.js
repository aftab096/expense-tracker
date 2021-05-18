import React, { useState, useEffect } from "react";

import UserService from "../services/user-service";

const Landing = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      })
      .catch((error) => {
        const _content =
          (error.response?.data?.message) || error.message || "Unknown Error";

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
};

export default Landing;