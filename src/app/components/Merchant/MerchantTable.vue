<template>
  <div>
    <v-card elevation="0" class="mt-5 ml-4 mr-4" rounded="lg">
      <v-card-title class="pt-8">
        <v-row>
          <v-col md="7" cols="12" lg="9" sm="8">
            <span class="subtitle-1 appBlack--text ml-4">Merchants</span>
          </v-col>
          <v-col md="5" cols="12" lg="3" sm="4">
            <v-row>
              <v-col md="6" cols="12" lg="6" sm="2"> </v-col>
              <v-col cols="12" md="5" lg="5" sm="4" class="export-col">
                <v-btn
                  class="appBlack white--text caption mt-2"
                  width="145px"
                  @click="createMerchant()"
                >
                  Add New Merchant
                  <v-icon size="14px" class="pl-1">mdi-plus</v-icon>
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
          :mobile-breakpoint="0"
          :headers="headers"
          :items="item"
          :loading="loader"
          loader-height="2"
          no-data-text="No Record Found"
          hide-default-footer
          :items-per-page="itemsPerPage.key"
          :page="page.key"
        >
          <!-- :options.sync="options" -->
          <template slot="item" slot-scope="props">
            <tr>
              <td>{{ props.item.name }}</td>
              <td>
                <span
                  class="float-left img-pointer liteGreen--text"
                  @click="viewBrands(props.item)"
                  >View Brands &nbsp;</span
                >
                <v-img
                  class="img-pointer eye-margin"
                  :src="require('/src/assets/eye.png')"
                  @click="viewBrands(props.item)"
                  width="14px"
                  height="14px"
                ></v-img>
                <!-- <v-badge
                  :content="props.item.children_count"
                  @click.native="viewBrands(props.item)"
                  color="#ECECEC"
                  class="appBlack--text img-pointer"
                ></v-badge> -->
              </td>
              <td>
                <v-chip color="#F7F7F9">{{ props.item.brand_count }}</v-chip>
              </td>
              <td>                
                <span v-if="props.item.roles.length > 0">
                  {{ props.item.roles[0].name }}
                </span>
              </td>
              <td>
                <v-switch
                  color="#64BC44"
                  dense
                  inset
                  v-model="props.item.status"
                  @click="switchIndex(props.item)"
                >
                </v-switch>
              </td>
              <td>
                <span class="img-pointer liteGreen--text" @click="editMerchant(props.item)"
                  >Edit Merchant</span
                >
                &nbsp;|&nbsp;
                <span class="img-pointer liteGreen--text" @click="addBrands(props.item)"
                  >Add Brands</span
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
    <EditMerchant
      v-if="dialog"
      :dialogBox="dialog"
      :merchantData="[merchantDetail]"
      ref="create"
      @setEvent="closeUserDialog()"
    />
    <CreateMerchant :dialogBox="createDialog" @setEvent="closeUserDialog()" />
    <AddBrands
      :AddBrandBox="addBrandBox"
      :merchantData="[merchantDetail]"
      @setEvent="closeAddBrand()"
    />
    <RightPanel
      :dialogBox="rightPanelDialog"
      :brandsName="brandsName"
      @setEvent="closeRightPanel()"
    />
    <MerchantStatus 
      :switchDialog="switchDialog"
      @setEvent="closeStatus()"     
    />
  </div>
</template>

<script>
import Pagination from "../../../common/components/pagination/Pagination.vue";
import * as types from "../../../constants/Store";
import MerchantStatus from "../../../common/components/InactiveStatus/InactiveStatus.vue"

import EditMerchant from "./EditMerchantModal.vue";
import CreateMerchant from "./CreateMerchant.vue";
import AddBrands from "./AddBrands.vue";
import RightPanel from "./RightPanel.vue";

export default {
  components: {
    Pagination,
    EditMerchant,
    CreateMerchant,
    AddBrands,
    RightPanel,
    MerchantStatus,
  },
  props: [""],
  data() {
    return {
      addBrandBox: false,
      dialog: false,
      switchDialog:false,
      createDialog: false,
      rightPanelDialog: false,
      merchantDetail: [],
      options: {},
      brandsName: [],
      loader: false,
      page: {
        key: 1,
      },
      itemsPerPage: {
        key: 5,
      },
      total: null,

      item: [],
      headers: [
        {
          text: "Merchant Name",
          value: "name",
          class: " fontLite--text",
          sortable: false,
        },
        {
          text: "Merchant Brand",
          value: "merchant_name",
          class: " fontLite--text",
          sortable: false,
        },
        {
          text: "Total Brands ",
          value: "reference",
          class: " fontLite--text",
          sortable: false,
        },
        {
          text: "Roles",
          value: "Roles",
          class: " fontLite--text",
          sortable: false,
        },
        {
          text: "Active/Inactive",
          value: "active",
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
    };
  },
  watch: {
    "page.key"() {
      this.onSubmit();
    },
    "itemsPerPage.key"() {
      this.onSubmit();
    },
  },
  mounted() {
    this.onSubmit();
  },
  methods: {
    onSubmit(value) {
      this.loader = true;
      this.$store
        .dispatch(types.MERCHANT_DATA, {
          per_page: this.itemsPerPage.key,
          page: this.page.key,
          name: value,
          is_user: "Merchant",
        })
        .then((res) => {
          this.loader = false;
          this.item = res.data.users.data;
          this.total = res.data.users.total;

          this.item.map((items) => {
            if (items.is_active == "0") {
              items.status = false;
            }
            if (items.is_active == "1") {
              items.status = true;
            }
          });
          // sending active panel value in maerchant vue 
          this.$emit('click' , res.data.count, res.data.active , res.data.inactive)
        })
        .catch((err) => {
          this.loader = false;
          console.log("merchant_error", err.response);
        });
    },

    switchIndex(index) {
      console.log(index, "index");
      if(index.status=='0')
      {
         this.switchDialog = true;
      }
      this.$store
        .dispatch(types.MERCHANT_STATUS, {
          id: index.id,
          status: index.status,
        })
        .then((res) => {
          this.item = res.data;
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
    closeUserDialog() {
      this.dialog = false;
      this.createDialog = false;
    },
    closeAddBrand() {
      this.addBrandBox = false;
    },
    createMerchant() {
      this.createDialog = true;
      this.rightPanelDialog = false;
    },
    editMerchant(item) {
      this.merchantDetail = item;
      console.log("item", item);
      this.dialog = true;
      this.rightPanelDialog = false;
    },
    addBrands(item) {
      this.addBrandBox = true;
      this.dialog = false;
      this.rightPanelDialog = false;
      this.merchantDetail = item;
    },
    viewBrands(item) {
      this.rightPanelDialog = true;
      this.brandsName = item;
      console.log("children", item);
    },
    closeRightPanel() {
      this.rightPanelDialog = false;
    },
    closeStatus(){
      this.switchDialog = false;
    }
  },
};
</script>

<style scoped>
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
.eye-margin{
  margin-top: 2px;
}
/* .v-data-table::v-deep tr {
  height: 48px !important;
} */
</style>