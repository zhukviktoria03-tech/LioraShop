import { buildConfig } from 'payload/config'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { slateEditor } from '@payloadcms/richtext-slate'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import path from 'path'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Products } from './collections/Products'
import { Pages } from './collections/Pages'

import { pageBySlugHandler } from './endpoints/pageBySlug'
import { bestsellersHandler } from './endpoints/bestsellers'
import { commonHandler } from './endpoints/common'

const allowedCors = (process.env.CORS_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  admin: {
  user: Users.slug,
  bundler: webpackBundler(),
},
  collections: [Users, Media, Products, Pages],
  editor: slateEditor({}),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    disable: true,
  },
  cors: allowedCors,
  csrf: allowedCors,
db: mongooseAdapter({
  url: process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/liora',
}),  endpoints: [
    {
      path: '/page-by-slug/:slug',
      method: 'get',
      handler: pageBySlugHandler,
    },
    {
      path: '/bestsellers',
      method: 'get',
      handler: bestsellersHandler,
    },
    {
      path: '/common',
      method: 'get',
      handler: commonHandler,
    },
  ],
})