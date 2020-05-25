// /*global browser*/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Sync from './Sync';
import registerServiceWorker from './registerServiceWorker';
import withoutParsingData from './utils/generate/withoutParsingData';
import withParsingData from './utils/generate/withParsingData';
import './index.css';

const body = document.body;

const app = document.getElementById('kelyst-root-browser-extension') || document.createElement('div');

const onSync = () => {
  console.log('RECEIVE ONSYNC')
  browser.runtime.onMessage.removeListener(dispatch)

  try {

    if (window.location.hostname.match(/kelyst.com$/)) {
      const customer = JSON.parse(localStorage.getItem('customer'))
      const board = JSON.parse(localStorage.getItem('board'))
      const accessToken = JSON.parse(localStorage.getItem('accessToken'))

      if (customer && board && accessToken) {
        browser.runtime.sendMessage({
          action: 'sync',
          payload: {
            customer,
            board,
            accessToken,
          }
        }).then(() => {
          app.innerHTML = ''

          app.id = 'kelyst-root-browser-extension';

          if (body) body.prepend(app);

          app.classList.add('animate__animated', 'show-kelyst')
          app.classList.remove('hide-kelyst')

          ReactDOM.render(<Sync board={board} customer={customer}/>, document.getElementById('kelyst-root-browser-extension'));
        })


      }
    }

  } catch (e) {
    console.error('$kelyst error : ', e)
  }
}

const onClick = async (request, sender, sendResponse) => {
    console.log('RECEIVE ONCLICK')
    browser.runtime.onMessage.removeListener(dispatch)

    const { board, customer } = request.payload

    if (window.isAppMount) {
      app.classList.add('animate__animated', 'hide-kelyst')
      app.classList.remove('show-kelyst')
      window.isAppMount = false
      setTimeout(() => {
        app.innerHTML = ''
      }, 1200)
    } else {

      app.innerHTML = ''

      app.id = 'kelyst-root-browser-extension';

      if (body) body.prepend(app);

      app.classList.add('animate__animated', 'show-kelyst')
      app.classList.remove('hide-kelyst')

      ReactDOM.render(<App board={board} customer={customer}/>, document.getElementById('kelyst-root-browser-extension'));
      window.isAppMount = true
    }

}

const messagesFn = {
  onClick,
  onSync,
}


const dispatch = (request, sender, sendResponse) => {
  typeof messagesFn[request.action] === 'function'
    ? messagesFn[request.action](request, sender, sendResponse)
    : console.log('onMessage no function bind: ', {
      request,
      sender,
      sendResponse
    })
}

browser.runtime.onMessage.addListener(dispatch)
registerServiceWorker();
