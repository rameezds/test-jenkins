<template>
  <div>
    <v-dialog
      content-class="dialog-style"
      v-model="AddBrandBox"
      persistent
      width="750px"
      transition="scale-transition"
      :no-click-animation='false'
    >
      <v-card outlined rounded="lg" height="">
        <v-row no-gutters class="ml-2">
          <v-col g="11" md="11" cols="10" sm="11">
            <v-card-title>
              <span class="add-brand appBlack--text">Add Brand Details</span>
            </v-card-title>
          </v-col>
          <v-col lg="1" md="1" cols="1" sm="1">
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
        <v-card-text class="mt-8">
          <v-row
            class=" mt-9"
            v-for="(merchantDetail, i) in merchantData"
            :key="i"
          >
            <!-- first coloum send  -->
            <v-col cols="12" lg="6" md="6" sm="6">
              <label>Merchan Name *</label>
              <v-text-field
                v-model="merchantDetail.name"
                class="search-field-modal search-field mt-1"
                dense
                readonly
                placeholder="Enter Merchant Name"
                outlined
                height="42px"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6">
              <label>Merchan Email *</label>
              <v-text-field
                v-model="merchantDetail.email"
                class="search-field-modal search-field mt-1"
                dense
                readonly
                placeholder="Enter Merchant Email"
                outlined
                height="42px"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <!-- render brands  -->
          <v-row class="ml-1 mr-1" v-for="(brands, i) in brandData" :key="i">
            <!-- second send col  -->
            <v-col cols="12" lg="12" md="12" sm="12">
              <span class="add-brand appBlack--text">Add Brand Details</span>
              <span class="add-brand float-right" @click="removeBrand(i)">Remove Brand</span>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6">
              <label>Select Brand Name *</label>
              <v-text-field
                v-model="brands.name"
                class="search-field-modal search-field mt-1"
                dense
                placeholder="Enter Brand Name"
                outlined
                height="42px"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6">
              <label>Select Brand Email *</label>
              <v-text-field
                v-model="brands.email"
                class="search-field-modal search-field mt-1"
                dense
                placeholder="Enter Brand Email"
                outlined
                height="42px"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" class="mt-n5">
              <label>Select Account Id *</label>
              <v-text-field
                v-model="brands.account_id"
                class="search-field-modal search-field mt-1"
                dense
                placeholder="Enter Account Id"
                outlined
                height="42px"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="6" class="mt-n5">
              <label>Select Brand Roles *</label>
              <v-select
                item-text="name"
                item-value="value"
                class="mt-1"
                background-color="##FFFFFF"
                v-model="brands.rolename"
                dense
                outlined
                height="42px"
                :items="[
                  { name: 'Select Brands Roles', value: '-1' },
                  { name: 'Brand', value: 'Brand' },
                ]"
              >
                <template slot="selection" slot-scope="data">
                  <!-- HTML that describe how select should render selected items -->
                  <span class="fontLite--text caption">
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

            <!-- <v-col cols="12" lg="6" md="6" sm="6" class="mt-n5">
              <label>Fee *</label>
              <v-text-field
                v-model="brands.fee"
                class="search-field-modal search-field mt-1"
                dense
                placeholder="Enter Account Id"
                outlined
                height="42px"
              >
              </v-text-field>
            </v-col> -->
          </v-row>

          <v-row class="ml-1 mt-n6">
            <v-col sm="12" cols="12" lg="12" md="12">
              <v-icon size="16px" class="pl-1" color="#546084">mdi-plus</v-icon>
              <span class="add-brand" @click="addBrand()"> Add Brand</span>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider class="appLiteGray"></v-divider>
        <br />
        <v-card-text>
          <v-row class="">
            <v-col md="8" lg="8" cols="3" sm="8"> </v-col>
            <v-col  md="4" lg="4" cols="5" sm="4">
              <v-row class="ml-2" :class="{'ml-n1': $vuetify.breakpoint.smAndDown}">
                <v-col md="4" lg="4" cols="7" sm="4" class="mt-2">
                  <a @click="modalClose()" class="appBlack--text">Cancel</a>
                </v-col>
                <v-col md="6" lg="6" cols="5" sm="4">
                  <v-btn
                    class="appBlack white--text caption"
                    width="120px" height="36px"
                    :loading="isLoading" :disabled="isLoading"
                    @click="sendInivitation()"
                    >Create Brand</v-btn
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as types from "../../../constants/Store";

import { showSnackbar } from "../../utils/GlobalActions";
export default {
  props: ["AddBrandBox", "merchantData"],
  data() {
    return {
      addNewBrand: false,
      merchantRoles: "-1",
      parent_id: null,
      brandData: [],
      isLoading:false,
    };
  },
  methods: {
    modalClose() {
      this.$emit("setEvent", false);
      this.brandData = [];
    },
    sendInivitation() {
      //  this.brandData.map((item)=>{
      //    this.merchantData.push(item)
      //  })
      this.isLoading = true;
      if(this.brandData.length<=0){
         showSnackbar("Error!", "Add One Brand Atleast", "error");
         this.isLoading = false;
      }
      else{
            this.merchantData.map((item) => {
              this.parent_id = item.id;
            });
          this.brandData.map((check)=>{
              if(check.name=='' || check.email=='' || check.account_id=='' || check.rolename=='-1'){
                  showSnackbar("Error!", "Field are required.", "error");
                  this.isLoading = false;
            }
            else{
                  this.$store
                  .dispatch(types.ADD_MERCHANT, {
                    users: this.brandData,
                    parent_id: this.parent_id,
                  })
                  .then((res) => {
                    if(res.status==201){
                      this.modalClose();
                      this.isLoading = false;
                      showSnackbar("Success!", "Brand Created Successfully.", "success");
                      this.$parent.onSubmit();
                    }
                  })
                  .catch((err) => {
                    console.log("error", err);
                    this.isLoading = false;
                  });
                  }
                })
      }
    },
    addBrand() {
      this.addNewBrand = true;
      this.brandData.push({
        name: "",
        email: "",
        account_id: "",
        rolename: "-1",
        isUser: "Brand",
        // fee: 500 ,
      });
      console.log("brand array ", this.brandData);
    },
    removeBrand(index){
       this.brandData.splice(index,1)
    }
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
  font-family: "Inter" !important;
}
.roles-select-style {
  font-size: 12px;
  font-weight: 500;
}
.add-brand {
  font-size: 14px !important;
  font-weight: 500 !important;
  font-family: "Inter" !important;
  color: #546084;
  cursor: pointer;
}
</style>