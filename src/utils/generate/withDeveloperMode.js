import clickElementByXpath from './clickElementByXpath';
import getElementByXpath from './getElementByXpath';

export default async () => {}
// {
//   class Parser {
//     constructor() {
//       this.price = localStorage.getItem('kelyst:parser:price') || undefined
//       this.address = localStorage.getItem('kelyst:parser:address') || undefined
//       this.image = localStorage.getItem('kelyst:parser:image') || undefined
//       this.size = localStorage.getItem('kelyst:parser:size') || undefined
//       this.contact = localStorage.getItem('kelyst:parser:contact') || undefined
//       this.note = localStorage.getItem('kelyst:parser:note') || undefined
//     }
//     // get price() { return localStorage.getItem('kelyst:parser:price') || this._price }
//     // get address() { return localStorage.getItem('kelyst:parser:address') || this._address }
//     // get image() { return localStorage.getItem('kelyst:parser:image') || this._image }
//     // get size() { return localStorage.getItem('kelyst:parser:size') || this._size }
//     // get contact() { return localStorage.getItem('kelyst:parser:contact') || this._contact }
//     // get note() { return localStorage.getItem('kelyst:parser:note') || this._note }
//     //
//     // set price(value) { this._price = value; localStorage.setItem('kelyst:parser:price', value) }
//     // set address(value) { this._address = value; localStorage.setItem('kelyst:parser:address', value) }
//     // set image(value) { this._image = value; localStorage.setItem('kelyst:parser:image', value) }
//     // set size(value) { this._size = value; localStorage.setItem('kelyst:parser:size', value) }
//     // set contact(value) { this._contact = value; localStorage.setItem('kelyst:parser:contact', value) }
//     // set note(value) { this._note = value; localStorage.setItem('kelyst:parser:note', value) }
//
//     toString() {
//       return JSON.stringify({
//         price: this.price,
//         address: this.address,
//         image: this.image,
//         size: this.size,
//         contact: this.contact,
//       })
//     }
//   }
//   // console.log('create new parser')
//   const parser = new Parser()
//   // console.log('parser : ', parser.toString())
//
//   const properties = Object.keys(parser)
//   const instance = {}
//
//   for (let y = 0; y < properties.length; y++) {
//     try {
//       const path = parser[properties[y]];
//
//       if (path && typeof path === 'string') {
//         instance[properties[y]] = this.getElementByXpath(path).textContent
//       }
//       else if (path && typeof path.click === 'string') {
//         await this.clickElementByXpath(path.click, 2000)
//         instance[properties[y]] = this.getElementByXpath(path.data).textContent.replace(/\s\s+/g, ' ').replace(/(\r\n|\n|\r)/gm, " ")
//       }
//     } catch (e) {
//       console.error('[ generateCardInstanceDev ] error : ', e)
//     }
//   }
//   console.error('[ generateCardInstanceDev ] instance : ', instance)
//   return instance
//
// }
