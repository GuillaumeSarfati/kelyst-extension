export default (path) => {
  let xpathResult = null;
  let str = '';
  let nodeCount = 0;
  let it;
  try {
    xpathResult = document.evaluate(
      path,
      document,
      null,
      XPathResult.ANY_TYPE,
      null
    );
  } catch (e) {
    str = '[INVALID XPATH EXPRESSION]';
    nodeCount = 0;
  }

  if (!xpathResult) {
    return [str, nodeCount];
  }
  if (xpathResult.resultType === XPathResult.BOOLEAN_TYPE) {
    str = xpathResult.booleanValue ? '1' : '0';
    nodeCount = 1;
  } else if (xpathResult.resultType === XPathResult.NUMBER_TYPE) {
    str = xpathResult.numberValue.toString();
    nodeCount = 1;
  } else if (xpathResult.resultType === XPathResult.STRING_TYPE) {
    str = xpathResult.stringValue;
    nodeCount = 1;
  } else if (xpathResult.resultType === XPathResult.UNORDERED_NODE_ITERATOR_TYPE) {
    for (it = xpathResult.iterateNext(); it;
         it = xpathResult.iterateNext()) {
      if (str) {
        str += '\n';
      }
      str += it.textContent;
      nodeCount++;
    }
    if (nodeCount === 0) {
      str = '';
    }
  } else {
    // Since we pass XPathResult.ANY_TYPE to document.evaluate(), we should
    // never get back a result type not handled above.
    str = '[INTERNAL ERROR]';
    nodeCount = 0;
  }

  console.log('getElementByXpath : ', {path, str, nodeCount});
  // const value = document.evaluate(path, document, null, XPathResult.ANY_TYPE, null)
  // const query = value.iterateNext()
  // console.log('getElementByXpath', {path, value, query})
  return { str, path, it, nodeCount }
}
