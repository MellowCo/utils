/**
 * HTTP 状态码
 */
export const enum HTTP_STATUS {

  /**
   * HTTP Status-Code 200: OK(正常).
   */
  OK = 200,

  /**
   * HTTP Status-Code 201: Created(201：已创建).
   */
  CREATED = 201,

  /**
   * HTTP Status-Code 202: Accepted(已接受).
   */
  ACCEPTED = 202,

  /**
   * HTTP Status-Code 203: Non-Authoritative Information(非权威信息).
   */
  NOT_AUTHORITATIVE = 203,

  /**
   * HTTP Status-Code 204: No Content(无内容).
   */
  NO_CONTENT = 204,

  /**
   * HTTP Status-Code 205: Reset Content(重置内容).
   */
  RESET = 205,

  /**
   * HTTP Status-Code 206: Partial Content(部分内容).
   */
  PARTIAL = 206,

  /* 3XX: relocation/redirect(搬迁/重定向) */

  /**
 * HTTP Status-Code 300: Multiple Choices(多项选择).
 */
  MULT_CHOICE = 300,

  /**
 * HTTP Status-Code 301: Moved Permanently(永久移动).
 */
  MOVED_PERM = 301,

  /**
 * HTTP Status-Code 302: Temporary Redirect(临时重定向).
 */
  MOVED_TEMP = 302,

  /**
 * HTTP Status-Code 303: See Other(请参阅其他).
 */
  SEE_OTHER = 303,

  /**
 * HTTP Status-Code 304: Not Modified(未修改).
 */
  NOT_MODIFIED = 304,

  /**
 * HTTP Status-Code 305: Use Proxy(使用代理).
 */
  USE_PROXY = 305,

  /* 4XX: client error (客户端错误) */

  /**
 * HTTP Status-Code 400: Bad Request(错误请求).
 */
  BAD_REQUEST = 400,

  /**
 * HTTP Status-Code 401: Unauthorized(未经授权).
 */
  UNAUTHORIZED = 401,

  /**
 * HTTP Status-Code 402: Payment Required(需要付款).
 */
  PAYMENT_REQUIRED = 402,

  /**
 * HTTP Status-Code 403: Forbidden(禁止访问).
 */
  FORBIDDEN = 403,

  /**
 * HTTP Status-Code 404: Not Found(未找到).
 */
  NOT_FOUND = 404,

  /**
 * HTTP Status-Code 405: Method Not Allowed(方法不允许).
 */
  BAD_METHOD = 405,

  /**
 * HTTP Status-Code 406: Not Acceptable(不可接受).
 */
  NOT_ACCEPTABLE = 406,

  /**
 * HTTP Status-Code 407: Proxy Authentication Required(需要代理身份验证).
 */
  PROXY_AUTH = 407,

  /**
 * HTTP Status-Code 408: Request Time-Out(请求超时).
 */
  CLIENT_TIMEOUT = 408,

  /**
 * HTTP Status-Code 409: Conflict(冲突).
 */
  CONFLICT = 409,

  /**
 * HTTP Status-Code 410: Gone(消失).
 */
  GONE = 410,

  /**
 * HTTP Status-Code 411: Length Required(需要长度).
 */
  LENGTH_REQUIRED = 411,

  /**
 * HTTP Status-Code 412: Precondition Failed(前提条件失败).
 */
  PRECON_FAILED = 412,

  /**
 * HTTP Status-Code 413: Request Entity Too Large(请求实体太大).
 */
  ENTITY_TOO_LARGE = 413,

  /**
 * HTTP Status-Code 414: Request-URI Too Large(请求 URI 太大).
 */
  REQ_TOO_LONG = 414,

  /**
 * HTTP Status-Code 415: Unsupported Media Type(不支持的媒体类型).
 */
  UNSUPPORTED_TYPE = 415,

  /* 5XX: server error */

  /**
 * HTTP Status-Code 500: Internal Server Error(内部服务器错误).
 */
  INTERNAL_ERROR = 500,

  /**
 * HTTP Status-Code 501: Not Implemented(未实现).
 */
  NOT_IMPLEMENTED = 501,

  /**
 * HTTP Status-Code 502: Bad Gateway(网关错误).
 */
  BAD_GATEWAY = 502,

  /**
 * HTTP Status-Code 503: Service Unavailable(服务不可用).
 */
  UNAVAILABLE = 503,

  /**
 * HTTP Status-Code 504: Gateway Timeout(网关超时).
 */
  GATEWAY_TIMEOUT = 504,

  /**
 * HTTP Status-Code 505: HTTP Version Not Supported(不支持 HTTP 版本).
 */
  VERSION = 505,
}

