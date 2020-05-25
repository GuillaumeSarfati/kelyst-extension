import getElementByXpath from './getElementByXpath';

export default (path, time = 0) => new Promise((resolve, reject) => {
  const elem = document.evaluate(
    path,
    document,
    null,
    XPathResult.ANY_TYPE,
    null
  ).iterateNext()
  if (elem) {
    elem.click()
    setTimeout(() => {
      resolve()
    }, time)
  }
  else resolve()
})
