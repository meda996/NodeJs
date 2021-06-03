import React, { useEffect } from 'react';
import { connect } from 'react-redux';

function SessionTimer(props) {
    const [time,setTime] = React.useState(Date.now() - props.sessionTime);


    useEffect(() => {
        const interval = setInterval(() => {
            const hr = Math.floor((Date.now() - props.sessionTime)/3600000);
            const min = Math.floor((Date.now() - props.sessionTime)/60000-(hr*60));
            const sec = Math.floor((Date.now() - props.sessionTime)/1000-(min*60)-(hr*3600));
            const timeString = "Session is running for: " + hr +":"+min+":"+sec;
            setTime(timeString);
          }, 1000);
    })
    return(
        <div>
            {time}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        sessionTime: state.sessionStartTime
    }
}

export default connect(mapStateToProps)(SessionTimer);