export default () => {

  const images = document.getElementsByTagName('img')

   let image = null
   for (let i = 0; i < images.length; i++) {
     if (!image) image = images[i]
     if ((image.clientWidth * image.clientHeight) < (images[i].clientWidth * images[i].clientHeight)) image = images[i]
   }

   return image.src
}
