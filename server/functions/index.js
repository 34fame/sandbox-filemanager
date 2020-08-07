const functions = require("firebase-functions")
const uid = require("tiny-uid")
const express = require("express")
const fs = require('fs')
const os = require('os')
const path = require('path')
const Busboy = require('busboy')

const db = require("./db")
const files = require("./files")

const folder = path.join(__dirname, 'uploads')
if (!fs.existsSync(folder)) {
   fs.mkdirSync(folder)
}

const app = express()
app.use(express.json())

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*")
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
   res.header("Access-Control-Allow-Methods", "*")
   next()
})


// Storage Calls
app.get("/files/:tenant", async (req, res) => {
   const tenant = req.params.tenant
   res.send(await files.getFiles(tenant))
})

app.get("/files/:tenant/:file", async (req, res) => {
   const file = req.params.file
   const tenant = req.params.tenant
   res.send(await files.getFile(tenant, file))
})

app.post("/files/:tenant/upload", async (req, res) => {
   const tenant = req.params.tenant
   const busboy = new Busboy({ headers: req.headers })
   const tmpdir = os.tmpdir()
   const fields = {}
   const uploads = {}

   busboy.on('field', (fieldname, val) => {
      console.log(`Processing field ${fieldname}: ${val}.`)
      fields[fieldname] = val
   })

   const fileWrites = []
   busboy.on('file', (fieldname, file, filename) => {
      console.log(`Processing file ${filename}`)
      const filepath = path.join(tmpdir, filename)
      uploads[fieldname] = filepath

      const writeStream = fs.createWriteStream(filepath)
      file.pipe(writeStream)

      const promise = new Promise((res, rej) => {
         file.on('end', () => {
            writeStream.end()
         })
         writeStream.on('finish', res)
         writeStream.on('error', rej)
      })
      fileWrites.push(promise)
   })

   busboy.on('finish', () => {
      let response = true
      Promise.all(fileWrites).then( async () => {
         let result
         for (const name in uploads) {
            const file = uploads[name]
            result = await files.upload(tenant, name, file)
            if (result.error) {
               response = false
               console.log(`Problem processing file ${file}`)
            } else {
               console.log(`Finish: Processed file ${file}`)
            }
            fs.unlinkSync(file)
         }
      })
      res.send(response)
   })

   busboy.end(req.rawBody)
})

app.delete("/files/:tenant/:file", async (req, res) => {
   const file = req.params.file
   const tenant = req.params.tenant
   res.send(await files.deleteFile(tenant, file))
})


// Database Calls
app.get("/db/:collection", async (req, res) => {
   const collection = req.params.collection
   res.send(await db.get({collection}))
})

app.get('/db/:collection/:collectionId', async (req, res) => {
   const collection = req.params.collection
   const collectionId = req.params.collectionId
   let item = await db.get({collection, collectionId})
   if (item) {
      res.send(item)
   } else {
      res.status(404).send('Item not found')
   }
})

app.post('/db/:collection', async (req, res) => {
   const collection = req.params.collection
   let item = req.body
   let collectionId = uid()
   item.id = collectionId
   item = await db.add({collection, collectionId, item})
   res.send(item)
})

app.put('/db/:collection/:collectionId', async (req, res) => {
   const collection = req.params.collection
   const collectionId = req.params.collectionId
   let updates = req.body
   item = await db.update({collection, collectionId, updates})
   if (item) {
      res.send(item)
   } else {
      res.status(400).send('Update failed')
   }
})

app.delete('/db/:collection/:collectionId', async (req, res) => {
   const collection = req.params.collection
   const collectionId = req.params.collectionId
   let result = await db.delete({collection, collectionId})
   if (result) {
      res.send(result)
   } else {
      res.status(400).send('Delete failed')
   }
})

exports.api = functions.https.onRequest(app)
