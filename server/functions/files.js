const bucket = require("./api/firebase/storage")
const contentType = require("./helpers/contentType")

exports.getFiles = async tenant => {
   return await bucket.getFiles(tenant)
   .then(result => {
      return result
   })
   .catch(err => {
      console.error(err)
      return false
   })
}

exports.getFile = async (tenant, file) => {
   const filePath = tenant + '/' + file
   return await bucket.getFile(file)
      .then(result => {
         return result
      })
      .catch(err => {
         console.error(err)
         return false
      })
}

exports.upload = async (tenant, name, file) => {
   let type = contentType(name)
   let options = { metadata: { contentType: type }}
   const filePath = tenant + '/' + file
   return await bucket.uploadFile(tenant, name, options, file)
      .then(result => {
         return result
      })
      .catch(err => {
         console.error('files-upload', err)
         return false
      })
}

exports.deleteFile = async (tenant, file) => {
   const filePath = tenant + '/' + file
   return await bucket.deleteFile(filePath)
      .then(result => {
         return result
      })
      .catch(err => {
         console.error(err)
         return false
      })
}
