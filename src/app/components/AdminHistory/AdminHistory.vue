<template>
  <div>
       <HistoryFilters/>
        <v-row no-gutters>
        <v-col lg="2" md="3" sm="4" cols="12">
           <AdminPanel/>
        </v-col>
        <v-col lg="10" md="9" sm="8" cols="12">
          <TransactionTable :headers="headers" :item="item" :selectTransaction="false" :title="'Transaction History'"/>
        </v-col>
      </v-row>

  </div>
</template>

<script>
import * as types from "../../../constants/Store";

import HistoryFilters from "../Transactions/HistoryFilters.vue";
import TransactionTable  from "../Transactions/TransactionTable.vue"

import AdminPanel from "./AdminPanel.vue"
export default {
name:"admin",
components:{
       HistoryFilters,
    TransactionTable,
    AdminPanel,
},
data() {
    return {
   
      headers: [
        { text: "Transaction id", value: "iban", class: " fontLite--text" ,sortable: false},
        { text: "Name", value: "name", class: " fontLite--text" ,sortable: false},
        { text: "Currency ", value: "currency", class: " fontLite--text" ,sortable: false},
        { text: "Merchant", value: "merchant", class: " fontLite--text" ,sortable: false},
        { text: "Brand", value: "brand", class: " fontLite--text" ,sortable: false},
        { text: "Timestamp", value: "created_at", class: " fontLite--text" ,sortable: false},
        { text: "Amount", value: "amount", class: " fontLite--text" ,sortable: false},
        { text: "Status", value: "status", class: " fontLite--text" ,sortable: false},
        { text: "Action", value: "action", class: " fontLite--text" ,sortable: false},
      ],
      item: [],
    };
  },
  mounted() {
    this.onSubmit();
  },
  methods: {
    onSubmit() {
      // this.$store
      //   .dispatch(types.ADMIN_TRANSACTION)
      //   .then((res) => {
      //     console.log("admin_tranaction", res.data);
      //     this.item = res.data;
      //   })
      //   .catch((err) => {
      //     console.log("error", err);
      //   });
    },
   
  },
}
</script>

<style>

</style>