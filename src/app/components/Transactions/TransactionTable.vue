<template>
  <div>
    <v-card elevation="0" class="mt-5 ml-4 mr-4" rounded="lg">
      <v-card-title>
        <v-row>
          <v-col md="7" cols="12" lg="9">
            <span class="subtitle-1 appBlack--text ml-4">{{ title }}</span>
          </v-col>
          <v-col md="5" cols="12" lg="3">
            <v-row>
              <v-col md="7" cols="6" lg="7">
                <v-select
                  v-if="selectTransaction == true"
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
              <v-col cols="6" md="5" lg="5" class="export-col">
                <v-btn
                  class="appBlack white--text"
                  width="100px"
                  height="35px"
                  @click="exportFile()"
                >
                  Export
                  <v-icon size="14px" class="pl-1">mdi-arrow-down</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text class="pa-0">
        <v-data-table
          fixed-header
          hide-default-footer
          height="45vh"
          :loading="loader"
          loader-height="2"
          :headers="headers"
          :items="item"
          :mobile-breakpoint="0"
          :page="page.key"
          :items-per-page="itemsPerPage.key"
        >
          <template slot="item" slot-scope="props">
            <tr>
              <td>{{ props.item.merchant_transaction_id }}</td>
              <td>{{ props.item.beneficiary_name }}</td>
              <td>{{ props.item.currency }}</td>
              <td>{{ props.item.merchant }}</td>
              <td>{{ props.item.brand }}</td>
              <td>{{ props.item.created_at }}</td>
              <td>{{ props.item.amount }}</td>
              <td>
                <span
                  v-if="props.item.status == 'Pending'"
                  class="orange--text"
                  >{{ props.item.status }}</span
                >
                <span
                  v-if="props.item.status == 'Completed'"
                  class="success--text"
                  >{{ props.item.status }}</span
                >
                <span v-if="props.item.status == 'Failed'" class="red--text">{{
                  props.item.status
                }}</span>
              </td>
              <td>
                <v-btn
                  text
                  width="101px"
                  @click="viewTransactions(props.item)"
                  class="caption"
                  >View Details</v-btn
                >
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <Pagination
      v-if="item.length > 0"
      :count="total"
      :itemsPerPage="itemsPerPage"
      :page="page"
    />
    <Transaction
      :dialogBox="viewDialog"
      :object="{ transactionDetails }"
      @setEvent="closeTransaction()"
    />
  </div>
</template>

<script>
import Pagination from "../../../common/components/pagination/Pagination.vue";
import * as types from "../../../constants/Store";
import Transaction from "./TransactionDetails.vue";
export default {
  name: "History",
  components: {
    Pagination,
    // HistoryFilters,
    Transaction,
  },
  props: ["headers", "", "selectTransaction", "title"],
  data() {
    return {
      options: {},
      page: {
        key: 1,
      },
      itemsPerPage: {
        key: 5,
      },
      total: "",
      loader: false,
      transaction: "-1",
      chips: [],
      viewDialog: false,
      transactionDetails: {},
      item: [],
    };
  },
  watch: {
    "page.key"() {
      this.getData();
    },
    "itemsPerPage.key"() {
      this.getData();
    },
    transaction: {
      handler(newVal) {
        this.$store
          .dispatch(types.SEARCH_TRANSACTION, newVal)
          .then((res) => {
            console.log("res", res);
            this.item = res.data;
          })
          .catch((err) => {
            console.log("error", err);
          });
      },
    },
  },

  methods: {
    getData() {
      this.$store
        .dispatch(types.GET_TRANSACTION, {
          per_page: this.itemsPerPage.key,
          page: this.page.key,
        })
        .then((res) => {
          this.item = res.data.data;
          this.total = res.data.total;

          this.loader = false;
        })
        .catch((err) => {
          console.log("error", err);
        });
    },

    exportFile() {
      this.$store
        .dispatch(types.EXPORT_FILE)
        .then((res) => {
          console.log("export-res", res);
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
    closeTransaction() {
      this.viewDialog = false;
    },
    viewTransactions(item) {
      this.transactionDetails = item;
      this.viewDialog = true;
    },
  },

  mounted() {
    this.loader = true;

    this.getData();
  },
};
</script>

<style scoped>
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
/* .v-data-table::v-deep tr {
  height: 61px !important;
} */
</style>