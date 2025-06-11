import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../../context/authContext"; // Adjust the import path if needed
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus, FaGoogle } from "react-icons/fa";
import CenteredContainer from "./centeredContainer"; // Adjust the import path if necessary

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, signInWithGoogle } = useAuth(); // ✅ Include Google Auth
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("❗Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("❌ Failed to create an account. Try again!");
    }

    setLoading(false);
  }

  async function handleGoogleSignIn() {
    try {
      setError("");
      setLoading(true);
      await signInWithGoogle();
      navigate("/");
    } catch {
      setError("❌ Google sign-in failed. Try again!");
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
                <FaUserPlus size={40} className="mb-2 text-primary" />
                <h3 className="fw-bold">Create Account</h3>
                <p className="text-muted small">Sign up to get started</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" id="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    placeholder="example@email.com"
                    required
                    autoComplete="email"
                  />
                </Form.Group>
                <Form.Group className="mb-3" id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="Enter a secure password"
                    required
                    autoComplete="new-password"
                  />
                </Form.Group>
                <Form.Group className="mb-4" id="password-confirm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    placeholder="Re-enter password"
                    required
                    autoComplete="new-password"
                  />
                </Form.Group>

                <Button
                  disabled={loading}
                  className="w-100 fw-semibold mb-2"
                  type="submit"
                  variant="primary"
                >
                  {loading ? "Creating..." : "Sign Up"}
                </Button>
              </Form>

              <div className="text-center">
                <span className="text-muted">or</span>
              </div>

              <Button
                variant="outline-danger"
                className="w-100 fw-semibold mt-2"
                onClick={handleGoogleSignIn}
                disabled={loading}
              >
                <FaGoogle className="me-2" />
                Sign in with Google
              </Button>

              <div className="w-100 text-center mt-3">
                <small>
                  Already have an account?{" "}
                  <Link to="/login" className="text-decoration-none">
                    Log In
                  </Link>
                </small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
   </CenteredContainer>
  );
}
