<template>
  <v-row class="d-flex align-center justify-end mx-4">
    <!-- style="height: 60px" -->
    <v-col cols="3" lg="1" md="1" sm="2" class="px-0">
      <v-select
        dense
        solo
        flat
        hide-details
        :value="itemsPerPage.key"
        @change="itemsPerPage.key = parseInt($event, 10)"
        :items="perPageChoices"
        color="appColor"
        append-icon="mdi-unfold-more-horizontal"
      >
      </v-select>
    </v-col>
    <v-pagination
      v-model="page.key"
      :length="paginationLength"
      :total-visible="6"
      color="chipBack"
    >
    </v-pagination>
  </v-row>
</template>

<script>
export default {
  props: ["count", "page", "itemsPerPage"],

  data() {
    return {
      perPageChoices: [
        { text: "5", value: 5 },
        { text: "10", value: 10 },
        { text: "15", value: 15 },
      ],
    }
  },
  computed: {
    paginationLength() {
      // console.log("math", this.count )
      return Math.ceil(this.count / this.itemsPerPage.key);
    },
  }
}
</script>

<style scoped>
::v-deep .theme--light.v-pagination .v-pagination__item--active {
  color: black !important;
  background-color: #EFF6F8 !important;

}

::v-deep .theme--light.v-text-field--solo > .v-input__control > .v-input__slot {
  background: #F9F9FC !important;
  padding: 0px;
}

::v-deep .theme--light.v-pagination .v-pagination__item,
::v-deep .theme--light.v-pagination .v-pagination__navigation {
  box-shadow: none !important;
  background-color: #F9F9FC ;
  font-family: "Inter" !important;
  font-size: 12px !important;
  margin: 0px;
}

.v-pagination {
  /* border: 1px solid #ebeef7; */
  height: 60px;
}

.row {
  margin: 0px;
  justify-content: right;
}

.v-select {
  padding: 0px !important;
  font-family: "Inter" !important;
  font-size: 12px;
  width: 50%;
}
.v-sheet.v-list {
  padding: 0px;
  font-size: 12px !important;
}

::v-deep .v-select.v-input--dense .v-select__selection--comma {
  margin: 0px !important;
}
::v-deep .v-text-field.v-text-field--solo .v-input__append-inner, .v-text-field.v-text-field--solo .v-input__prepend-inner {
  margin: 0px !important;
  padding: 0px !important;
}
/* /deep/ .v-list-item--active {
  color: #644DED !important;
} */
</style>