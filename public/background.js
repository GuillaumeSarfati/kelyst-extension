// "content_scripts": [
//   {
//     "matches": ["<all_urls>"],
//     "css": ["/static/css/main.css"],
//     "js": ["/static/js/main.js"]
//   }
// ],

let animatingIcon;

console.log('KELYST | background.js');

chrome.storage.sync.get(['board', 'customer', 'accessToken'], async ({board, customer, accessToken}) => {
  console.log('board: ', board)
  console.log('customer: ', customer)
  console.log('accessToken: ', accessToken)
  if (!board || !customer || !accessToken) {
    startAnimatingIcon()
  }
})

chrome.browserAction.onClicked.addListener(function(tab) {
  try {

    chrome.tabs.insertCSS({
      file: '/static/css/main.css'
    });
    chrome.tabs.executeScript({
      file: '/static/js/main.js'
    });
  } catch (e) {
    console.log('error : ', e)
  }

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    console.log('active tab : ', activeTab)
    chrome.storage.sync.get(['board', 'customer', 'accessToken'], async ({board, customer, accessToken}) => {
      if (activeTab.url.match(/kelyst.com/)) {
        console.log('SEND ONSYNC MESSAGE')
        chrome.tabs.sendMessage(activeTab.id, {"action": "onSync"});
      }
      else if (board && customer && accessToken) {
        console.log('SEND ONCLICK MESSAGE')
        chrome.tabs.sendMessage(activeTab.id, {"action": "onClick", payload: {
          board,
          customer,
        }});
      }
      else {
        console.log('CREATE SIGNUP TAB')
        chrome.tabs.create({url: 'https://www.kelyst.com/en/signup/'});
      }
    });
  });
});

startAnimatingIcon = (request, sender, sendResponse) => {
  let path = "icon-large-pink-k.png"

  animatingIcon = setInterval(() => {
    if (path === "icon-large-pink-k.png") path = "icon-large-transparent-k.png"
    else path = "icon-large-pink-k.png"

    chrome.browserAction.setIcon({ path });
  }, 500)
}

stopAnimatingIcon = (request, sender, sendResponse) => {
  let path = "icon-large-pink-k.png"

  clearInterval(animatingIcon)
  animatingIcon = null
  chrome.browserAction.setIcon({ path });
}


login = (request, sender, sendResponse) => {
  stopAnimatingIcon()

  console.log('login : ', request.payload)
  chrome.storage.sync.set(request.payload, function(e, y) {
    console.log('callback', { e, y })
    sendResponse({success: true})
  });
}

sync = async (request, sender, sendResponse) => {
  console.log('sync: ', { request, sender, sendResponse })
  login(request, sender, sendResponse)
}

card = async (request, sender, sendResponse) => {
  chrome.storage.sync.get(['board', 'customer', 'accessToken'], async ({board, customer, accessToken}) => {
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

const messagesExternalFn = {
  login,
}

chrome.runtime.onMessageExternal.addListener((request, sender, sendResponse) => {
  console.log(`call external ${request.action}`, {
    request,
    sender,
    sendResponse
  })

  if (typeof messagesExternalFn[request.action] === 'function') messagesExternalFn[request.action](request, sender, sendResponse)
});
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(`call internal ${request.action}`, {
    request,
    sender,
    sendResponse
  })

  if (typeof messagesFn[request.action] === 'function') messagesFn[request.action](request, sender, sendResponse)
})
