export default function api(url, method, headers = {}, body = {}) {
  return new Promise((resolve, reject) => {
    if (method === "GET") {
      fetch(url)
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
          console.log("Network error", err);
        })
    } else {
      fetch(url, { method, headers, body: JSON.stringify(body) })
        .then(response => response.json())
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          reject(err);
          console.log("Network error", err);
        })
    }
  })
}