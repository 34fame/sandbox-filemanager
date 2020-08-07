const admin = require("firebase-admin")
const serviceAccount = require("../../service-account.json")
admin.initializeApp({
   credential: admin.credential.cert(serviceAccount),
   databaseURL: "https://file-manager-f2f88.firebaseio.com",
})
exports.fs = admin.firestore()
exports.bucket = admin.storage().bucket('file-manager-f2f88.appspot.com')
exports.auth = admin.auth()
