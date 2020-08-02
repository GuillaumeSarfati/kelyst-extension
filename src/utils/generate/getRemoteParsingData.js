import axios from 'axios';

// GIST
export const url = "https://gist.githubusercontent.com/GuillaumeSarfati/756e915305346b04ba3bf1f619b64491/raw/parsing.json?date=" + new Date().getTime()

// export const url = "https://raw.githubusercontent.com/GuillaumeSarfati/kelyst-parsing/master/index.json?token=AETLFV7XGKQKXVH5A22I26C6YLKGI"


export default async () => {
  console.log('getRemoteParsingData')
  try {

    const parsingData = (await axios.get(url)).data
    console.log('parsingData : ', parsingData)
    return parsingData
  } catch (e) {
    console.log('[getRemoteParsingData] err : ', e)
  }

}
