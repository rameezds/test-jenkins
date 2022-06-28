<template>
  <v-container fluid class="">
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="4">
        <span class="subtitle-1 appBlack--text">Transactions</span>
      </v-col>

      <v-col cols="12" sm="12" md="12" lg="8">
        <v-row :class="{ 'float-right': $vuetify.breakpoint.lg }">
          <!-- Search field -->
          <v-col cols="12" lg="3" md="3" sm="6" class="">
            <v-text-field
              solo
              outlined
              dense
              hide-details
              clearable
              placeholder="Search by Name, ID, IBAN"
              class="default-font"
              v-model="searchedValue"
            >
              <template slot="prepend-inner">
                <v-icon color="appDisable" style="font-size: 16px">
                  mdi-magnify
                </v-icon>
              </template>
            </v-text-field>
          </v-col>
          <!-- Dropdown -->
          <v-col cols="12" lg="3" md="3" sm="6" class="">
            <v-select
              item-text="name"
              item-value="value"
              class="caption font-weight-bold transaction-dropdown"
              :menu-props="{ top: false, offsetY: true }"
              background-color="#F7F7F9"
              v-model="transaction"
              outlined
              dense
              hide-details
              :items="items"
            >
              <template slot="selection" slot-scope="data">
                <span class="appBlack--text ma-2"> {{ data.item.name }}</span>
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
          <!-- Clear button -->
          <v-col cols="12" lg="3" md="3" sm="6">
            <v-btn class="default-button" block @click="deleteBatch"> Clear/upload new file </v-btn>
          </v-col>
          <!-- Execute button -->
          <v-col cols="12" lg="3" md="3" sm="6" class="">
            <v-btn class="default-button" block> Execute Transactions </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as types from "../../../constants/Store";

export default {
  props: ["batchId"],
  data() {
    return {
      name: "",
      transaction: "-1",
      items: [
        {
          name: "All Transactions",
          value: "-1",
        },
        {
          name: "Completed",
          value: "1",
        },
      ],
      searchedValue: "",
    };
  },
  watch: {
    // search() {
    //   let searchedValue = this.search;
    //   console.log(" searchedValue", searchedValue);
    //   this.$emit("setEvent", searchedValue);
    // },
    searchedValue: {
      handler(newVal) {
        this.$emit("setEvent", newVal);
      },
    },
  },
  methods: {
    deleteBatch() {
      console.log("batchId", this.batchId);

      this.$store
        .dispatch(types.DELETE_BATCH, {
          batch_id: this.batchId,
        })
        .then((res) => {
          console.log("res", res);
          location.reload();
        })
        .catch((err) => {
          console.log("error", err);
        });
      

    }
  }
};
</script>

<style scoped>
::v-deep
  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  border-radius: 5px;
  border: 1px solid #ececec;
}
::v-deep
  .v-text-field.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  border: none !important;
}
::v-deep
  .theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot
  fieldset {
  border-radius: 5px;
  border: 1px solid #ececec;
}
::v-deep
  .v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot,
.v-text-field.v-text-field--enclosed .v-text-field__details {
  height: 30px !important;
}

/* .default-input {
  width: 180px !important;
} */

.default-button {
  /* width: 180px !important; */
  height: 40px !important;
  background-color: #f7f7f9;
  font-family: "Inter" !important;
  font-weight: 500 !important;
  font-size: 13px;
  color: #212945;
  border-radius: 4px !important;
  box-shadow: none !important;
}

.transaction-dropdown {
  font-family: "Inter" !important;
  font-size: 12px;
  font-weight: 600 !important;
  border-radius: 4px !important;
  /* width: 180px !important; */
}

::v-deep .v-simple-checkbox .v-icon {
  color: #8692a6;
}
</style>
