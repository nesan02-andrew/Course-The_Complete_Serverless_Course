import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Avatar, Card } from 'antd';
import SignInForm from './SignInForm';
import Bathers from './Bathers';

const Profile = ({ loggedInUser, APIEndpoint, profileUrl, isSignedIn, handleSignIn, identityId }) => {
    const WrappedSignInForm = Form.create()(SignInForm);
    const displayForm = !isSignedIn && <WrappedSignInForm handleSignIn={handleSignIn} />;
    const avatar = {
        width: 100,
        height: 100,
        lineHeight: 100,
        borderRadius: 50
    };

    return (
        <Row>
            <Col span={8} offset={8} style={{ paddingTop: 20 }}>
                {
                    isSignedIn ? (
                        <Card>
                            {profileUrl &&
                                (<Avatar style={avatar} icon="user" src={profileUrl} />)
                            }
                            <p><b>User:</b> {loggedInUser.idToken.payload['cognito:username']}</p>
                            <p><b>Identity Id:</b> {identityId}</p>
                            <p><b>User Sub:</b> {loggedInUser.idToken.payload.sub}</p>
                            <Bathers loggedInUser={loggedInUser} APIEndpoint={APIEndpoint} />
                            <p><b>ID Token:</b> <span style={styles.token}>{loggedInUser.idToken.jwtToken}</span></p>
                        </Card>
                    ) :
                        (
                            <div>
                                {displayForm}
                            </div>
                        )
                }
            </Col>
        </Row>
    )
}

const styles = {
    token: {
        whiteSpace: 'pre-wrap',
        maxWidth: '100%',
        wordBreak: 'break-word',
        backgroundColor: '#DFD8D9',
        display: 'block',
        padding: 2,
        borderRadius: 3,
    }
}

Profile.propTypes = {
    isSignedIn: PropTypes.bool.isRequired,
    handleSignIn: PropTypes.func.isRequired,
    loggedInUser: PropTypes.object,
};

export default Profile;
