/* eslint-disable no-undef */
function search(query: string, callback: ((value: any) => any)) {
  return fetch(`memo/${query}`, {
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
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response: Response) {
  return response.json();
}

const Client = { search };
export default Client;
