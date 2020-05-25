import getScrollPosition from './getScrollPosition';
import getScrollMaxPosition from './getScrollMaxPosition';



export default () => new Promise((resolve, reject) => {
  const scrollPosition = getScrollPosition()
  const scrollMaxPosition = getScrollMaxPosition()

  window.scrollTo(...scrollMaxPosition);

  setTimeout(() => {
    resolve()
  }, 1000)
  // window.scrollTo(...scrollPosition);
})
