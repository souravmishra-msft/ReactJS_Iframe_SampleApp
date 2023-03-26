import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, Typography } from '@mui/material'
import { useIsAuthenticated, useMsal } from '@azure/msal-react';
import { loginRequest } from '../AuthConfig';
import { InteractionRequiredAuthError } from '@azure/msal-browser';

const IframeParent = () => {

    const { instance, accounts } = useMsal();
    const isAuthenticated = useIsAuthenticated();

    const handleLogin = (instance) => {
        instance.loginPopup(loginRequest)
            .catch(error => {
                console.log(error);
            });
    };

    const handleLogout = (instance) => {
        instance.logoutPopup()
            .catch(error => {
                console.log(error);
            });
    }

    const iFrameRef = useRef(null);
    const [receivedMessage, setReceivedMessage] = useState("");
    const [token, setToken] = useState("");

    const getToken = () => {
        console.log(instance)
        console.log(accounts)
        instance.acquireTokenSilent({ ...loginRequest, account: accounts[0] })
            .then(response => {
                // console.log("Response from acquireTokenSilent:");
                // console.log(response);
                setToken(response.accessToken);
            }).catch(async (error) => {
                if (error instanceof InteractionRequiredAuthError) {
                    instance.acquireTokenPopup({ ...loginRequest, account: accounts[0] })
                        .then(response => {
                            // console.log("Response from acquireTokenPopup");
                            // console.log(response);
                            setToken(response.accessToken);
                        }).catch(async (error) => {
                            console.log(error)
                        });
                }
            });
    }


    useEffect(() => {
        window.addEventListener('message', (e) => {
            if (e.origin !== 'http://localhost:3000')
                return;

            setReceivedMessage(`Received this message from child: ${JSON.stringify(e.data)}`);
        });
    }, []);

    const sendMessage = () => {
        if (!iFrameRef.current) {
            return;
        }
        console.log(token)
        iFrameRef.current.contentWindow.postMessage(
            token,
            'http://localhost:3000',

        );
    }

    return (
        <Box display='flex' flexDirection='column' gap={2} justifyContent='center' alignItems='center' textAlign='center'>
            <Typography variant='h1'>Parent iFrame</Typography>
            {isAuthenticated ?
                <Box display='flex' gap={1}>
                    <Button variant='contained' onClick={() => getToken(instance)} sx={{ textTransform: 'capitalize' }}>Get Token</Button>
                    <Button variant='contained' onClick={sendMessage} sx={{ textTransform: 'capitalize' }}>Send Message to iFrame</Button>
                    <Button variant='contained' onClick={() => handleLogout(instance)} sx={{ textTransform: 'capitalize' }}>Logout</Button>
                </Box> :
                <Button variant='contained' onClick={() => handleLogin(instance)}>Login</Button>}
            <Box sx={{ width: '100%', mx: 5, my: 10, display: 'flex', justifyContent: 'center' }}>
                <iframe ref={iFrameRef} src='/iframe-child/' width="600" height="300" title="Child iFrame"></iframe>
            </Box>
            <Typography variant='body1'>{receivedMessage}</Typography>
        </Box>
    )
}

export default IframeParent