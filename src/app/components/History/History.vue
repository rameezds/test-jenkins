<template>
  <div>
    <!-- <br /> -->
 
      <HistoryFilters v-if="allowSearch" />
   
    <!-- table card  -->
    <v-card elevation="0" class="mt-5 ml-4 mr-4" rounded="lg">
      <v-card-title>
        <v-row>
          <v-col md="7" cols="12" lg="9">
            <span class="subtitle-1 appBlack--text ml-4">Transactions</span>
          </v-col>
          <v-col md="5" cols="12" lg="3">
            <v-row>
              <v-col md="7" cols="6" lg="7">
                <v-select
                  item-text="name"
                  item-value="value"
                  class="caption font-weight-bold"
                  background-color="#F7F7F9"
                  v-model="transaction"
                  outlined
                  height=""
                  dense
                  :items="[
                    {
                      name: 'All Transactions',
                      value: '-1',
                    },
                    {
                      name: 'Completed',
                      value: '1',
                    },
                  ]"
                >
                  <template slot="selection" slot-scope="data">
                    <!-- HTML that describe how select should render selected items -->

                    <span class="appBlack--text ma-2">
                      {{ data.item.name }}</span
                    >
                  </template>
                  <template slot="item" slot-scope="data">
                    <!-- HTML that describe how select should render items when the select is open -->
                    <span class="appBlack--text"> {{ data.item.name }}</span>
                  </template>
                  <template slot="append">
                    <img
                      width="10"
                      :src="require('/src/assets/Polygon.png')"
                      class="mt-2"
                    />
                  </template>
                </v-select>
              </v-col>
              <v-col cols="6" md="5" lg="5" class="export-col" v-if="allowExport">
                <v-btn class="appBlack white--text" width="100px" height="35px" @click="exportFile()">
                  Export
                  <v-icon size="14px" class="pl-1">mdi-arrow-down</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-data-table
          fixed-header
          height="45vh"
          :headers="headers"
          :items="item"
          hide-default-footer
          :items-per-page="itemsPerPage"
          :page="page"
          :options.sync="options"
          :mobile-breakpoint="0"
        >
        <template slot="item" slot-scope="props">
          <tr>
            <td>{{props.item.iban}}</td>
            <td>{{props.item.name}}</td>
            <td>{{props.item.country}}</td>
            <td>{{props.item.merchant}}</td>
            <td>{{props.item.brand}}</td>
            <td>{{props.item.created_at}}</td>
            <td>{{props.item.amount}}</td>
            <td>
              <span v-if="props.item.status=='Pending'" class="orange--text">{{props.item.status}}</span>
              <span v-if="props.item.status=='Completed'" class="success--text">{{props.item.status}}</span>
              <span v-if="props.item.status=='Failed'" class="red--text">{{props.item.status}}</span>
            </td>
            <td><v-btn text width="101px" @click="viewTransactions(props.item)" class="caption">{{props.item.action}}</v-btn></td>
            
          </tr>
        </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <Pagination :count="20" :itemsPerPage="itemsPerPage" :page="1" />
    <Transaction :dialogBox="viewDialog" :object="{transactionDetails}" @setEvent="closeTransaction()" 
     />
  </div>
</template>

<script>
import Pagination from "../../../common/components/pagination/Pagination.vue";
import * as types from "../../../constants/Store";
import HistoryFilters from "./HistoryFilters.vue";
import Transaction from "./TransactionDetails.vue";

export default {
  name:"History",
  components: {
    Pagination,
    HistoryFilters,
    Transaction,
  },
  data() {
    return {
      itemsPerPage: 5,
      page: null,
      options: {},
      transaction: "-1",
      chips: [],
      viewDialog: false,
      transactionDetails:{},
      headers: [
        { text: "Transaction id", value: "iban", class: " fontLite--text" ,sortable: false},
        { text: "Name", value: "name", class: " fontLite--text" ,sortable: false},
        { text: "Country ", value: "country", class: " fontLite--text" ,sortable: false},
        { text: "Merchant", value: "merchant", class: " fontLite--text" ,sortable: false},
        { text: "Brand", value: "brand", class: " fontLite--text" ,sortable: false},
        { text: "Timestamp", value: "created_at", class: " fontLite--text" ,sortable: false},
        { text: "Amount", value: "amount", class: " fontLite--text" ,sortable: false},
        { text: "Status", value: "status", class: " fontLite--text" ,sortable: false},
        { text: "Action", value: "action", class: " fontLite--text" ,sortable: false},
      ],
      item: [],
      permissions: null,
      allowSearch: null,
      allowExport: null,
    };
  },
  watch: {
    options() {
      this.itemsPerPage = this.options.itemsPerPage;
      this.page = this.options.page;
      // console.log(this.options.page, "<<>>", this.options.itemsPerPage);
    },
    transaction:{
      handler(newVal){
         this.$store
        .dispatch(types.SEARCH_TRANSACTION, newVal)
        .then((res) => {
          console.log("res", res);
          this.item = res.data
        })
        .catch((err) => {
          console.log("error", err);
        });
      }
    }

  },
  mounted() {
    this.onSubmit();

    this.permissions = this.$store.getters.getRoleAndPermission.permission;
    this.permissions.forEach((element) => {
      element.name == "Search Merchant Transaction"
        ? this.allowSearch = true
        : null;
      element.name == "Export Report"
        ? this.allowExport = true
        : null;
      
    });
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch(types.HISTORY_DATA)
        .then((res) => {
          console.log("res", res.data);
          this.item = res.data;
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
     exportFile(){
        this.$store
        .dispatch(types.EXPORT_FILE)
        .then((res) => {
          console.log("export-res", res);
          
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
    closeTransaction(){
      this.viewDialog = false;
    },
    viewTransactions(item){
     this.transactionDetails = item;
     this.viewDialog = true; 
    },
   
  },
};
</script>

<style scoped >
.v-text-field--outlined >>> fieldset {
  /* border-style: none; */
  border-color: #d8d8d8;
}
label {
  font-size: 12px;
  color: #212632;
}
.export-col {
  position: relative;
  top: 3px;
}
.v-data-table::v-deep th {
  font-size: 12px !important;
  font-weight: 500 !important;
  font-family: "Inter" !important;
}
.v-data-table::v-deep td {
   font-size: 12px !important;
   font-weight: 500 !important;
   font-family: "Inter" !important;
   color: #212945;
}
.v-data-table::v-deep tr {
   height: 61px !important;
}
</style>