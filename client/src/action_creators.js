// 创建评论
export function createComment(text) {
  return {
    type: 'CREATE_COMMENT',
    text
  }
}

// 请求用户鉴权
export function authRequest() {
  return {
    type: 'AUTH_REQUEST'
  }
}

// 尝试登陆
export function tryLogin() {
  return {
    type: 'TRY_LOGIN'
  }
}

// 加载评论
export function loadComments(){
  return {
    type: "LOAD_COMMENTSE",
    user_name,
    repo,
    page_id
  }
}
