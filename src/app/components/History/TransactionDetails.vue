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
      <v-card outlined rounded="lg" height="390px">
        <v-row class="ml-1">
          <v-col lg="10" md="10" cols="9" sm="10">
            <v-card-title>
              <span class="subtitle-2">Transaction Details</span>
            </v-card-title>
          </v-col>
          <v-col lg="1" md="1" cols="1" sm="1">
            <v-card-title>
              <span>
                <v-img
                  :src="require('/src/assets/modalCross.png')"
                  width="24px"
                  height="24px"
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
                <label>Transaction Id *</label>
                <v-text-field
                  class="search-field-modal mt-1"
                  dense
                  readonly
                  outlined
                  v-model="object.transactionDetails.iban"
                  height="42px"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6" lg="6">
                <label>Name *</label>
                <v-text-field
                  class="search-field-modal mt-1"
                  dense
                  readonly
                  outlined
                  v-model="object.transactionDetails.name"
                  height="42px"
                >
                </v-text-field>
              </v-col>
              <!-- 3rd and 4th col  -->
              <v-col cols="12" md="6" lg="6" class="mt-n8">
                <label>Country *</label>
                <v-text-field
                  class="search-field-modal mt-1"
                  dense
                  readonly
                  outlined
                  v-model="object.transactionDetails.country"
                  height="42px"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" md="6" lg="6" class="mt-n8">
                <label>Merchant *</label>
                <v-text-field
                  class="search-field-modal mt-1"
                  dense
                  readonly
                  outlined
                  v-model="object.transactionDetails.merchant"
                  height="42px"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="appLiteGray"></v-divider>
        </v-card>
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
      console.log("details_view", this.object);
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