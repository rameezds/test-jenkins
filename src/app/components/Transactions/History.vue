<template>
  <div>
    <!-- <br /> -->
    <div v-if="userLogin == true">
      <HistoryFilters />
      <TransactionTable
        :headers="headers"
        :selectTransaction="true"
        :title="'Transaction'"
      />
    </div>
    <BatchTransaction v-if="batch == false" @setEvent="exportBatch()" />
    <AdminTable v-if="batch == true" />

    <!-- table card  -->
  </div>
</template>

<script>
// import * as types from "../../../constants/Store";
import HistoryFilters from "./HistoryFilters.vue";
import TransactionTable from "./TransactionTable.vue";
// import Transaction from "./TransactionDetails.vue";
import AdminTable from "../AdminHistory/AdminHistory.vue";
import BatchTransaction from "./BatchTransaction.vue";
export default {
  name: "History",
  components: {
    BatchTransaction,
    AdminTable,
    // Pagination,
    HistoryFilters,
    TransactionTable,
    // Transaction,
  },
  data() {
    return {
      userLogin: false,
      batch: false,
      headers: [
        {
          text: "Transaction id",
          value: "merchant_transaction_id",
          class: " fontLite--text",
          sortable: false,
        },
        {
          text: "Name",
          value: "beneficiary_name:",
          class: " fontLite--text",
          sortable: false,
        },
        {
          text: "Currency ",
          value: "currency",
          class: " fontLite--text",
          sortable: false,
        },
        {
          text: "Merchant",
          value: "merchant",
          class: " fontLite--text",
          sortable: false,
        },
        {
          text: "Brand",
          value: "brand",
          class: " fontLite--text",
          sortable: false,
        },
        {
          text: "Timestamp",
          value: "created_at",
          class: " fontLite--text",
          sortable: false,
        },
        {
          text: "Amount",
          value: "amount",
          class: " fontLite--text",
          sortable: false,
        },
        {
          text: "Status",
          value: "status",
          class: " fontLite--text",
          sortable: false,
        },
        {
          text: "Action",
          value: "action",
          class: " fontLite--text",
          sortable: false,
        },
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
      //   .dispatch(types.HISTORY_DATA)
      //   .then((res) => {
      //     console.log("res_tranaction", res);
      //     this.item = res.data.data;
      //   })
      //   .catch((err) => {
      //     console.log("error", err);
      //   });
    },
    exportBatch() {
      this.batch = true;
    },
  },
};
</script>

<style scoped >
</style>