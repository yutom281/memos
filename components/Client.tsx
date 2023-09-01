function search(query: string, callback: ((value: any) => any)) {
  return fetch(`/memos/${query}`, {
    headers: {
      Accept: "application/json"
    }
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(callback);
}

function checkStatus(response: Response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.message = response.statusText;
  console.log(error);
  throw error;
}

function parseJSON(response: Response) {
  return response.json();
}

const Client = { search };
export default Client;
