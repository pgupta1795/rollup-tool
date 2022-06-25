const https = require('https')
const axios = require('axios')

const api = axios.create({
  withCredentials: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
})

const searchobjects = async (req, res) => {
  try {
    const { body } = req
    const { headers, BASE_URL, GET_ENDPOINT } = body

    const response = await api.get(BASE_URL + GET_ENDPOINT, {
      headers,
    })
    res.json({ status: response.status, data: response.data })
  } catch (err) {
    console.error(err)
    res.json({ status: 500, message: err, data: {} })
  }
}

const getObjectDetails = async (
  id,
  BASE_URL,
  GET_ENDPOINT,
  CHILD_ENDPOINT,
  headers
) => {
  const objectData = { data: {}, children: [] }
  try {
    const url = BASE_URL + GET_ENDPOINT.replace('{}', id)
    const { data, status } = await api.get(url, {
      headers,
    })
    if (status === 200 && data?.totalItems > 0) {
      objectData.data = data
      // eslint-disable-next-line no-use-before-define
      const children = await fetchChildren(
        id,
        BASE_URL,
        GET_ENDPOINT,
        CHILD_ENDPOINT,
        headers
      )
      objectData.children = children
    }
  } catch (error) {
    console.log(`Error in getObjectDetails function : ${error}`)
  }
  return objectData
}

const fetchChildren = async (
  id,
  BASE_URL,
  GET_ENDPOINT,
  CHILD_ENDPOINT,
  headers
) => {
  const children = []
  try {
    const url = BASE_URL + CHILD_ENDPOINT.replace('{}', id)
    const { data, status } = await api.get(url, {
      headers,
    })

    if (status === 200 && data?.totalItems > 0) {
      const { member } = data
      await Promise.all(
        member.map(async ({ referencedObject: { id: childId } }) => {
          const objDetails = await getObjectDetails(
            childId,
            BASE_URL,
            GET_ENDPOINT,
            CHILD_ENDPOINT,
            headers
          )
          children.push(objDetails)
        })
      )
    }
  } catch (error) {
    console.log(`Error in fetchChildren function : ${error}`)
  }
  return children
}

const getAllChildren = async (req, res) => {
  try {
    const {
      body: { ID, BASE_URL, GET_ENDPOINT, CHILD_ENDPOINT, headers },
    } = req
    if (ID && BASE_URL && GET_ENDPOINT && CHILD_ENDPOINT && headers) {
      const objectData = await getObjectDetails(
        ID,
        BASE_URL,
        GET_ENDPOINT,
        CHILD_ENDPOINT,
        headers
      )
      res.json({ status: 200, data: objectData })
    }
  } catch (error) {
    console.error(error)
    res.json({ status: 500 })
  }
}

const updateObject = async (req, res) => {
  try {
    const { body } = req
    const { headers, URL, payload } = body

    const response = await api.patch(URL, payload, {
      headers,
    })
    res.json({ status: response.status, data: response.data })
  } catch (err) {
    console.error(err)
    res.json({ status: 500 })
  }
}

module.exports = { searchobjects, getAllChildren, updateObject }
