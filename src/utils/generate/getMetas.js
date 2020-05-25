export default () => {
  const metas = {}
  const metastmp = document.getElementsByTagName('meta')

  for (let i = 0; i < metastmp.length; i++) {
    const name = metastmp[i].getAttribute('name')
    const content = metastmp[i].getAttribute('content')
    if (name && content) metas[name] = content
  }

  return metas
}
