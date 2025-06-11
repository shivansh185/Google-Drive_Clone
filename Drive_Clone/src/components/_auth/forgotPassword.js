import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../../context/authContext"; // Adjust the import path as necessary
import { Link } from "react-router-dom";
import { FaLockOpen } from "react-icons/fa";
import CenteredContainer from "./centeredContainer"; // Adjust the import path if necessary

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("✅ Check your inbox for further instructions.");
    } catch {
      setError("❌ Failed to reset password. Please try again.");
    }

    setLoading(false);
  }

  return (
   <CenteredContainer>
      <Row className="w-100" style={{ maxWidth: "400px" }}>
        <Col>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-4">
              <div className="text-center mb-3">
                <FaLockOpen size={40} className="mb-2 text-warning" />
                <h3 className="fw-bold">Reset Password</h3>
                <p className="text-muted small">We'll help you recover your account</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}
              {message && <Alert variant="success">{message}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" id="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    placeholder="your@email.com"
                    required
                  />
                </Form.Group>

                <Button
                  disabled={loading}
                  className="w-100 fw-semibold"
                  type="submit"
                  variant="warning"
                >
                  {loading ? "Sending..." : "Reset Password"}
                </Button>
              </Form>

              <div className="w-100 text-center mt-3">
                <small>
                  <Link to="/login" className="text-decoration-none">
                    Back to Login
                  </Link>
                </small>
              </div>
            </Card.Body>
          </Card>

          <div className="w-100 text-center mt-3">
            <small>
              Need an account?{" "}
              <Link to="/signup" className="text-decoration-none">
                Sign Up
              </Link>
            </small>
          </div>
        </Col>
      </Row>
    </CenteredContainer>
  );
}
