import axiosInstance from "./api"

const getFetcher = (url: string) =>
  axiosInstance.get(url).then((res) => res.data)

const postFetcher = (url: string, body: any) =>
  axiosInstance.post(url, body).then((res) => res.data)

const putFetcher = (url: string, body: any) =>
  axiosInstance.put(url, body).then((res) => res.data)

const deleteFetcher = (url: string) => () =>
  axiosInstance.delete(url).then((res) => res.data)

const authenticatedGetFetcher = (url: string, token: string) => () =>
  axiosInstance
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)

const authenticatedPostFetcher = (url: string, token: string) => (body: any) =>
  axiosInstance
    .post(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)

const authenticatedPutFetcher = (url: string, token: string) => (body: any) =>
  axiosInstance
    .put(url, body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)

const authenticatedDeleteFetcher = (url: string, token: string) => () =>
  axiosInstance
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
