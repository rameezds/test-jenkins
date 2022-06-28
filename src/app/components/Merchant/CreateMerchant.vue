<template>
  <div>
      <v-dialog content-class="dialog-style" v-model="dialogBox"
      :no-click-animation='false'
      transition="scale-transition" persistent width="750px">
        <v-card outlined rounded="lg" height="">
          <v-row no-gutters class="ml-2 ">
            <v-col lg="11" md="11" cols="10" sm="11">
              <v-card-title>
                <span class="subtitle-2">Add Merchant Details</span>
              </v-card-title>
            </v-col>
            <v-col lg="1" md="1" cols="1" sm="1">
             
              <v-card-title>
                <span class="">
                    <v-img :src="require('/src/assets/x.png')" 
                    width="24px" height="24px" class="img-pointer"
                    @click="modalClose()">
                    </v-img>
                </span>
              </v-card-title>
            </v-col>
          </v-row>
          <v-divider class="appLiteGray"></v-divider> 
          <v-card-text class="mt-8" >
           <v-row class=" mt-9" v-for="(merchantDetail, i) in users" :key="i">
             <!-- first coloum send  -->
               <v-col cols="12" lg="6" md="6" sm="6">
                 <label>Merchan Name *</label>
                 <v-text-field v-model="merchantDetail.name"
                 class="search-field-modal search-field mt-1"
                   dense
                   placeholder="Enter Merchant Name"
                   outlined
                   height="42px">
                   
                 </v-text-field>

               </v-col>
               <v-col cols="12" lg="6" md="6" sm="6" :class="{'mt-n5': $vuetify.breakpoint.xs}">
                  <label>Merchan Email *</label>
                 <v-text-field v-model="merchantDetail.email"
                   class="search-field-modal search-field mt-1"
                   dense
                   placeholder="Enter Merchant Email"
                   outlined
                   height="42px">
                   
                 </v-text-field>

               </v-col>
               <v-col cols="12" lg="6" md="6" sm="6" class="mt-n5">
                   <label>Account Id *</label>
                 <v-text-field v-model="merchantDetail.account_id"
                   class="search-field-modal search-field mt-1"
                   dense
                   placeholder="Example Account Id"
                   outlined
                   height="42px">
                   
                 </v-text-field>

               </v-col>
               <v-col cols="12" lg="6" md="6" sm="6" class="mt-n5">
                  <label>Select Merchant Role *</label>
                  <v-select
                    item-text="name" item-value="value" class="mt-1" background-color="##FFFFFF"
                   v-model="merchantDetail.rolename" dense outlined height="42px"
                    :items="[
                    {name: 'Select Merchant Roles', value: '-1',},
                    {name: 'Payment Ops',value: 'Payment Ops',},
                    {name: 'Risk Ops',value: 'Risk Ops',},
                    {name: 'Finance',value: 'Finance',},
                  ]"
                   >
                    <template slot="selection" slot-scope="data">
                      <!-- HTML that describe how select should render selected items -->
                      <span class="fontLite--text caption"> {{ data.item.name }}</span>
                    </template>
                    <template slot="item" slot-scope="data">
                      <!-- HTML that describe how select should render items when the select is open -->
                      <span class="fontLite--text caption"> {{ data.item.name }}</span>
                    </template>
                    <template slot="append">
                      <img width="8" :src="require('/src/assets/Polygon.png')" class="mt-2" />
                    </template>
                  </v-select>
                </v-col>
                
                <v-col cols="12" lg="6" md="6" sm="6" class="mt-n5">
                   <label> Fee *</label>
                 <v-text-field v-model="merchantDetail.fee"
                   class="search-field-modal search-field mt-1"
                   dense
                   placeholder="Enter Fee"
                   outlined
                   height="42px">
                   
                 </v-text-field>

               </v-col>
           </v-row>
          </v-card-text>
            <v-divider class="appLiteGray"></v-divider>
          <br>
          <v-card-text>
              <v-row class="">
                  <v-col md="8" lg="8" cols="3" sm="8">

                  </v-col>
                  <v-col md="4" lg="4" cols="5" sm="4">
                   <v-row class="ml-2" :class="{'ml-n1': $vuetify.breakpoint.smAndDown}">
                       <v-col md="4" lg="4" cols="7" sm="4" class="mt-2">
                             <a @click="modalClose()" class="appBlack--text">Cancel</a>
                       </v-col>
                       <v-col md="6" lg="6" cols="5" sm="4">
                        <v-btn class="appBlack white--text caption"
                        :loading="isLoading"
                        :disabled="isLoading"
                         width="120px" height="36px" @click="sendInivitation()">Create Merchant</v-btn>
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
    props:['dialogBox'],
 data(){
     return{
       addNewBrand: false,
       merchantRoles:"-1",
       isLoading:false,
      users:[
        {
          name:"",
          email:"",
          account_id:"",
          rolename:"-1",
          isUser:"Merchant",
          fee:"",
        },
      ],
     }
 },
 watch:{
   

 },
 methods:{
     modalClose(){
         this.$emit('setEvent', true);
         this.users =[];
         this.users.push({
          name:"",
          email:"",
          account_id:"",
          rolename:"-1",
          isUser:"Merchant",
          fee:"",
         })
     },
     sendInivitation(){
       this.isLoading = true;
         this.users.map((check)=>{
           if(check.name =='' || check.email == '' || check.account_id==''){
              showSnackbar("Error!", "Field are required.", "error");
              this.isLoading = false;
           }
           else{
                this.$store
              .dispatch(types.ADD_MERCHANT ,{
                users: this.users
              })
              .then((res) => {
                // console.log("invite-res", res);
                if(res.status==201){
                  this.modalClose();
                  this.isLoading = false;
                  showSnackbar("Success!", "Merchant Created Successfully.", "success");
                  this.$parent.onSubmit();
                }
                
              })
              .catch((err) => {
                this.isLoading = false;
                console.log("error", err);
              });
                }
              })
     },
 }
}
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  /* border-style: none; */
  border-color: #E8EBF6;
  font-weight: 900;
}
label{
 color: #1D1D1D;
 font-size: 14px;
 font-weight: 500;
 font-family: "Inter" !important;
}
.roles-select-style{
 font-size: 12px;
 font-weight: 500;
}
.add-brand{
  font-size: 14px !important;
  font-weight: 500 !important;
  font-family: "Inter" !important;
  color: #546084;
  cursor: pointer;
}

</style>