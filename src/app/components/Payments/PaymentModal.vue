<template>
  <div>
      <v-dialog content-class="dialog-style" v-model="dialogBox" 
       transition="scale-transition" persistent
       :no-click-animation='false' width="738px">
        <v-card outlined rounded="lg" height="">
          <v-row no-gutters class="ml-1">
            <v-col lg="11" md="11" cols="10">
              <v-card-title>
                <span class="subtitle-2">Add Manual Payout Details</span>
              </v-card-title>
            </v-col>
            <v-col lg="1" md="1" cols="2">
             
              <v-card-title>
                <span>
                    <v-img :src="require('/src/assets/modalCross.png')" 
                    width="24px" height="24px"
                    @click="modalClose()">
                    </v-img>
                </span>
              </v-card-title>
            </v-col>
          </v-row>
          <v-divider class="appLiteGray"></v-divider>
          <v-card rounded="lg" elevation="0" class="mt-3"> 
          <v-card-text class="" >
           <v-row class="ml-1 mr-1">
               <v-col cols="12" md="6" lg="6">
                   <label>Beneficiary Name*</label>
                   <v-text-field
                   class="search-field-modal mt-1"
                   dense
                   placeholder="Enter Name"
                   outlined
                  
                   height="42px"
                   >
                 
                   </v-text-field>
               </v-col>
                  <v-col cols="12" md="6" lg="6">
                   <label>IBAN*</label>
                    <v-text-field
                   class="search-field-modal mt-1"
                   dense
                   placeholder="Enter Name"
                   outlined
                   height="42px"
                   >

                   </v-text-field>
                   
               </v-col>
                 <v-col cols="12" md="6" lg="6" class="mt-n5">
                   <label>BIC*</label>
                    <v-text-field
                   class="search-field-modal mt-1"
                   dense
                   placeholder="Enter Name"
                   outlined
                   height="42px"
                   >

                   </v-text-field>
                   
               </v-col>
                <v-col cols="12" md="6" lg="6" class="mt-n5">
                   <label>Country*</label>
                   <v-select
                  item-text="name"
                  item-value="value"
                  class="caption"
               
                  v-model="selectCountry"
                  outlined
                  height="36px"
                  dense
                  :items="[
                    {
                      name: 'Select Country',
                      value: '-1',
                    },
                    {
                      name: 'Pakistan',
                      value: '1',
                    },
                      {
                      name: 'China',
                      value: '2',
                    },
                  ]"
                >
                  <template slot="selection" slot-scope="data">
                    <!-- HTML that describe how select should render selected items -->

                    <span class="fontLite--text font-weight-medium ma-2">
                      {{ data.item.name }}</span
                    >
                  </template>
                  <template slot="item" slot-scope="data">
                    <!-- HTML that describe how select should render items when the select is open -->
                    <span class="fontLite--text caption font-weight-medium"> {{ data.item.name }}</span>
                  </template>
                  <template slot="append">
                    <img
                      width="10"
                      :src="require('/src/assets/arrowDown.png')"
                      class="mt-2"
                    />
                  </template>
                </v-select>
                   
               </v-col>
               
               <v-col cols="12" md="6" lg="6" class="mt-n5">
                   <label>Select Currency*</label>
                   <v-select
                  item-text="name"
                  item-value="value"
                  class="caption"
               
                  v-model="selectCurrency"
                  outlined
                  height="36px"
                  dense
                  :items="[
                    {
                      name: 'Select Currency',
                      value: '-1',
                    },
                    {
                      name: 'EUR',
                      value: '1',
                    },
                    {
                      name: 'USD',
                      value: '2',
                    },
                  ]"
                >
                  <template slot="selection" slot-scope="data">
                    <!-- HTML that describe how select should render selected items -->

                    <span class="fontLite--text font-weight-medium ma-2">
                      {{ data.item.name }}</span
                    >
                  </template>
                  <template slot="item" slot-scope="data">
                    <!-- HTML that describe how select should render items when the select is open -->
                    <span class="fontLite--text caption font-weight-medium"> {{ data.item.name }}</span>
                  </template>
                  <template slot="append">
                    <img
                      width="10"
                      :src="require('/src/assets/arrowDown.png')"
                      class="mt-2"
                    />
                  </template>
                </v-select>
                   
               </v-col>
                <v-col cols="12" md="6" lg="6" class="mt-n5">
                   <label>Add Payable Amount*</label>
                    <v-text-field
                   class="search-field-modal mt-1"
                   dense
                   placeholder="Enter Name"
                   outlined
                   height="42px"
                   >

                   </v-text-field>
                   
               </v-col>
               
               
           </v-row>
          </v-card-text>
            <v-divider class="appLiteGray"></v-divider>
          </v-card>
          <br>
          <v-card-text>
              <v-row class=" ml-1 mr-4">
                  <v-col md="8" lg="8" cols="12">

                  </v-col>
                  <v-col md="4" lg="4" cols="12">
                   <v-row no-gutters>
                       <v-col lg="2" md="2" cols="12"></v-col>
                       <v-col md="4" lg="4" cols="7" class="mt-2">
                             <a class="appBlack--text">Cancel</a>
                       </v-col>
                       <v-col md="6" lg="6" cols="4">
                        <v-btn class="appBlack white--text caption " width="120px" height="36px">Send Invitation</v-btn>
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
    props:['dialogBox'],
 data(){
     return{
      userEmail:"",
      userRoles:"-1",
      selectCountry:"-1",
      selectCurrency:"-1",
     }
 },
 methods:{
     modalClose(){
         this.dialogBox = false;
         this.$emit('setEvent', this.dialogBox);
   
     }
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
}
.roles-select-style{
 font-size: 12px;
 font-weight: 500;
}
</style>