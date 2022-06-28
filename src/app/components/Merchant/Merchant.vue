<template>
  <div>
     <ActiveUser :totalUser="totalUser" :activeUser="activeUser" :inactiveUser="inactiveUser" 
     :total="'Total Merchant'" :active="'Active Merchant'" :inactive="'Inactive Merchant'"
     :searchField="searchField" @setEvent="onSubmit" />

     <MerchantTable @click="setActivePanel" ref="merchant" />
  </div>
</template>

<script>
import ActiveUser from "../../../common/components/User/ActiveUsers.vue";
import * as types from "../../../constants/Store";

import MerchantTable from "./MerchantTable.vue"
export default {
   components:{
       ActiveUser,
       MerchantTable,
   },
   data(){
       return{
           totalUser: "",
           activeUser: "",
           inactiveUser:"",
           searchField: types.MERCHANT_SEARCH,
       }
   },
   mounted(){
   },
   methods:{
       onSubmit( value){
        console.log("merchant value" ,value);
        this.$refs.merchant.onSubmit(value)        
       },
    setActivePanel(total, active , inactive){
      this.totalUser = total;
      this.activeUser = active;
      this.inactiveUser = inactive;
    }
   }
}
</script>

<style>

</style>