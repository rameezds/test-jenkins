<template>
  <div>
    <v-dialog
      content-class="dialog-style"
      v-model="dialogBox"
      persistent
      width="526px"
      transition="scale-transition"
      :no-click-animation='false'
    >
      <v-card outlined rounded="lg" height="">
        <v-row class="ml-1">
          <v-col lg="10" md="10" cols="10">
            <v-card-title>
              <span class="subtitle-2">Manage User</span>
            </v-card-title>
          </v-col>
          <v-col lg="1" md="1" cols="1">
            <v-card-title>
              <span>
                <v-img
                  :src="require('/src/assets/modalCross.png')"
                  width="24px"
                  height="24px"
                  class="img-pointer"
                  @click="modalClose()"
                >
                </v-img>
              </span>
            </v-card-title>
          </v-col>
        </v-row>
        <v-divider class="appLiteGray"></v-divider>
        <v-card rounded="lg" elevation="0" class="mt-3">
          <v-card-text class="">
            <v-row class="ml-1 mr-1">
              <v-col cols="12" md="6" lg="6">
                <label>User Email *</label>
                <v-text-field
                  class="search-field-modal mt-1"
                  dense
                  readonly
                  outlined
                  height="42px"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6" lg="6">
                <label>User Id *</label>
                <v-text-field
                  class="search-field-modal mt-1"
                  dense
                  readonly
                  outlined
                  height="42px"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="appLiteGray"></v-divider>
        </v-card>
        <br />
        <v-card-text>
          <v-row class="">
            <v-col md="7" lg="7" cols="12"> </v-col>
            <v-col md="5" lg="5" cols="12">
              <v-row class="">
                <v-col md="4" lg="4" cols="6" class="mt-2">
                  <a @click="modalClose()" class="appBlack--text">Cancel</a>
                </v-col>
                <v-col md="6" lg="6" cols="6">
                  <v-btn
                    class="appBlack white--text caption"
                    width="120px"
                    height="36px"
                    >Send Invitation</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <!-- <v-hover v-slot="{ hover }">

          </v-hover> -->
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogBox", "object"],
  data() {
    return {
      userEmail: "",
      userRoles: "-1",
      dialog: false,
    };
  },
  methods: {
    modalClose() {
      //  this.dialogBox = false;
      this.$emit("setEvent", this.dialog);
      // console.log("details", this.object);
    },
  },
};
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  /* border-style: none; */
  border-color: #e8ebf6;
  font-weight: 900;
}
label {
  color: #1d1d1d;
  font-size: 14px;
  font-weight: 500;
}
.roles-select-style {
  font-size: 12px;
  font-weight: 500;
}
</style>