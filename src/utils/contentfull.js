//import contentful from 'contentful'
// const contentful = require('contentful')

// export const contentfulClient = contentful.createClient({
//     space: 'iqi2j3u1fbh6',
//     environment: 'master',
//     accessToken: 'mYvv9rUKyscHXLb4kCjKukDrgeKNJS__fmE2e2lVYP8'
// })

import { createClient } from 'contentful'
const contentful = require('contentful-management')

export const contentfulClient = createClient({
    space: process.env.CONTENTFUL_SPACE,
    environment: process.env.CONTENTFUL_ENVIOREMENT,
    accessToken: process.env.CONTENTFUL_ACCESSTOKEN
})



const contentfulClientManagement = contentful.createClient(
    {
        accessToken: process.env.CONTENTFULL_PERSONAL_ACCESS_TOKEN
    },
)
const space = await contentfulClientManagement.getSpace(process.env.CONTENTFUL_SPACE)
const environment = await space.getEnvironment('master')

export { contentfulClientManagement, space, environment }