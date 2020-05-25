// "content_scripts": [
//   {
//     "matches": ["<all_urls>"],
//     "css": ["/static/css/main.css"],
//     "js": ["/static/js/main.js"]
//   }
// ],

let animatingIcon;

console.log('KELYST | background.js');

browser.storage.local
.get(['board', 'customer', 'accessToken'])
.then(async ({board, customer, accessToken}) => {
  console.log('board: ', board)
  console.log('customer: ', customer)
  console.log('accessToken: ', accessToken)
  if (!board || !customer || !accessToken) {
    startAnimatingIcon()
  }
})

browser.browserAction.onClicked.addListener(function(tab) {
  try {

    browser.tabs.insertCSS({
      file: '/static/css/main.css'
    });
    browser.tabs.executeScript({file: "browser-polyfill.js"});
    browser.tabs.executeScript({
      file: '/static/js/main.js'
    });
  } catch (e) {
    console.log('error : ', e)
  }

  browser.tabs
  .query({active: true, currentWindow: true})
  .then((tabs) => {
    var activeTab = tabs[0];
    console.log('active tab : ', activeTab)
    browser.storage.local
    .get(['board', 'customer', 'accessToken'])
    .then(async ({board, customer, accessToken}) => {
      if (activeTab.url.match(/kelyst.com/)) {
        console.log('SEND ONSYNC MESSAGE')
        browser.tabs.sendMessage(activeTab.id, {"action": "onSync"});
      }
      else if (board && customer && accessToken) {
        console.log('SEND ONCLICK MESSAGE')
        browser.tabs.sendMessage(activeTab.id, {"action": "onClick", payload: {
          board,
          customer,
        }});
      }
      else {
        console.log('CREATE SIGNUP TAB')
        browser.tabs.create({url: 'https://www.kelyst.com/en/signup/'});
      }
    });
  });
});

startAnimatingIcon = (request, sender, sendResponse) => {
  let path = "icon-large-pink-k.png"

  animatingIcon = setInterval(() => {
    if (path === "icon-large-pink-k.png") path = "icon-large-transparent-k.png"
    else path = "icon-large-pink-k.png"

    browser.browserAction.setIcon({ path });
  }, 500)
}

stopAnimatingIcon = (request, sender, sendResponse) => {
  let path = "icon-large-pink-k.png"

  clearInterval(animatingIcon)
  animatingIcon = null
  browser.browserAction.setIcon({ path });
}



sync = async (request, sender, sendResponse) => {
  // console.log('sync: ', { request, sender, sendResponse })
  stopAnimatingIcon()

  browser.storage.local
  .set(request.payload)
  .then((e, y) => {
    console.log('callback', { e, y })
    sendResponse({success: true})
  });
}

card = async (request, sender, sendResponse) => {
  browser.storage.local
  .get(['board', 'customer', 'accessToken'])
  .then(async ({board, customer, accessToken}) => {
    const { card } = request.payload;

    console.log('card before post: ', JSON.stringify({
      ...card,
      boardId: board.id,
      ownerId: customer.id,
    }))
    const response = await fetch(`https://api.kelyst.com/api/Cards`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...card,
        boardId: board.id,
        ownerId: customer.id,
      })
    })

    sendResponse(response)
  })
}
// HASHMAP MESSAGES FUNCTIONS
const messagesFn = {
  startAnimatingIcon,
  stopAnimatingIcon,
  sync,
  card,
}

browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(`call internal ${request.action}`, {
    request,
    sender,
    sendResponse
  })

  if (typeof messagesFn[request.action] === 'function') messagesFn[request.action](request, sender, sendResponse)
})
