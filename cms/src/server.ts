import express from 'express'
import payload from 'payload'
import dotenv from 'dotenv'
import { existsSync } from 'fs'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

const app = express()
const PORT = process.env.PORT || 3000

if (!process.env.PAYLOAD_CONFIG_PATH) {
  const configPath = ['payload.config.js', 'payload.config.ts']
    .map((fileName) => path.resolve(__dirname, fileName))
    .find(existsSync)

  if (configPath) {
    process.env.PAYLOAD_CONFIG_PATH = configPath
  }
}

const start = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || 'liora_default_secret_key_change_in_production',
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  app.listen(PORT, async () => {
    payload.logger.info(`Payload CMS server listening on port ${PORT}`)
  })
}

start()
