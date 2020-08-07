const init = require("./init")

exports.getFiles = tenant => {
   return new Promise(async (resolve, reject) => {
      init.bucket.getFiles(function(err, files) {
         if (err) {
            console.error('storage', 'getFiles', err)
            reject({ error: true, message: err })
         }
         let response = []
         files.map(file => {
            if (file.name.startsWith(tenant)) {
               response.push({
                  name: file.name,
                  contentType: file.metadata.contentType,
                  url: 'https://storage.googleapis.com/' + file.metadata.bucket + '/' + file.name
               })
            }
         })
         resolve(response)
      })
   })
}

exports.getFile = (file) => {
   return new Promise(async (resolve, reject) => {
      await init.bucket.file(file).get(function(err, file, apiResponse) {
         if (err) {
            console.error('storage', 'getFile', err)
            reject({ error: true, message: err })
         }
         resolve({  file, apiResponse })
      })
   })
}

exports.uploadFile = (tenant, name, options = {}, file) => {
   return new Promise(async (resolve, reject) => {
      if (options.metadata.contentType.startsWith('image')) {
         options.predefinedAcl = 'publicRead'
         options.public = true
      } else {
         options.predefinedAcl = 'authenticatedRead'
      }
      options.destination = tenant + '/' + name
      await init.bucket.upload(file, options, function(err) {
         if (err) {
            console.error('storage', 'uploadFile', err)
            reject({ error: true, message: err })
         }
         resolve(true)
      })
   })
}

exports.deleteFile = (file) => {
   console.log('file', file)
   return new Promise(async (resolve, reject) => {
      await init.bucket.file(file).delete(function(err, apiResponse) {
         if (err) {
            console.error('storage', 'deleteFile', err)
            reject({ error: true, message: err })
         }
         resolve({  apiResponse })
      })
   })
}

