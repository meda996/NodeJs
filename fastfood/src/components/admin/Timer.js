import React, { useEffect } from 'react';
import { connect } from 'react-redux';

function Timer(props) {
    const [time,setTime] = React.useState(Date.now() - props.startTime);


    useEffect(() => {
        const interval = setInterval(() => {
            const hr = Math.floor((Date.now() - props.startTime)/3600000);
            const min = Math.floor((Date.now() - props.startTime)/60000-(hr*60));
            const sec = Math.floor((Date.now() - props.startTime)/1000-(min*60)-(hr*3600));
            const timeString = "Application is running for: " + hr +":"+min+":"+sec;
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
        startTime: state.startTime
    }
}

export default connect(mapStateToProps)(Timer);