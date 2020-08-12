import React, {useState, useEffect} from 'react';
import {Button, Checkbox} from '@material-ui/core';
import Timer from './Timer';
import RefreshIcon from '@material-ui/icons/Refresh';

function Consumer ({}) {
    const [newMessages, setNewMessages] = useState([]);
    const [processMessages, setProcessMessages] = useState([]);
    const [timer, setTimer] = useState(120);
    const [timerActive, setTimerActive] = useState(false);
    let submitted = false;

    useEffect(() =>{
        if(timer === -1){
            // if the 2 min time runs out, refresh the list of items and fetch a new one. All unsaved proccess changes cleared
            refreshConsumer();
        }
    });

    function refreshConsumer (){
        // refresh list of available items, reset previously held items to Available
        setTimerActive(true);
        setTimer(120);
        fetchItems();
        let itemsToRefresh = newMessages.map(message => message.MessageId);
        if(submitted){
            itemsToRefresh = itemsToRefresh.filter(message => !processMessages.includes(message));
        }else{
            setProcessMessages([]);
        }
        
        
        updateItems(itemsToRefresh, "Available");
        submitted = false;
    }

    function submitItems (){
        // submit checked off (or unchecked) items for processing (makes it unavailable for other consumers)
        submitted = true;
        updateItems(processMessages, "Processed");
        
        refreshConsumer();
    }

    function fetchItems(){
        // get the list of consumer items to display, limit to 3, can be adjusted
        const url = "https://nqliq0rkvb.execute-api.us-east-1.amazonaws.com/dev/fetchItems?limit=3";

        let request = new Request(url);
        fetch(request)
        .then(data => {return data.json()})
        .then((res) => setNewMessages(res))
        .catch(error=>console.log(error))
    }

    function updateItems(items, status){
        // update items status, Available, Processed or Reviewing
        const url = "https://nqliq0rkvb.execute-api.us-east-1.amazonaws.com/dev/updateItems";
        
        const params = {
            method: 'POST',
            headers:{"Content-Type": "application/json"},
            body: JSON.stringify({items, status})
        };

        let request = new Request(url, params);
        fetch(request)
        .then(data=>{return data.json()})
        .catch(error=>console.log(error))
    }

    function renderItems(messages){
        // render the list of items
        return <div key={messages.MessageId}>
                    <span>{messages.MessageContent}</span>
                    <span className="hidden">{messages.MessageId}</span>
                    <Checkbox
                        id={messages.MessageId}
                        // checked={checked}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                </div>
    }
    
    const handleChange = (event) => {
        // checkbox handler, if checked off, add items to array for update processing later
        let temp = processMessages;
        if(event.target.checked){
            temp.push(event.target.id);
        }else{
            temp = temp.filter(id => id != event.target.id);
        }
        setProcessMessages(temp);
    };

    function decrementTimer(){
        // timer before refresh
        setTimer(timer => timer - 1);
    }

    return (
        <div>
            {newMessages.map(mes =>
                // <ListItem key={mes.MessageId} MessageId={mes.MessageId} MessageContent={mes.MessageContent}></ListItem>
                renderItems(mes)
            )}
            {/* <ListItem MessageContent={"Testing"}></ListItem> */}
            <Button variant="contained" color="default" style={{ margin: 8 }} onClick={()=>refreshConsumer()}>
                <Timer timeout={timer} active={timerActive} tick={decrementTimer}/><RefreshIcon/>
            </Button>
            <Button variant="contained" color="secondary" style={{ margin: 8 }} onClick={()=>submitItems()}>
                Submit
            </Button>
            <br/>
            
        </div>
    );
    
};

export default Consumer;
