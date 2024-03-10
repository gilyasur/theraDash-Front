import React, { useState } from 'react';
import { Button, Modal, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useDispatch } from 'react-redux';
import { forgotPass } from '../login/loginSlice';

const ForgotPass = () => {
    const [forgotPassword, { open: openForgotPassword, close: closeForgotPassword }] = useDisclosure(false);
    const dispatch = useDispatch();
    const [forgottenUsername, setForgottenUsername] = useState('');

    const handleForgot = async () => {
        try {
            await dispatch(forgotPass({ username: forgottenUsername }) as any);
            closeForgotPassword(); // Close the modal after submitting
        } catch (error) {
            console.error('Failed to send password reset request:', error);
            // Handle error if needed
        }
    };

    return (
        <div>
            <Button onClick={openForgotPassword} color="#2F4858">
                Forgot Your Password?
            </Button>
            <Modal opened={forgotPassword} onClose={closeForgotPassword} withCloseButton={false}>
                <div>
                    <TextInput
                        label="Enter your username"
                        value={forgottenUsername}
                        onChange={(e) => setForgottenUsername(e.currentTarget.value)}
                    />
                    <Button
                        style={{
                            border: 'none',
                            background: '#F5EEE6',
                            color: '#2F4858',
                            cursor: 'pointer',
                            marginLeft: '0',
                        }}
                        onClick={handleForgot}
                    >
                        Submit
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default ForgotPass;
