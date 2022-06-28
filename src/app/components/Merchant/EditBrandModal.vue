<template>
  <div>
      <v-dialog content-class="dialog-style" v-model="editDialog"
         :no-click-animation='false'
          transition="scale-transition" persistent width="526px">
        <v-card outlined rounded="lg">
          <v-row  class="ml-1">
            <v-col lg="10" md="10" cols="9">
              <v-card-title>
                <span class="subtitle-2">Edit Brand Details</span>
              </v-card-title>
            </v-col>
            <v-col lg="1" md="1" cols="1">
             
              <v-card-title>
                <span >
                    <v-img :src="require('/src/assets/modalCross.png')" 
                    width="24px" height="24px" class="img-pointer"
                    @click="modalClose()">
                    </v-img>
                </span>
              </v-card-title>
            </v-col>
          </v-row>
          <v-divider class="appLiteGray"></v-divider> 
          <v-card-text class="" >
           <v-row class="ml-1 mr-1 mt-4">
             <!-- first coloum send  -->
               <v-col cols="12" lg="12" md="12" sm="12">
                 <label>Merchant Name *</label>
                 <v-text-field 
                 class="search-field-modal search-field mt-1"
                   v-model="brandName.name" dense
                   placeholder="Enter Merchant Name"
                   outlined readonly
                   height="42px">
                   
                 </v-text-field>
               </v-col>
                <v-col cols="12" lg="12" md="12" sm="12" class="mt-n5">
                 <label>Brand Name *</label>
                 <v-text-field 
                 class="search-field-modal search-field mt-1"
                   dense v-model="editBrand.name"
                   placeholder="Enter Merchant Name"
                   outlined
                   height="42px">
                   
                 </v-text-field>
               </v-col>
                <v-col cols="12" lg="12" md="12" sm="12"  class="mt-n5">
                 <label>Brand Email *</label>
                 <v-text-field 
                   class="search-field-modal search-field mt-1"
                   dense v-model="editBrand.email"
                   placeholder="Enter Merchant Name"
                   outlined
                   height="42px">
                   
                 </v-text-field>
               </v-col>
                <v-col cols="12" lg="12" md="12" sm="12"  class="mt-n5">
                 <label>Brand IBAN *</label>
                 <v-text-field 
                   class="search-field-modal search-field mt-1"
                   dense
                   placeholder="Enter Merchant Name"
                   outlined
                   height="42px">
                   
                 </v-text-field>
               </v-col>
               
           </v-row>
          </v-card-text>
            <v-divider class="appLiteGray"></v-divider>
          <br>
          <v-card-text>
              <v-row class="ml-3">
                  <v-col md="7" lg="6" cols="12">

                  </v-col>
                  <v-col md="5" lg="4" cols="12">
                   <v-row class="">
                       <v-col md="4" lg="6" cols="6" class="mt-2">
                             <a @click="modalClose()" class="appBlack--text">Cancel</a>
                       </v-col>
                       <v-col md="6" lg="6" cols="6">
                        <v-btn class="appBlack white--text caption"
                         width="120px" height="36px" @click="sendInivitation()">Save Changes</v-btn>
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
export default {
    props:['editDialog' , 'brandName' , "editBrand"],
 data(){
     return{
     }
 },
 methods:{
     modalClose(){
         this.$emit('setEvent', true);
     },
     sendInivitation(){
         this.$store
        .dispatch(types.EDIT_BRAND_DETAILS ,{
          users: this.users
        })
        .then((res) => {
          console.log("edit-brand-res", res);
          
        })
        .catch((err) => {
          console.log("error", err);
        });
     },
 }
}

</script>

<style scoped>
label{
 color: #1D1D1D;
 font-size: 14px;
 font-weight: 500;
 font-family: "Inter" !important;
}
.v-text-field--outlined >>> fieldset {
  /* border-style: none; */
  border-color: #E8EBF6;
  font-weight: 900;
}

</style>