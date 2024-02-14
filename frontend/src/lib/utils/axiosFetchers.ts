import axios from "axios"

const getFetcher = (url: string) => () => axios.get(url).then((res) => res.data)

const postFetcher = (url: string) => (body: any) =>
  axios.post(url, body).then((res) => res.data)

const putFetcher = (url: string) => (body: any) =>
  axios.put(url, body).then((res) => res.data)

const deleteFetcher = (url: string) => () =>
  axios.delete(url).then((res) => res.data)

const authenticatedGetFetcher = (url: string, token: string) => () =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)

const authenticatedPostFetcher = (url: string, token: string) => (body: any) =>
  axios
    .post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)

const authenticatedPutFetcher = (url: string, token: string) => (body: any) =>
  axios
    .put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)

const authenticatedDeleteFetcher = (url: string, token: string) => () =>
  axios
    .delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)

export {
  getFetcher,
  postFetcher,
  putFetcher,
  deleteFetcher,
  authenticatedGetFetcher,
  authenticatedPostFetcher,
  authenticatedPutFetcher,
  authenticatedDeleteFetcher,
}
