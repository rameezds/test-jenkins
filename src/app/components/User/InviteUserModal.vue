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
          <v-col lg="10" md="10" cols="9">
            <v-card-title>
              <span class="subtitle-2">Add User Details</span>
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
              <v-col cols="12" md="12" lg="12">
                <label>User Full Name *</label>
                <v-text-field
                  class="search-field-modal search-field mt-1"
                  dense
                  placeholder="Enter Name"
                  outlined
                  v-model="userFullName"
                  height="42px"
                >
                </v-text-field>
                <label>User Email *</label>
                <v-text-field
                  class="search-field-modal search-field mt-1"
                  dense
                  placeholder="Enter Name"
                  outlined
                  v-model="userEmail"
                  height="42px"
                  :rules="[rules.required, emptyEmail]"
                >
                </v-text-field>
                <label>User Roles *</label>
                <v-select
                  item-text="name"
                  item-value="value"
                  class="mt-1"
                  background-color="##FFFFFF"
                  v-model="userRoles"
                  dense
                  outlined
                  height="42px"
                  :items="[
                    { name: 'Select User Rights',value: '-1',},
                    { name: 'Payment Ops', value: 'Payment Ops',},
                    { name: 'Admin', value: 'Admin',},
                  ]"
                >
                  <template slot="selection" slot-scope="data">
                    <!-- HTML that describe how select should render selected items -->

                    <span class="roles-select-style fontLite--text">
                      {{ data.item.name }}</span
                    >
                  </template>
                  <template slot="item" slot-scope="data">
                    <!-- HTML that describe how select should render items when the select is open -->
                    <span class="fontLite--text caption">
                      {{ data.item.name }}</span
                    >
                  </template>
                  <template slot="append">
                    <img
                      width="8"
                      :src="require('/src/assets/Polygon.png')"
                      class="mt-2"
                    />
                  </template>
                </v-select>
              </v-col>
            </v-row>
          </v-card-text>
          <v-divider class="appLiteGray"></v-divider>
        </v-card>
        <br />
        <v-card-text>
          <v-row class="">
            <v-col md="7" lg="7" cols="4" sm="7"> </v-col>
            <v-col  md="5" lg="4" cols="5" sm="5">
              <v-row class="">
                <v-col md="4" lg="5" cols="7" sm="4" class="mt-2">
                  <a @click="modalClose()" class="appBlack--text">Cancel</a>
                </v-col>
                <v-col  md="6" lg="5" cols="5" sm="4">
                  <v-btn
                    class="appBlack white--text caption"
                    width="120px"
                    height="36px"
                    @click="sendInivitation()"
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
import * as types from "../../../constants/Store";
export default {
  props: ["dialogBox"],
  data() {
    return {
      userFullName: "",
      userEmail: "",
      userRoles: "-1",
      emptyEmail: (v) =>
        /[A-Za-z0-9_]+@[a-zA-z0-9.-]+\.[a-zA-Z]{2,}/.test(v) ||
        "E-mail must be valid",
      rules: {
        required: (value) => !!value || "Required.",
      },  
    };
  },
  methods: {
    modalClose() {
      //  this.dialogBox = false;
      this.$emit("setEvent", false);
      this.userFullName = "";
      this.userEmail = "";
      this.userRoles = "-1";
      //  console.log(this.dial)
    },
    sendInivitation() {
       if(this.userRoles=="-1" || this.userFullName =="" , this.userEmail=="")
       {
         console.log("invalid fields")
       }
       else{
            this.$store
            .dispatch(types.INVITE_USER , {
              name: this.userFullName,
              email: this.userEmail,
              rolename: this.userRoles
            })
            .then((res) => {
              console.log("res", res);
            })
            .catch((err) => {
              console.log("error", err);
            });
       }
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