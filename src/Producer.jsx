import React, {useState} from 'react';
import {TextField, Button} from '@material-ui/core';

function Producer ({}) {
    const [textValue, setTextValue] = useState("");
    const [messageId, setMessageId] = useState("");

    function writeMessage () {
        // take textfield value and write to database, return messageId guid to user for confirmation
        console.log(textValue);

        const url = "https://nqliq0rkvb.execute-api.us-east-1.amazonaws.com/dev/writeMessage";

        let urlEncoded = new URLSearchParams();
        urlEncoded.append("message", textValue);

        
        const params = {
            method: 'POST',
            headers:{"Content-Type": "application/x-www-form-urlencoded"},
            body: urlEncoded
        };

        let request = new Request(url, params);
        fetch(request)
        .then(data=>{return data.json()})
        .then(res=>setMessageId(res.messageId))
        .catch(error=>console.log(error))
    }

    return(
        <div>
            <TextField id="messageInput" className="textField" label="Write a message" variant="outlined"  margin="normal"  
                value={textValue} onChange={(event) => setTextValue(event.target.value)}/><br/>
            <Button variant="contained" color="secondary"  onClick={()=>writeMessage()}>
                Write Message
            </Button><br/>
            <span>{messageId ? `Your message has been recorded under ID: ${messageId}` : null}</span>
            
        </div>
    );
    
};

export default Producer;
