/**
 * 下载文件
 * @param link - 文件链接
 * @param name - 文件名
 * @example downloadFile('http://www.baidu.com/img/bd_logo1.png', 'logo.png')
 */
export function download(link: string, name?: string) {
  if (!name)
    name = link.slice(link.lastIndexOf('/') + 1)

  const eleLink = document.createElement('a')
  eleLink.download = name
  eleLink.style.display = 'none'
  eleLink.href = link
  document.body.appendChild(eleLink)
  eleLink.click()
  document.body.removeChild(eleLink)
}

/**
 * 浏览器下载静态文件
 * @param name - 文件名
 * @param content - 文件内容 非Blob类型会自动转换
 * @example downloadFile('1.json','xxxxxxxxxxxx'))
 * @example downloadFile('1.json',new Blob([ data ]))
 */
export function downloadFile(name: string, content: any) {
  if (typeof name == 'undefined')
    throw new Error('The first parameter name is a must')

  if (typeof content == 'undefined')
    throw new Error('The second parameter content is a must')

  if (!(content instanceof Blob))
    content = new Blob([content])

  const link = URL.createObjectURL(content)
  download(link, name)
}

/**
 * 判断是否是移动端agent字符
 * @param agent - agent string
 * @returns true or false
 */
export function isMobileAgent(agent: string) {
  return /Android|webOS|iPhone|iPod|BlackBerry|Mobile/i.test(agent)
}

/**
 * 判断是否是移动端
 * @returns
 */
export function isMobile() {
  return isMobileAgent(navigator.userAgent)
}

/**
 * 刷新页面
 */
export function reload() {
  location.reload()
}

/**
 * 滚动到页面顶部
 */
export function goToTop() {
  window.scrollTo(0, 0)
}

/**
 * 跳转到其他页面
 */
export function goTo(url: string) {
  location.href = url
}

/**
 * 元素顺滑的滚动到可视区域的起点
 * @param element - 元素
 * @example scrollToTop(document.querySelector('#id'))
 */
export function scrollToTop(element: Element) {
  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/**
 * 元素顺滑的滚动到可视区域的终点
 * @param element - 元素
 * @example scrollToTop(document.querySelector('#id'))
 */
export function scrollToBottom(element: Element) {
  element.scrollIntoView({ behavior: 'smooth', block: 'end' })
}
