/*global chrome*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Sync from './Sync';
import registerServiceWorker from './registerServiceWorker';
import withoutParsingData from './utils/generate/withoutParsingData';
import withParsingData from './utils/generate/withParsingData';

// import browser from "webextension-polyfill";


console.log('$ execute content script')
localStorage.setItem('kelyst-chrome-extension-id', chrome.runtime.id)
// console.log('INJECT KELYST EXTENSION', chrome.runtime.id)
// Get the element to prepend our app to. This could be any element on a specific website or even just `document.body`.
// const body = document.body;
// // console.log('body : ', body)
// // Create a div to render the <App /> component to.
// const app = document.getElementById('kelyst-root-chrome-extension') || document.createElement('div');
//
// // Set the app element's id to `root`. This is the same as the element that create-react-app renders to by default so it will work on the local server too.
// app.id = 'kelyst-root-chrome-extension';
//
// // Prepend the <App /> component to the body element if it exists. You could also use `appendChild` depending on your needs.
// if (body) body.prepend(app);

// Render the <App /> component.
// window.isAppMount = false

// console.log('body : ', body)
// console.log('app : ', app)

// if (window.location.host === 'www.kelyst.com')


// chrome.runtime.sendMessage({action: "loaded"}, function(response) {
//   console.log('loaded response : ', response);
// });

const body = document.body;

const app = document.getElementById('kelyst-root-chrome-extension') || document.createElement('div');

const onSync = () => {
  console.log('RECEIVE ONSYNC')
  chrome.runtime.onMessage.removeListener(dispatch)

  try {

    if (window.location.hostname.match(/kelyst.com$/)) {
      const customer = JSON.parse(localStorage.getItem('customer'))
      const board = JSON.parse(localStorage.getItem('board'))
      const accessToken = JSON.parse(localStorage.getItem('accessToken'))

      if (customer && board && accessToken) {
        chrome.runtime.sendMessage({
          action: 'sync',
          payload: {
            customer,
            board,
            accessToken,
          }
        }, () => {
          app.innerHTML = ''

          app.id = 'kelyst-root-chrome-extension';

          if (body) body.prepend(app);

          app.classList.add('animate__animated', 'show-kelyst')
          app.classList.remove('hide-kelyst')

          ReactDOM.render(<Sync board={board} customer={customer}/>, document.getElementById('kelyst-root-chrome-extension'));
        })


      }
    }

  } catch (e) {
    console.error('$kelyst error : ', e)
  }
  // console.log('Sync in progress')
  // console.log('kelyst-chrome-extension-id', chrome.runtime.id)
  // window.open('https://www.kelyst.com/en/signup/', '_blank')
}

const onClick = async (request, sender, sendResponse) => {
    console.log('RECEIVE ONCLICK')
    chrome.runtime.onMessage.removeListener(dispatch)

    const { board, customer } = request.payload

    console.log('isAppMount : ', window.isAppMount)

    // const body = document.body;
    //
    // const app = document.getElementById('kelyst-root-chrome-extension') || document.createElement('div');

    if (window.isAppMount) {
      app.classList.add('animate__animated', 'hide-kelyst')
      app.classList.remove('show-kelyst')
      window.isAppMount = false
      setTimeout(() => {
        app.innerHTML = ''
      }, 1200)
    } else {

      // const instanceWithParsingData = await withParsingData()
      // // const instanceWithoutParsingData = await withoutParsingData()
      // console.log({
      //   instanceWithParsingData,
      //   // instanceWithoutParsingData,
      // })
      // TODO REMOVE FOR TRY
      app.innerHTML = ''

      app.id = 'kelyst-root-chrome-extension';

      if (body) body.prepend(app);

      app.classList.add('animate__animated', 'show-kelyst')
      app.classList.remove('hide-kelyst')

      ReactDOM.render(<App board={board} customer={customer}/>, document.getElementById('kelyst-root-chrome-extension'));
      window.isAppMount = true
    }

}

// OLD
// onClick()

const messagesFn = {
  onClick,
  onSync,
}


const dispatch = (request, sender, sendResponse) => {
  // console.log('onMessage : ', request.action)
  typeof messagesFn[request.action] === 'function'
    ? messagesFn[request.action](request, sender, sendResponse)
    : console.log('onMessage no function bind: ', {
      request,
      sender,
      sendResponse
    })
}

chrome.runtime.onMessage.addListener(dispatch)
registerServiceWorker();
