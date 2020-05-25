import React, { Component } from 'react';
import Card from './components/card'
import './App.css';
import withoutParsingData from './utils/generate/withoutParsingData';
import withParsingData from './utils/generate/withParsingData';

// import parsing from './parsing/index.json';

/*    PARSING URL
 *    https://gist.githubusercontent.com/GuillaumeSarfati/756e915305346b04ba3bf1f619b64491/raw/512e67de259ef6a82b0b118975b0c7a0a8e610ab/parsing.json
 */

class App extends Component {
  state = {
    instance: null,
    counter: 3,
  }
  onChange = (instance) => {
    this.setState({ instance })
    this.stopCounter()
  }
  onSave = () => {
    browser.runtime
    .sendMessage({ action: "card", payload: { card: this.state.instance }})
    .then(response => {
      console.log('after save card', response);
    });
    this.onCancel()
  }

  onBoard = () => window.open(`https://www.kelyst.com/en/board/?publicId=${this.props.board.publicId}`, `_blank`)

  onCancel = () => {
    this.app.classList.add('animate__animated', 'hide-kelyst')
    this.app.classList.remove('show-kelyst')
    setTimeout(() => {
      window.isAppMount = false
      this.app.innerHTML = ''
    }, 1200)
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
        this.onSave()
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
    const audio = new Audio(browser.runtime.getURL("graceful.mp3"));
    audio.volume = 0.1;
    audio.play();
  }

  onListenToPageEvents = () => {
    this.app = document.getElementById('kelyst-root-browser-extension')
    this.app.addEventListener("mouseenter", this.stopCounter)
    // TO MEDITATE
    // this.app.addEventListener("mouseleave", this.startCounter)
  }

  onMountCard = async () => {
    try {
      const instanceWithParsingData = await withParsingData()
      const instanceWithoutParsingData = await withoutParsingData()
      this.setState({
        instance: {
          ...instanceWithoutParsingData,
          ...instanceWithParsingData,
        }
      }, () => console.log('instances : ', {
        instanceWithParsingData,
        instanceWithoutParsingData,
        instance: this.state.instance,
      }))
      this.startCounter()
    } catch (err) {
      console.error('err : ', err)
    }
  }
  async componentDidMount() {
    this.onPlaySong()
    this.onListenToPageEvents()
    this.onMountCard()
  }

  render() {
    console.log('[ APP ] render : ', this.props)
    const { instance, counter } = this.state;
    return (
      <div className="Kelyst">
        <h1>Kelyst</h1>
        {
          instance ? (
            <Card
              instance={instance}
              onClick={() => console.log('onClick')}
              onChange={this.onChange}
            >
            <button className="kelyst-button-save" onClick={this.onSave}>

              {
                counter === null ? (
                  <span>Click here to save</span>
                ) : counter ? (
                  <span>AutoSave in { counter }sec</span>
                ) : (
                  <span>Saving...</span>
                )
              }
            </button>
            </Card>
          ) : null
        }
        <button className="kelyst-button-cancel" onClick={this.onCancel}>Cancel</button>
        <button className="kelyst-button-cancel" onClick={this.onBoard}>Access to your board</button>
      </div>
    );
  }
}

export default App;
