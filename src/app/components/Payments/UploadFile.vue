<template>
  <v-container fluid class="ma-0 pa-0">
    <!-- Drag and drop -->
    <v-row class="mt-16 d-flex justify-center">
      <!-- <v-col cols="8" lg="8" sm="12" md="11" class="pa-0 mb-1" offset-lg="2"> -->
      <v-col lg="10" md="11" sm="10" class="pa-0 mb-1">
        <v-col
          class="px-14"
          @drop.prevent="onDrop($event)"
          @dragover.prevent="dragover = true"
          @dragenter.prevent="dragover = true"
          @dragleave.prevent="dragover = false"
        >
          <v-row
            class="
              ma-0
              pa-0
              file-input
              d-flex
              align-content-center
              justify-center
            "
          >
            <v-col cols="4" class="d-flex flex-column align-center">
              <img max-height="15" max-width="25" :src="uploadIcon" />

              <p
                v-if="adminUpload"
                class="ma-0 mt-3 default-heading"
                style="color: #161c27"
              >
                Don’t have CSV template?
                <span
                  class="ma-0 default-heading"
                  style="color: #6397a8; text-decoration: underline"
                >
                  Download here!
                </span>
              </p>

              <p
                v-else
                class="ma-0 mt-3 default-heading"
                style="color: #161c27"
              >
                Drag and drop your CSV template file
              </p>

              <p class="mt-2 default-heading" style="color: #8692a6">or</p>

              <div>
                <v-btn
                  class="upload-button"
                  :loading="isSelecting"
                  @click="onButtonClick"
                >
                  <span> Browse file </span>
                </v-btn>
                <input
                  ref="uploader"
                  class="d-none"
                  type="file"
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  @change="onFileChanged"
                />
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-col>
    </v-row>

    <!-- Progress bar -->
    <v-row class="mt-4 px-16 d-flex justify-center">
      <v-col lg="10" md="11" sm="10" class="mb-1 progress-row">
        <p class="default-font ma-0">Uploading...</p>
        <p class="default-font ma-0">{{ progressPercent }}%</p>
        <!-- value="5" -->
        <v-progress-linear
          v-model="progressPercent"
          color="#6397A8"
          class="mt-2"
        ></v-progress-linear>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import UploadIcon from "../../../../public/icons/uploadCsv.png";
import * as types from "../../../constants/Store";

export default {
  props: {
    displayTable: {
      type: Boolean,
      default: false,
    },
    // batchId: {
    //   type: String,
    //   default: "",
    // },
  },
  data() {
    return {
      uploadIcon: UploadIcon,
      selectedFile: null,
      isSelecting: false,
      role: null,
      adminUpload: null,
      batchId: null,

      progressTotal: 0,
      progressCurrent: 0,
      progressPercent: 0,
    };
  },
  methods: {
    onDrop(file) {
      this.selectedFile = file.dataTransfer.files[0];
      // console.log("file", this.selectedFile);
      this.uploadFile(this.selectedFile);
    },

    onButtonClick() {
      this.$refs.uploader.click();
    },

    onFileChanged(file) {
      this.selectedFile = file.target.files[0];
      // console.log("this.selectedFile", this.selectedFile);
      this.uploadFile(this.selectedFile);
    },

    uploadFile(file) {
      console.log(file);
      let formData = new FormData();
      formData.append("file_name", file);
      formData.append("account_reference", 2996325153);

      this.$store
        .dispatch(types.UPLOAD_CSV, formData)
        .then((res) => {
          this.batchId = res.data.batch_id;
          console.log("UPLOAD_CSV this.batchId", this.batchId);
          this.getBatch();

          // this.$emit("setEvent", res.data, true);
        })
        .catch((err) => {
          console.log("error", err);
        });
    },

    getBatch() {
      console.log("this.batchId", this.batchId);

      this.$store
        .dispatch(types.BATCH, { id: this.batchId })
        .then((res) => {
          console.log("BATCH response", res.data);
          this.progressCurrent = res.data.pendingJobs;
          this.progressTotal = res.data.totalJobs;

          this.progressPercent =
            (100 * this.progressCurrent) / this.progressTotal;

          // this.progressPercent == 100 ? this.displayData(res.data.id) : null;

          // this.displayData();

          console.log("this.progressPercent", this.progressPercent);

          setTimeout(() => {
            // this.displayData(res.data.id);
            this.progressPercent == 100 ? this.displayData(res.data.id) : null;
          }, 1000);
        })
        .catch((err) => {
          console.log("error", err);
        });
    },

    displayData(id) {
      console.log("this.progressPercent", this.progressPercent);

      this.$emit("setEvent", id);
    },
  },
  mounted() {
    this.role = this.$store.getters.getRoleAndPermission.role;
    this.role[0].name == "Admin" ? (this.adminUpload = true) : null;
  },
};
</script>

<style scoped>
.top-row {
  border: 1px solid #f7f7f9 !important;
  border-radius: 8px;
}
.progress-row {
  background-color: #fff;
  border: 1px solid #f7f7f9 !important;
  border-radius: 8px;
  /* width: 950px; */
  height: 76px;
}
.upload-button {
  font-family: "Inter" !important;
  font-size: 14px;
  color: #6397a8;
  background-color: #f4f8f9;
  width: 158px !important;
  height: 48px !important;
  border-radius: 5px !important;
  box-shadow: none !important;
}
.file-input {
  border: 1.5px dashed #6397a8;
  background-color: #fff !important;
  border-radius: 16px;
  /* width: 80%; */
  height: 337px;
}
</style>