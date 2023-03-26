import { Box, Button, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const IframeChild = () => {
    const [receivedMessage, setReceivedMessage] = useState(" ");

    useEffect(() => {
        window.addEventListener('message', (e) => {
            if (e.origin !== 'http://localhost:3000')
                return;

            setReceivedMessage(`Got this message from Parent iFrame: ${e.data}`);
        })
    }, []);

    const sendMessage = () => {
        window.parent.postMessage("Hi Parent!!", "http://localhost:3000")
    }

    return (
        <Box px={2}>
            <Typography variant='h3' textAlign='left' fontSize={24} my={2}>Child iFrame -</Typography>
            <Typography variant='body1' my={5} style={{ wordWrap: "break-word" }}>{receivedMessage}</Typography>
            <Button variant='contained' onClick={sendMessage} sx={{ textTransform: 'capitalize' }}>Send Data to Parent</Button>
        </Box>
    )
}

export default IframeChild