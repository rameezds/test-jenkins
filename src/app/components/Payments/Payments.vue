<template>
  <v-container fluid class="ma-0 pa-0 mb-8">
    <v-row class="bg-white mt-5 ma-4 pa-3 top-row" no-gutters>
      <v-col
        v-if="adminTopbar"
        cols="12"
        lg="3"
        md="3"
        sm="4"
        class=""
        :class="{
          'd-flex justify-space-between align-item-center px-4':
            $vuetify.breakpoint.smAndDown,
          'd-flex justify-space-around align-item-center':
            $vuetify.breakpoint.mdAndUp,
        }"
      >
        <div v-if="displayTable">
          <span> </span>
        </div>
        <div v-else>
          <p class="ma-0 default-font" style="color: #161c27">
            Search Brand or Merchent
            {{ selectedValue }}
          </p>

          <v-select
            outlined
            solo
            dense
            hide-details
            v-model="selectedValue"
            no-data-text=""
            :class="{ 'search-dropdown': $vuetify.breakpoint.lg }"
            :menu-props="{ top: false, offsetY: true }"
            :items="items"
          >
            <template slot="label">
              <v-icon color="appDisable" style="font-size: 16px">
                mdi-magnify
              </v-icon>
              <span class="ma-0 default-font"> Search </span>
            </template>

            <template v-slot:prepend-item>
              <v-expansion-panels flat>
                <v-expansion-panel
                  v-for="(item, i) in items"
                  :key="i"
                  class="mt-0"
                >
                  <v-expansion-panel-header class="pa-0 px-3">
                    <v-subheader
                      class="default-font"
                      style="width: 10px !important"
                    >
                      {{ item.name }}
                      <!-- <v-radio-group dense>
                        <v-radio label="Merchant" color="#161C27"> </v-radio>
                      </v-radio-group> -->
                    </v-subheader>
                  </v-expansion-panel-header>
                  <v-divider></v-divider>
                  <v-expansion-panel-content
                    class="pt-2"
                    v-if="item.brand_count > 0"
                  >
                    <span
                      class="default-font"
                      style="color: #444444; font-weight: 600"
                    >
                      Brands
                    </span>
                    <v-radio-group
                      v-model="selectedValue"
                      v-for="(item, i) in item.brand"
                      :key="i"
                      hide-details
                      dense
                      class="ma-0 px-0 py-1"
                    >
                      <v-radio
                        color="#161C27"
                        :label="item.name"
                        :value="item.name"
                      ></v-radio>
                    </v-radio-group>
                  </v-expansion-panel-content>

                  <v-expansion-panel-content v-else>
                    <span
                      class="default-font"
                      style="color: #444444; font-weight: 600"
                    >
                      No Brands
                    </span>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </template>
          </v-select>
        </div>
        <div class="d-flex flex-column align-center">
          <v-icon
            class="default-icon"
            :style="displayTable === true ? 'color: #AAAAAA !important' : ''"
          >
            mdi-arrow-right-thin
          </v-icon>
        </div>
      </v-col>

      <v-col
        cols="12"
        lg="3"
        md="3"
        sm="4"
        :class="{
          'd-flex justify-space-between align-item-center px-4 mt-4':
            $vuetify.breakpoint.smAndDown,
          'd-flex justify-space-around align-item-center':
            $vuetify.breakpoint.mdAndUp,
        }"
      >
        <!-- class="d-flex justify-space-around align-item-center"
        :class="{ 'd-flex mt-3': $vuetify.breakpoint.smAndDown }" -->

        <div>
          <p class="ma-0 default-font">Available Balance</p>
          <!-- <h3 class="main-heading" v-if="allowViewBalance">$24987.5400</h3>
          <h3 class="main-heading" v-else>...</h3> -->
          <h3 class="main-heading">{{ availableBalance }}</h3>
        </div>
        <div class="d-flex flex-column align-center">
          <p
            class="ma-0 default-font"
            :style="displayTable === true ? 'color: #AAAAAA !important' : ''"
          >
            To
          </p>
          <v-icon
            class="default-icon"
            :style="displayTable === true ? 'color: #AAAAAA !important' : ''"
          >
            mdi-arrow-right-thin
          </v-icon>
        </div>
      </v-col>

      <v-col
        cols="12"
        lg="2"
        md="2"
        sm="4"
        :class="{
          'd-flex justify-space-between align-item-center px-4 mt-4':
            $vuetify.breakpoint.smAndDown,
          'd-flex justify-space-around align-item-center':
            $vuetify.breakpoint.mdAndUp,
        }"
      >
        <v-col class="d-flex pa-0">
          <div>
            <v-img :src="coinIcon" class="default-icon mr-2"></v-img>
          </div>
          <div
            v-if="displayTable === false"
            style="cursor: pointer"
            @click="openPaymentModal()"
          >
            <p class="ma-0 default-heading">Manual Payout</p>
            <p class="ma-0 default-font">Individual Account</p>
          </div>

          <div v-else>
            <p class="ma-0 default-heading" style="color: #aaaaaa !important">
              Manual Payout
            </p>
            <p class="ma-0 default-font" style="color: #aaaaaa !important">
              Individual Account
            </p>
          </div>
        </v-col>
      </v-col>

      <v-col
        v-if="adminTopbar != true"
        cols="12"
        lg="3"
        md="3"
        sm="4"
        :class="{
          'd-flex justify-space-between align-item-center px-4 mt-4':
            $vuetify.breakpoint.smAndDown,
          'd-flex justify-space-around align-item-center':
            $vuetify.breakpoint.mdAndUp,
        }"
      >
        <div class="mr-12 d-flex flex-column align-center align-item-center">
          <p
            class="ma-0 default-font"
            :style="displayTable === true ? 'color: #AAAAAA !important' : ''"
          >
            Or
          </p>
          <v-icon
            class="default-icon"
            :style="displayTable === true ? 'color: #AAAAAA !important' : ''"
          >
            mdi-arrow-right-thin
          </v-icon>
        </div>
        <div>
          <v-img :src="downloadIcon" class="default-icon mr-2"></v-img>
        </div>
        <div>
          <p
            class="ma-0 default-heading"
            :style="displayTable === true ? 'color: #AAAAAA !important' : ''"
          >
            Don’t have CSV template?
          </p>
          <p
            class="ma-0 default-font"
            :style="
              displayTable === true
                ? 'color: #AAAAAA !important'
                : 'color: #6397a8'
            "
          >
            Download here!
          </p>
        </div>
      </v-col>

      <v-col
        cols="6"
        lg="2"
        md="2"
        sm="6"
        :class="{
          'd-flex justify-space-around align-item-center':
            $vuetify.breakpoint.smAndUp,
          'd-flex align-item-center mt-3': $vuetify.breakpoint.smAndDown,
        }"
      >
        <div
          :class="{
            'd-none': $vuetify.breakpoint.smAndDown,
          }"
        >
          <v-img :src="dividerIcon" style="width: 2px; height: 50px"></v-img>
        </div>
        <div class="">
          <p class="ma-0 default-heading">Executable</p>
          <p class="ma-0 main-heading" style="color: #35c11e">000</p>
        </div>
      </v-col>

      <v-col
        cols="6"
        lg="2"
        md="2"
        sm="6"
        :class="{
          'd-flex justify-space-around align-item-center':
            $vuetify.breakpoint.mdAndUp,
          'd-flex justify-space-between align-item-center':
            $vuetify.breakpoint.smAndDown,
        }"
      >
        <div class="">
          <v-img
            :src="dividerIcon"
            :class="{
              'd-none': $vuetify.breakpoint.xsAndDown,
            }"
            style="width: 2px; height: 50px"
          ></v-img>
        </div>
        <div class="mx-auto">
          <p class="ma-0 default-heading">Inexecutable</p>
          <p class="ma-0 main-heading" style="color: #c11e1e">000</p>
        </div>
      </v-col>
    </v-row>

    <div v-if="displayTable === false">
      <upload-file :displayTable="displayTable" @setEvent="updateValue" />
    </div>

    <div v-if="displayTable === true">
      <Transactions :batchId="batchId" />
    </div>
    <div>
      <PaymentModal :dialogBox="paymentManual" @setEvent="closeDialog()" />
    </div>
  </v-container>
</template>

<script>
import UploadFile from "./UploadFile.vue";
import Transactions from "./Transactions.vue";
import PaymentModal from "./PaymentModal.vue";
import CoinIcon from "../../../../public/icons/coin.png";
import DownloadIcon from "../../../../public/icons/download.png";
import DividerIcon from "../../../../public/icons/divider.png";
import * as types from "../../../constants/Store";

export default {
  components: {
    UploadFile,
    Transactions,
    PaymentModal,
  },
  watch: {
    selectedValue() {
      this.getUserBalance();
    }
  },
  data() {
    return {
      coinIcon: CoinIcon,
      downloadIcon: DownloadIcon,
      dividerIcon: DividerIcon,
      displayTable: false,
      paymentManual: false,
      role: null,
      permissions: null,
      adminTopbar: null,
      allowViewBalance: null,
      items: [],
      selectedValue: null,
      availableBalance: null,
      batchId: null,
    };
  },
  methods: {
    updateValue(val) {
      this.displayTable = true;
      this.batchId = val;
      console.log("batchId", this.batchId);
    },
    closeDialog() {
      this.paymentManual = false;
    },
    openPaymentModal() {
      this.paymentManual = true;
    },
    getMerchants() {
      this.$store
        .dispatch(types.MERCHANT_DATA, {
          is_user: "Merchant",
        })
        .then((res) => {
          this.items = res.data.users.data;
          console.log("MERCHANT_DATA res", this.items);
        })
        .catch((err) => {
          console.log("error", err);
        });
    },

    getUserBalance() {
      this.$store
        .dispatch(types.USER_ACCOUNT_BALANCE, {
          brand_name: this.selectedValue,
        })
        .then((res) => {
          this.availableBalance = res.data;
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  },
  mounted() {
    this.role = this.$store.getters.getRoleAndPermission.role;
    this.role[0].guard_name == "admin_back_office"
      ? (this.adminTopbar = true)
      : null;

    if (this.adminTopbar) {
      this.getMerchants();
    }
  },
};
</script>

<style scoped>
.search-dropdown {
  width: 232px;
}
::v-deep .v-select__slot {
  height: 36px;
}
::v-deep
  .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot
  fieldset {
  border: 1px solid #e3edf0;
  background: #f9f9f9;
  border-radius: 5px;
}
::v-deep .v-expansion-panel--active > .v-expansion-panel-header {
  min-height: 50px !important;
}
::v-deep .v-expansion-panel-content__wrap {
  padding: 0 20px;
}
::v-deep .v-input--selection-controls__input + .v-label {
  font-family: "Inter" !important;
  font-weight: 500 !important;
  font-size: 13px !important;
  color: #767676 !important;
}
::v-deep
  .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
  display: none;
}
::v-deep .v-sheet.v-list:not(.v-sheet--outlined),
.v-sheet.v-list {
  padding: 0px !important;
  width: 232px !important;
}
::v-deep .v-menu__content {
  width: 40px !important;
}
::v-deep
  .v-expansion-panels:not(.v-expansion-panels--accordion):not(.v-expansion-panels--tile)
  > .v-expansion-panel--active {
  margin: 0px !important;
}
.top-row {
  border: 1px solid #f7f7f9 !important;
  border-radius: 8px;
}
.progress-row {
  border: 1px solid #f7f7f9 !important;
  border-radius: 8px;
  width: 950px;
  height: 76px;
}
.upload-button {
  font-size: 14px;
  color: #6397a8;
  background-color: #f4f8f9;
  width: 158px !important;
  height: 48px !important;
  border-radius: 5px !important;
  box-shadow: none !important;
}
.file-input {
  border: 1.5px dashed #6397a8;
  background-color: #fff !important;
  border-radius: 16px;
  height: 337px;
}
</style>