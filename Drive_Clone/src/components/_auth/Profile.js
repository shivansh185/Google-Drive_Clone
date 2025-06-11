import React from 'react';
import { Container, Card, Row, Col, Image, Button } from 'react-bootstrap';
import { useAuth } from '../../context/authContext';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const { currentUser } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const db = getFirestore();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                    if (userDoc.exists()) {
                        setUserData(userDoc.data());
                    }
                } catch (error) {
                    console.error("Error fetching user data: ", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchUserData();
    }, [currentUser, db]);

    if (loading) {
        return (
            <Container fluid className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
                Loading...
            </Container>
        );
    }

    return (
        <Container fluid className="p-3 " style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Row className="justify-content-center">
                <Col xs={12} md={10} lg={8}>
                    <Card className="shadow w-500">
                        <Card.Header className="bg-primary text-white">
                            <h3 className="mb-0">User Profile</h3>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={4} className="text-center mb-4 mb-md-0">
                                    <Image
                                        src={currentUser.photoURL || 'https://via.placeholder.com/150'}
                                        roundedCircle
                                        width="150"
                                        height="150"
                                        className="mb-3"
                                    />
                                    <Button 
                                        variant="outline-primary" 
                                        className="w-100"
                                        onClick={() => navigate('/dashboard')}
                                    >
                                        Back to Dashboard
                                    </Button>
                                </Col>
                                <Col md={8}>
                                    <div className="mb-4">
                                        <h5>Personal Information</h5>
                                        <hr />
                                        <p><strong>Name:</strong> {currentUser.displayName || 'Not provided'}</p>
                                        <p><strong>Email:</strong> {currentUser.email}</p>
                                        <p><strong>Email Verified:</strong> {currentUser.emailVerified ? 'Yes' : 'No'}</p>
                                        <p><strong>Account Created:</strong> {new Date(currentUser.metadata.creationTime).toLocaleString()}</p>
                                    </div>

                                    {userData && (
                                        <div className="mb-4">
                                            <h5>Additional Information</h5>
                                            <hr />
                                            {Object.entries(userData).map(([key, value]) => (
                                                <p key={key}><strong>{key}:</strong> {value.toString()}</p>
                                            ))}
                                        </div>
                                    )}

                                    <div className="d-flex gap-2 flex-wrap">
   <Button variant="primary" onClick={() => navigate('/update-profile')}>
        Edit Profile
      </Button>

      <Button variant="outline-secondary" onClick={() => navigate('/forgot-password')} className="ms-2">
        Change Password
      </Button>
                                    </div>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Users;
