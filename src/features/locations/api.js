const apiURL = "https://5f3430949124200016e18826.mockapi.io/api/locations";

export function find() {
  return fetch(apiURL, {
    method: "GET",
  }).then((res) => res.json());
}

export function create({ location, description }) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("location", location);
  urlencoded.append("description", description);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  return fetch(apiURL, requestOptions).then((res) => res.json());
}

export function deleteItem({ id }) {
  const requestOptions = {
    method: "DELETE",
  };

  return fetch(`${apiURL}/${id}`, requestOptions).then((res) => res.json());
}
