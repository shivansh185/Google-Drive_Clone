import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaGoogle } from "react-icons/fa";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, signInWithGoogle } = useAuth(); // ✅ Include Google login
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Corrected from Navigate.push

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/"); // ✅ navigate instead of push
    } catch {
      setError("❌ Failed to log in. Please check your credentials.");
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
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh", background: "#f8f9fa" }}
    >
      <Row className="w-100" style={{ maxWidth: "400px" }}>
        <Col>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-4">
              <div className="text-center mb-3">
                <FaSignInAlt size={40} className="mb-2 text-success" />
                <h3 className="fw-bold">Welcome Back</h3>
                <p className="text-muted small">Login to your account</p>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" id="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                  />
                </Form.Group>
                <Form.Group className="mb-4" id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                  />
                </Form.Group>

                <Button
                  disabled={loading}
                  className="w-100 fw-semibold mb-2"
                  type="submit"
                  variant="success"
                >
                  {loading ? "Logging in..." : "Log In"}
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
                  <Link to="/forgot-password" className="text-decoration-none">
                    Forgot Password?
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
    </Container>
  );
}
