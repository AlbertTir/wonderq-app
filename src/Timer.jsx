import React, {useState, useEffect} from 'react';

function Timer ({timeout, active, tick}){
    const [seconds, setSeconds] = useState(timeout);
    const [timerActive, setTimerActive] = useState(active);

    useEffect(() => {
        // set timer according to props from parent, sync with parent's values
        let interval = null;
        setSeconds(timeout);
        setTimerActive(active);
        if(timerActive){
            interval = setInterval(() => tick(),1000);
        }
        return () => clearInterval(interval);
    });

    return <div>
        {seconds}s
    </div>
}

export default Timer;