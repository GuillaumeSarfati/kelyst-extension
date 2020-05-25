import getImage from './getImage';
import getMetas from './getMetas';
import getNote from './getNote';
import getUrl from './getUrl';

export default () => {
  // TODO Use getMetas() maybe
  const metas = getMetas()
  const url = getUrl()
  const note = getNote()
  const image = getImage()

  return {
    url,
    image,
    note,
  }
}
