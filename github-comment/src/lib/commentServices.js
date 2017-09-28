
export const getComments = (url) => {
  return fetch(url)
    .then(res => res.json())
}

export const createComment = (url, name) => {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({})
  }).then(res => res.json())
}

export const getLoginStatus = (url) => {
  console.log(url);
  return fetch(url, {
    method: "POST",
    credentials: 'include'
  }).then(res => res.json())
}
