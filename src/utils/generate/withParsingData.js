import getHost from './getHost';
import getRemoteParsingData from './getRemoteParsingData';
import getElementByXpath from './getElementByXpath';
import withoutParsingData from './withoutParsingData';
import clickElementByXpath from './clickElementByXpath';

export default async () => {
  const host = await getHost()
  const parsing = await getRemoteParsingData()

  console.log('withParsingData : ', parsing)
  const instance = {}
  const hosts = Object.keys(parsing)
  let hostMatch = false
  for (let i = 0; i < hosts.length; i++) {
    if (host.match(hosts[i])) {
      hostMatch = true;
      // console.log('HostMatch')
      const properties = Object.keys(parsing[hosts[i]])
      // console.log('properties : ', properties)
      for (let y = 0; y < properties.length; y++) {
        const path = parsing[hosts[i]][properties[y]]

        try {
          if (typeof path === 'string') {
            // console.log('---------');
            // console.log(properties[y], getElementByXpath(path).str)
            instance[properties[y]] = getElementByXpath(path).str
            .replace(/\s\s+/g, ' ')
            .replace(/(\r\n|\n|\r)/gm, " ")

          }
          else if (typeof path.click === 'string') {

            await clickElementByXpath(path.click, 2000)

            instance[properties[y]] = getElementByXpath(path.data).str
            .replace(/\s\s+/g, ' ')
            .replace(/(\r\n|\n|\r)/gm, " ")

          }
        } catch (err) {
          console.log('[ KELYST ] err : ', err)
        }
      }
    }
  }

  return hostMatch
    ? instance
    : withoutParsingData()
}
