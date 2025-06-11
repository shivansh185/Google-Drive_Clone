import React from "react";
import { Container } from "react-bootstrap";

export default function CenteredContainer({ children }) {
  return (
    <div style={{ height: "100vh" }}>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100%" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          {children}
        </div>
      </Container>
    </div>
  );
}
