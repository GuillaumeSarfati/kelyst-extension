import React, { Component } from 'react';
import Card from './components/card'
import './Sync.css';

class Sync extends Component {
  state = {
    counter: 3,
  }

  startCounter = () => {
    if (this.counter) clearInterval(this.counter)

    this.setState({counter: 3})
    this.counter = setInterval(() => {
      if (this.state.counter === 0) {
        if (this.counter) {
          clearInterval(this.counter)
          this.setState({counter: null})
        }
      }
      this.setState({ counter: this.state.counter - 1})
    }, 1000)
  }

  stopCounter = () => {
      if (this.counter) {
        clearInterval(this.counter)
        this.setState({counter: null})
      }
  }


  onPlaySong = () => {
    const audio = new Audio(chrome.runtime.getURL("graceful.mp3"));
    audio.volume = 0.1;
    audio.play();
  }


  componentDidMount = () => {
    this.onPlaySong()
    this.startCounter()
  }

  render() {
    console.log('[ APP ] render : ', this.props)
    const { instance, counter } = this.state;
    return (
      <div className="Kelyst">
        <div className="logo-wrapper">
        <img className="logo" src={chrome.runtime.getURL("icon-large-pink-k.png")}/>
        <img className="check" src={chrome.runtime.getURL("check.svg")}/>
        </div>
        <div className="kelyst-links">
          <div className="kelyst-links-wrapper">
          <h3 className="kelyst">
            <span>Congratulations{ this.props.customer ? ` ${this.props.customer.firstname},` : `` }</span>
            <span>you are now ready</span>
            <span>to search on</span>
          </h3>
          <a href={"http://centris.ca/"}>centris.ca</a>
          <a href={"https://4rent.ca/"} target="_blank">4rent.ca</a>
          <a href={"https://www.rentseeker.ca/"} target="_blank">rentseeker.ca</a>
          <a href={"https://rentals.ca/"} target="_blank">rentals.ca</a>
          <a href={"https://www.rentcafe.com/"} target="_blank">rentcafe.com</a>
          <a href={"https://www.padmapper.com/"} target="_blank">padmapper.com</a>
          <a href={"https://www.zumper.com/"} target="_blank">zumper.com</a>
          <a href={"https://www.trulia.com/"} target="_blank">trulia.com</a>
          <a href={"https://www.zillow.com/"} target="_blank">zillow.com</a>
          <a href={"https://www.craiglist.org/"} target="_blank">craiglist.org</a>
          <h3 className="kelyst"><span>and many more</span></h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Sync;
