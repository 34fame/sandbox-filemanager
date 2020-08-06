<template>
   <q-page padding>
      <!--Page Title-->
      <template><h4>File Manager</h4></template>

      <!--File List-->
      <template>
         <div class="q-ma-md row q-gutter-md items-center">
            <span class="text-h5">Files</span>
            <q-btn
               color="primary"
               :disable="loading.upload"
               round
               icon="refresh"
               @click="listFiles"
            />
            <q-btn
               color="primary"
               :disable="loading.upload"
               round
               icon="add"
               @click="uploader = true"
            />
         </div>
         <div class="q-pa-md">
            <div class="q-gutter-md row items-start">
               <q-img
                  v-for="file in files"
                  :key="file.name"
                  style="max-width: 256px;"
                  :src="handleImageUrl(file)"
                  :alt="file.name"
                  @click="handleDownload(file)"
               >
                  <div class="absolute-bottom text-subtitle1 text-center">
                     {{file.name|noTenant()}}
                  </div>
                  <div class="absolute-top-right">
                     <q-btn
                        color="negative"
                        dense
                        flat
                        :loading="loading.delete"
                        round
                        icon="delete_forever"
                        @click.stop="handleDelete(file.name)"
                     >
                        <q-tooltip>Permanent Delete</q-tooltip>
                     </q-btn>
                  </div>
               </q-img>
            </div>
         </div>
      </template>

      <!--Uploader Dialog-->
      <template>
         <q-dialog v-model="uploader">
            <q-card>
               <q-card-section>
                  <q-uploader
                     auto-upload
                     batch
                     hide-upload-btn
                     label="Upload Files"
                     multiple
                     :url="uploadUrl"
                     style="max-width: 500px"
                     @start="handleBeforeUpload"
                     @finish="handleAfterUpload"
                  />
               </q-card-section>
            </q-card>
         </q-dialog>
      </template>

   </q-page>
</template>

<script>
import { Notify } from 'quasar'

export default {
   data() {
      return {
         uploader: false,
         files: [],
         loading: {
            delete: false,
            upload: false,
         },
         pdf: {
            show: false,
            file: "",
         },
         beforeCount: 0,
         afterCount: 0,
         tenant: 'aaa'
      }
   },

   computed: {
      uploadUrl() {
         return process.env.API_BASEURL + '/files/' + this.tenant + '/upload'
      },
   },

   filters: {
      noTenant: function(value) {
         let parts = value.split('/')
         return parts[1]
      }
   },

   methods: {
      handleImageUrl(file) {
         if (file.contentType.startsWith('image')) return file.url
         if (file.contentType === 'application/pdf') return '/images/files/pdf.png'
         return "/images/files/other.png"
      },

      async handleDelete(name) {
         Notify.create('handleDelete')
         this.loading.delete = true
         fetch(process.env.API_BASEURL + '/files/' + name, {
            method: "DELETE",
         })
         .then(() => {
            this.listFiles()
         })
         .finally(() => {
            this.loading.delete = false
         })
      },

      async handleDownload(file) {
         //TODO
         //const fileType = this.getFileType(file)
         //if (fileType.type === "pdf") {
         //   this.pdf.file = "http://localhost:4444/" + file
         //   this.pdf.show = true
         //} else {
         //   FileSaver.saveAs("http://localhost:4444/" + file, fileType.mime)
         //}
      },

      handleBeforeUpload() {
         Notify.create('handleBeforeUpload')
         this.beforeCount = this.files.length
         this.loading.upload = true
      },

      handleAfterUpload() {
         Notify.create('handleAfterUpload')
         this.uploader = false
         setTimeout(() => {
            this.listFiles()
            this.loading.upload = false
         }, 1000)
      },

      async listFiles() {
         Notify.create('listFiles')
         this.files = await fetch(process.env.API_BASEURL + "/files/" + this.tenant, {
            method: "GET",
            headers: {
               Accept: "application/json",
            }
         })
            .then(result => result.json())
            .then(result => {
               console.log(result)
               return result
            })
            .catch(err => {
               console.error("error", err)
            })
      },

   },

   beforeMount() {
      Notify.create('beforeMount')
      this.listFiles()
   }
}
</script>
