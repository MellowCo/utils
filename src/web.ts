import type { AnyFn } from './types'

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

interface Options {
  /**
   * 轮询时间(毫秒) 默认10000 每10秒检查一次
   * @default 10000
   */
  ms?: number
}

/**
 * 检查页面是否更新
 * @param options - 配置项
 * @example
 * const updater = new Updater({
 *  timer: 10000
 * })
 *
 * updater.on('no-update', () => {
 *  console.log('no update')
 * })
 *
 * updater.on('update', () => {
 *  console.log('update')
 * })
 */
export class Updater {
  oldScript: string[] // 存储第一次值也就是script 的hash 信息
  newScript: string[] // 获取新的值 也就是新的script 的hash信息
  dispatch: Record<string, AnyFn[]> // 小型发布订阅通知用户更新了
  constructor(options: Options) {
    this.oldScript = []
    this.newScript = []
    this.dispatch = {}
    this.init() // 初始化
    this.timing(options?.ms)// 轮询
  }

  async init() {
    const html: string = await this.getHtml()
    this.oldScript = this.parserScript(html)
  }

  async getHtml() {
    const html = await fetch('/').then(res => res.text())// 读取index html
    return html
  }

  parserScript(html: string) {
    const reg = new RegExp(/<script(?:\s+[^>]*)?>(.*?)<\/script\s*>/ig) // script正则
    return html.match(reg) as string[] // 匹配script标签
  }

  // 发布订阅通知
  on(key: 'no-update' | 'update', fn: AnyFn) {
    (this.dispatch[key] || (this.dispatch[key] = [])).push(fn)
    return this
  }

  compare(oldArr: string[], newArr: string[]) {
    const base = oldArr.length
    const arr = Array.from(new Set(oldArr.concat(newArr)))
    // 如果新旧length 一样无更新
    if (arr.length === base) {
      this.dispatch['no-update'].forEach((fn) => {
        fn()
      })
    }
    else {
      // 否则通知更新
      this.dispatch.update.forEach((fn) => {
        fn()
      })
    }
  }

  timing(time = 10 * 1000) {
    // 轮询
    setInterval(async () => {
      const newHtml = await this.getHtml()
      this.newScript = this.parserScript(newHtml)
      this.compare(this.oldScript, this.newScript)
    }, time)
  }
}
