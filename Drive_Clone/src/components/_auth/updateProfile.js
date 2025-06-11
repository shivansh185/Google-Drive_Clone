import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../../context/authContext"; // Adjust the import path as necessary
import { Link, useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import CenteredContainer from "./centeredContainer"; // Adjust the import path if necessary

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("❌ Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate("/user");
      })
      .catch(() => {
        setError("❌ Failed to update account");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <CenteredContainer>
      <Row className="w-100" style={{ maxWidth: "500px" }}>
        <Col>
          <Card className="shadow-sm border-0 rounded-4">
            <Card.Body className="p-4">
              <div className="text-center mb-3">
                <FaUserEdit size={40} className="mb-2 text-primary" />
                <h3 className="fw-bold">Update Profile</h3>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group id="email" className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                    defaultValue={currentUser.email}
                  />
                </Form.Group>

                <Form.Group id="password" className="mb-3">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="Leave blank to keep the same"
                  />
                </Form.Group>

                <Form.Group id="password-confirm" className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    placeholder="Leave blank to keep the same"
                  />
                </Form.Group>

                <Button
                  disabled={loading}
                  className="w-100 fw-semibold"
                  type="submit"
                  variant="primary"
                >
                  {loading ? "Updating..." : "Update Profile"}
                </Button>
              </Form>

              <div className="w-100 text-center mt-3">
                <Link to="/" className="text-decoration-none">
                  Cancel
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </CenteredContainer>
  );
}