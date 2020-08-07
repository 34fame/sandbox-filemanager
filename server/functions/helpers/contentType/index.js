let types = require('./types')

function type(filename) {
   let dot = filename.lastIndexOf('.')
   if (dot < -1) {
      throw Error('Invalid file name')
   }
   let suffix = filename.substr(dot + 1)
   let contentType = types[suffix]
   if (contentType == null) {
      return 'text/plain'
   }
   return contentType
}

module.exports = type
