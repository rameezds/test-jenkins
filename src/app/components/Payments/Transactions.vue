<template>
  <v-container fluid class="px-4">
    <v-data-table
      :class="{ 'transaction-table': $vuetify.breakpoint.smAndUp }"
      show-select
      fixed-header
      hide-default-footer
      height="45vh"
      :loading="loader"
      loader-height="2"
      :headers="headers"
      :items="items"
      :page="page.key"
      :mobile-breakpoint="0"
      :items-per-page="itemsPerPage.key"
    >
      <template v-slot:top>
        <TableHeader :batchId="batchId" @setEvent="getData" />
      </template>
      <template v-slot:[`item.beneficiary_name`]="{ item }">
        <v-text-field
          v-model="item.beneficiary_name.value"
          :hide-details="true"
          dense
          single-line
          v-if="item.beneficiary_name.mode"
          @keydown.enter="save(item.beneficiary_name)"
          class="default-font"
          autofocus
        ></v-text-field>
        <span
          v-else
          @click="editItem(item, item.beneficiary_name)"
          :style="item.beneficiary_name.value == '' ? 'color: #C11E1E' : ''"
        >
          <span v-if="item.beneficiary_name.value == ''">
            Beneficiary name
          </span>
          <span v-else>
            {{ item.beneficiary_name.value }}
          </span>
        </span>
        <br />
        <v-text-field
          v-mask="'AA######################'"
          v-model="item.iban.value"
          :hide-details="true"
          dense
          single-line
          v-if="item.iban.mode"
          @keydown.enter="save(item.iban)"
          class="default-font"
          autofocus
        ></v-text-field>
        <span
          v-else
          @click="editItem(item, item.iban)"
          :style="item.iban.value == '' ? 'color: #C11E1E' : ''"
        >
          <span v-if="item.iban.value == ''"> IBAN missing </span>
          <span v-else class="default-font">
            {{ item.iban.value }}
          </span>
        </span>
      </template>
      <template v-slot:[`item.bic`]="{ item }">
        <v-text-field
          v-mask="'AAAAAAAA'"
          v-model="item.bic.value"
          :hide-details="true"
          dense
          single-line
          v-if="item.bic.mode"
          @keydown.enter="save(item.bic)"
          class="default-font"
          autofocus
        ></v-text-field>
        <span
          v-else
          @click="editItem(item, item.bic)"
          :style="item.bic.value == '' ? 'color: #C11E1E' : ''"
        >
          <!-- <span v-if="item.bic.value == 'null'"> BIC missing </span> -->
          <div v-if="item.bic.value == ''" class="bic-field">
            <span> BIC missing </span>
          </div>
          <span v-else>
            {{ item.bic.value }}
          </span>
        </span>
      </template>
      <template v-slot:[`item.merchant_transaction_id`]="{ item }">
        <v-text-field
          v-model="item.merchant_transaction_id.value"
          :hide-details="true"
          dense
          single-line
          v-if="item.merchant_transaction_id.mode"
          @keydown.enter="save(item.merchant_transaction_id)"
          class="default-font"
          autofocus
        ></v-text-field>
        <span
          v-else
          @click="editItem(item, item.merchant_transaction_id)"
          :style="
            item.merchant_transaction_id.value == '' ? 'color: #C11E1E' : ''
          "
        >
          <span v-if="item.merchant_transaction_id.value == ''">
            Merchant TID
          </span>
          <span v-else>
            {{ item.merchant_transaction_id.value }}
          </span>
        </span>
      </template>
      <template v-slot:[`item.brand`]="{ item }">
        <v-text-field
          v-model="item.brand.value"
          :hide-details="true"
          dense
          single-line
          v-if="item.brand.mode"
          @keydown.enter="save(item.brand)"
          class="default-font"
          autofocus
        ></v-text-field>
        <span
          v-else
          @click="editItem(item, item.brand)"
          :style="item.brand.value == '' ? 'color: #C11E1E' : ''"
        >
          <span v-if="item.brand.value == ''"> Brand </span>
          <span v-if="item.status.value == 'Failed'" style="color: #C11E1E"> {{ item.brand.value }} </span>
          
          <span v-else>
            {{ item.brand.value }}
          </span>
        </span>
      </template>
      <template v-slot:[`item.reference`]="{ item }">
        <v-text-field
          v-model="item.reference.value"
          :hide-details="true"
          dense
          single-line
          v-if="item.reference.mode"
          @keydown.enter="save(item.reference)"
          class="default-font"
          autofocus
        ></v-text-field>
        <span
          v-else
          @click="editItem(item, item.reference)"
          :style="item.reference.value == '' ? 'color: #C11E1E' : ''"
        >
          <span v-if="item.reference.value == ''"> Reference </span>
          <span v-else>
            {{ item.reference.value }}
          </span>
        </span>
      </template>
      <template v-slot:[`item.country`]="{ item }">
        <v-text-field
          v-model="item.country.value"
          :hide-details="true"
          dense
          single-line
          v-if="item.country.mode"
          @keydown.enter="save(item.country)"
          class="default-font"
          autofocus
        ></v-text-field>
        <span
          v-else
          @click="editItem(item, item.country)"
          :style="item.country.value == '' ? 'color: #C11E1E' : ''"
        >
          <span v-if="item.country.value == ''"> Country </span>
          <span v-else>
            {{ item.country.value }}
          </span>
        </span>
      </template>
      <template v-slot:[`item.amount`]="{ item }">
        <v-text-field
          v-model="item.amount.value"
          :hide-details="true"
          dense
          single-line
          v-if="item.amount.mode"
          @keydown.enter="save(item.amount)"
          class="default-font"
          autofocus
        ></v-text-field>
        <span
          v-else
          @click="editItem(item, item.amount)"
          :style="item.amount.value == '' ? 'color: #C11E1E' : ''"
        >
          <span v-if="item.amount.value == ''"> Amount </span>
          <span v-else>
            <span> {{ item.currency.value }} </span>
            {{ item.amount.value }}
          </span>
        </span>
        <br />
        <!-- Fee -->
        <v-text-field
          v-model="item.fee.value"
          :hide-details="true"
          dense
          single-line
          v-if="item.fee.mode"
          @keydown.enter="save(item.fee)"
          class="default-font"
          autofocus
        ></v-text-field>
        <span
          v-else
          @click="editItem(item, item.fee)"
          :style="item.fee.value == '' ? 'color: #C11E1E' : ''"
        >
          <span v-if="item.fee.value == ''"> Fee </span>
          <span v-else class="default-font">
            <span class="default-font"> Fee {{ item.currency.value }} </span>
            {{ item.fee.value }}
          </span>
        </span>
      </template>
      <template v-slot:[`item.status`]="{ item }">
        <div v-if="item.status.value == 'Pending'">
          <span class="default-font" style="color: #e79800">
            {{ item.status.value }}
          </span>
        </div>
        <div v-if="item.status.value == 'Failed'">
          <span class="default-font" style="color: #c11e1e">
            {{ item.status.value }}
          </span>
        </div>
        <div v-if="item.status.value == 'Completed'">
          <span class="default-font" style="color: #35c11e">
            {{ item.status.value }}
          </span>
        </div>
      </template>
      <template v-slot:[`item.action`]="{ item }">
        <v-icon
          style="font-size: 16px"
          color="appColor"
          class="mr-1"
          @click="deleteModal(item.id, item.merchant_name)"
        >
          mdi-trash-can-outline
        </v-icon>
      </template>
      <template v-slot:footer>
        <Pagination
          v-if="items.length > 0"
          :count="total"
          :itemsPerPage="itemsPerPage"
          :page="page"
        />
      </template>
    </v-data-table>
    <!-- </v-card-text> -->
    <!-- </v-card> -->

    <v-row style="border-top: solid 1px #d8d8d8" class="my-0 px-4">
      <v-col lg="10" md="9" sm="8" class="d-flex align-center">
        <div>
          <p class="ma-0 default-font">Summary</p>
          <h3 class="default-font">
            Total of <span style="color: black">30 Payments</span>
          </h3>
        </div>
      </v-col>
      <v-col lg="2" md="3" sm="4">
        <div class="d-flex justify-space-between py-1">
          <span class="ma-0 default-font">Subtotal without fee</span>
          <span class="default-font">$987.59</span>
        </div>
        <div class="d-flex justify-space-between py-1">
          <span class="ma-0 default-font">Transfer fee</span>
          <span class="default-font">$13.41</span>
        </div>
        <div
          class="d-flex justify-space-between py-1"
          style="border-top: solid 2px #d8d8d8"
        >
          <span class="ma-0 default-heading">Total Payable</span>
          <span class="default-heading">$1,000.00</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import TableHeader from "./TableHeader.vue";
import Pagination from "../../../common/components/pagination/Pagination.vue";
import * as types from "../../../constants/Store";

export default {
  components: {
    TableHeader,
    Pagination,
  },
  props: ["batchId"],
  data() {
    return {
      page: {
        key: 1,
      },
      itemsPerPage: {
        key: 5,
      },
      total: null,
      name: "",
      options: {},
      transaction: "-1",
      headers: [
        {
          text: "Beneficiary Name",
          value: "beneficiary_name",
          class: "fontLite--text",
          // width: "10%",
        },
        {
          text: "BIC",
          value: "bic",
          class: "fontLite--text",
          // width: "10%"
        },
        {
          text: "Merchant TID ",
          value: "merchant_transaction_id",
          class: "fontLite--text",
          // width: "10%",
        },
        {
          text: "Brand",
          value: "brand",
          class: "fontLite--text",
          // width: "10%",
        },
        {
          text: "Reference",
          value: "reference",
          class: "fontLite--text",
          // width: "10%",
        },
        {
          text: "Country",
          value: "country",
          class: "fontLite--text",
          // width: "10%",
        },
        {
          text: "Amount",
          value: "amount",
          class: "fontLite--text",
          // width: "10%",
        },
        {
          text: "Status",
          value: "status",
          class: "fontLite--text",
          // width: "10%",
        },
        {
          text: "Action",
          value: "action",
          class: "fontLite--text",
          // width: "10%",
        },
      ],
      items: [],

      editMode: false,
      editedIndex: -1,
      editedValue: "",
      editedItem: {},

      search: "",
      loader: false,
    };
  },
  watch: {
    "page.key"() {
      this.getData();
    },
    "itemsPerPage.key"() {
      this.getData();
    },
  },
  methods: {
    getData(search) {
      // console.log("search parent", search);
      this.loader = true;
      this.items = [];

      this.$store
        .dispatch(types.GET_BATCH_TRANSACTION, {
          per_page: this.itemsPerPage.key,
          page: this.page.key,
          batch_id: this.batchId,
          search: search,
        })
        .then((res) => {
          // console.log("response this.items", res.data.data);
          this.total = res.data.total;

          res.data.data.forEach((element) => {
            for (const [key, value] of Object.entries(element)) {
              if (key !== "id") {
                let temp = { [key]: { value: `${value}`, mode: false } };
                Object.assign(element, temp);
              }
            }
            this.items.push(element);
          });
          this.loader = false;
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
    editItem(item, value) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      value.mode = true;
      // console.log("editedIndex", this.editedIndex);
      // console.log("editedItem", this.editedItem);
    },

    save(value) {
      if (this.editedIndex > -1) {
        Object.assign(this.items[this.editedIndex], this.editedItem);
      }
      value.mode = false;

      console.log("editedIndex", this.editedIndex);
      console.log("editedItem", this.editedItem);

      this.close();
    },

    close() {
      setTimeout(() => {
        this.editedIndex = -1;
      }, 300);

      console.log("items", this.items);
    },
  },
  mounted() {
    this.loader = true;

    setTimeout(() => {
      this.getData();
    }, 2000);
  },
};
</script>

<style scoped>
::v-deep .v-simple-checkbox {
  width: 0px !important;
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
  padding-right: 0px !important;
}
.bic-field {
  background-color: rgba(255, 232, 232, 0.35);
  border: 1px solid rgb(193, 30, 30);
  height: 31px;
  width: 90px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>