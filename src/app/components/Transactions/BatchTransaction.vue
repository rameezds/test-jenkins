<template>
  <div>
    <v-card elevation="0" class="mt-5 ml-4 mr-4" rounded="lg">
      <v-card-title>
        <v-row>
          <v-col cols="12" lg="9" md="9">
            <span class="subtitle-1 appBlack--text ml-4"
              >Transaction Batches</span
            >
          </v-col>
          <!-- Search Field for Admin -->
          <v-col cols="12" lg="3" md="3">
            <v-row>
              <v-col cols="12" md="12" lg="12">
                <v-text-field
                  class="search-field-modal search-field mt-1"
                  dense
                  clearable
                  v-model="searchValue"
                  placeholder="Search By Batch ID, Merchant Name, Filename"
                  outlined
                  color="#E8EBF6"
                  height="42px"
                >
                  <template slot="prepend-inner">
                    <img
                      width="16px"
                      class="mt-1"
                      :src="require('/src/assets/light_search.png')"
                    />
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>

          <!-- Dropdown for Merchant -->
          <!-- <v-col cols="12" md="6" lg="6" v-else>
            <v-row>
              <v-col cols="6" md="9" lg="9">
                <v-select
                  item-text="name"
                  item-value="value"
                  class="float-right transaction-dropdown"
                  :menu-props="{ top: false, offsetY: true }"
                  background-color="#F7F7F9"
                  v-model="selectedValue"
                  outlined
                  dense
                  hide-details
                  :items="dropdownItems"
                >
                  <template slot="selection" slot-scope="data">
                    <span class="appBlack--text ma-2">
                      {{ data.item.name }}</span
                    >
                  </template>
                  <template slot="item" slot-scope="data">
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
              <v-col cols="6" md="3" lg="3">
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
          </v-col> -->
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
              <td>{{ props.item.batch_id }}</td>
              <td>{{ props.item.beneficiary_name }}</td>
              <td>{{ props.item.file_name }}</td>
              <td>{{ props.item.created_at }}</td>
              <td>
                <v-btn
                  text
                  width="101px"
                  @click="exportBatch(props.item)"
                  class="caption appBlack--text"
                >
                  Export Batch
                  <v-icon size="14px" color="##161C27">mdi-arrow-down</v-icon>
                </v-btn>
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
  </div>
</template>

<script>
import Pagination from "../../../common/components/pagination/Pagination.vue";
import * as types from "../../../constants/Store";
export default {
  props: ["batch"],
  components: {
    Pagination,
  },
  data() {
    return {
      options: {},
      page: {
        key: 1,
      },
      itemsPerPage: {
        key: 5,
      },
      total: null,
      batchExport: false,
      headers: [
        {
          text: "Batch ID",
          value: "batch_id",
          class: "fontLite--text",
          sortable: false,
        },
        {
          text: "Merchant Name",
          value: "merchant_name",
          class: "fontLite--text",
          sortable: false,
        },
        {
          text: "File Name",
          value: "file_name",
          class: "fontLite--text",
          sortable: false,
        },
        {
          text: "Time Stamp",
          value: "created_at",
          class: "fontLite--text",
          sortable: false,
        },
        {
          text: "Actions",
          value: "action",
          class: "fontLite--text",
          sortable: false,
        },
      ],
      item: [],
      dropdownItems: [
        {
          name: "All Transactions",
          value: "-1",
        },
        {
          name: "Completed",
          value: "1",
        },
      ],
      selectedValue: "-1",
      role: null,
      allowSearch: null,
      loader: false,
      searchValue: null,
    };
  },
  watch: {
    "page.key"() {
      this.getData();
    },
    "itemsPerPage.key"() {
      this.getData();
    },
    searchValue() {
      this.getData();
    },

    // options() {
    //   this.itemsPerPage = this.options.itemsPerPage;
    //   this.page = this.options.page;
    //   console.log(this.options.page, "<<>>", this.options.itemsPerPage);
    //   this.getData();
    // },
  },

  methods: {
    getData() {
      this.$store
        .dispatch(types.GET_TRANSACTION, {
          per_page: this.itemsPerPage.key,
          page: this.page.key,
          search: this.searchValue,
        })
        .then((res) => {
          // console.log("res_Batch", res.data.data);
          this.item = res.data.data;
          this.total = res.data.total;

          this.loader = false;
        })
        .catch((err) => {
          console.log("error", err);
          this.loader = false;
        });
    },

    exportBatch(item) {
      console.log(item, "export batch");
      this.$router.push("/transactions-history");

      // this.$emit("setEvent", this.batchExport);
    },

    exportFile() {
      console.log("exportFile");
    },
  },

  mounted() {
    this.role = this.$store.getters.getRoleAndPermission.role;
    this.role[0].name == "Admin" ? (this.allowSearch = true) : null;

    this.loader = true;
    this.getData();
  },
};
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  /* border-style: none; */
  border-color: #e8ebf6;
  font-weight: 900;
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
.transaction-dropdown {
  font-family: "Inter" !important;
  font-size: 12px;
  font-weight: 600 !important;
  border-radius: 4px !important;
  width: 180px !important;
}
</style>