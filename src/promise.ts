import type { Fn } from './types'

/**
 * 睡眠
 * @param ms - 毫秒数
 * @param callback - 回调函数
 */
export function sleep(ms: number, callback?: Fn<any>): Promise<void> {
  return new Promise<void>(resolve =>
    setTimeout(async () => {
      callback && await callback()
      resolve()
    }, ms),
  )
}

/**
 * 动态加载JS文件
 * @param urls - JS文件地址
 * @param done - 加载完成回调
 * @example
 * loadJS(["test1.js", "test2.js"], () => {
 *    // 用户的回调逻辑
 * });
 */
export function loadJs(urls: string[], done: Fn<any>) {
  // 获取head标签
  const head = document.getElementsByTagName('head')[0]
  Promise.all(urls.map((url) => {
    return new Promise((resolve) => {
      // 创建script标签并添加到head
      const s = document.createElement('script')
      s.type = 'text/javascript'
      s.async = true
      s.src = url

      // 监听load事件，如果加载完成则resolve
      s.addEventListener('load', e => resolve(e), false)
      head.appendChild(s)
    })
  })).then(done)
}
