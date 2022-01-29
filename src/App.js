import React, { Component } from 'react';
import './App.css';

function MinsAndSecs(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds - (mins * 60);
  function _seconds() {
    if(secs < 10) {
      return '0' + secs;
    }
    return secs
  };
  function _minutes() {
    if(mins < 10) {
      return '0' + mins;
    }
    return mins;
  }
  return(
    <div id='time-left'>
      <h1>{_minutes()}:{_seconds()}</h1>
    </div>
  )
}

function TimerLabel(session) {
  if(session) {
    return(<p id='timer-label'>Session</p>)
  } else {
    return(<p id='timer-label'>Break</p>)
  }
}

function PlayPause(isOn) {
  if(!isOn) {
    return(<i className="fas fa-play"></i>);
  }
  return(<i className="fas fa-pause"></i>);
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionInput: 25,
      breakInput: 5,
      seconds: 25 * 60,
      isOn: false,
      session: true
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.updateTime = this.updateTime.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    if(this.state.seconds === 0) {
      this.beep = document.getElementById('beep');
      this.beep.play();
    }
  }

  increment = (event) => {
    if(this.state.isOn) return;
    if(event.target.value === 's' && this.state.sessionInput < 60) {  
      this.setState({
          sessionInput: this.state.sessionInput + 1
        });
      if(this.state.session) {
        this.setState({
          seconds: this.state.seconds + 60
        })
      }
    } else if(event.target.value === 'b' && this.state.breakInput < 60) {
      this.setState({
        breakInput: this.state.breakInput + 1
      });
      if(!this.state.session) {
        this.setState({
          seconds: this.state.seconds + 60
        })
      }
    }
  }

  decrement = (event) => {
    if(this.state.isOn) return;
    if(event.target.value === 's' && this.state.sessionInput > 1) { 
      this.setState({
          sessionInput: this.state.sessionInput - 1,
          seconds: this.state.seconds - 60
        })
    } else if(event.target.value === 'b' && this.state.breakInput > 1) {
      this.setState({
        breakInput: this.state.breakInput - 1
      })
    }
  }

  updateTime = () => {
   if(this.state.seconds > 0) { 
      this.setState({
        seconds: this.state.seconds - 1
      });
    } else if(this.state.session) {
      this.setState({
        seconds: this.state.breakInput * 60,
        session: false
      })
    } else {
      this.setState({
        seconds: this.state.sessionInput * 60,
        session: true
      })
    }
  }

  startTimer = () => {
    this.timer = setInterval(this.updateTime, 1000);
    this.setState({
      isOn: true
    })
  }

  stopTimer = () => {
    clearInterval(this.timer);
    this.setState({
      isOn: false
    })
  }

  handleClick = () => {
    if(!this.state.isOn) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  handleReset = () => {
    const beep = document.getElementById('beep');
    beep.pause();
    beep.currentTime = 0;
    clearInterval(this.timer);
    this.setState({
      sessionInput: 25,
      breakInput: 5,
      seconds: 25 * 60,
      isOn: false,
      session: true
    });
  }
  
  render() {
    return (
      <div className='main'>
        <div className='container'>
          <h1 id='title'>Pomodoro Timer</h1>
          <div id='body'>
            <div id='inputs'>
              <div id='session'>
                <div id='session-display'>
                  <p id='session-label'>Session Length:</p>
                  <p id='session-length'>{this.state.sessionInput}</p>
                </div>
                <div id='session-buttons'>
                  <button id='session-increment' value='s' onClick={this.increment}><i class="fas fa-arrow-up"></i></button>
                  <button id='session-decrement' value='s' onClick={this.decrement}><i class="fas fa-arrow-down"></i></button>
                </div>
              </div>
              <div id='break'>
                <div id='break-display'>
                  <p id='break-label'>Break Length:</p>
                  <p id='break-length'>{this.state.breakInput}</p>
                </div>
                <div id='break-buttons'>
                  <button id='break-increment' value='b' onClick={this.increment}><i class="fas fa-arrow-up"></i></button>
                  <button id='break-decrement' value='b' onClick={this.decrement}><i class="fas fa-arrow-down"></i></button>
                </div>
              </div>
            </div>
            <div id='timer'>
              {TimerLabel(this.state.session)}
              {MinsAndSecs(this.state.seconds)}
              <button id='start_stop' onClick={this.handleClick}>{PlayPause(this.state.isOn)}</button>
              <button id='reset' onClick={this.handleReset}><i class="fas fa-redo"></i></button>
            </div>
            <div>
              <audio id='beep'>
                <source 
                  src='https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav' 
                  preload='auto'
                />
              </audio>
            </div>
          </div>
          {DesignedBy()}    
        </div>  
      </div>
    );
  }
}

export default App;

const DesignedBy = () => {
  return(
    <div id='designedBy'>
      <p>Developed by Garrett Franklin</p>
    </div>
  )
}
