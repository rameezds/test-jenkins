<template>
  <div>
    <!-- main row  -->
    <v-row class="ml-3 mt-2" no-gutters>
      <!-- search filters cols divison  -->
      <v-col cols="12" md="10" lg="10" sm="12">
        <!-- card behind filters  -->
        <!-- <v-card elevation="0" class=" mt-1 ml-1 " rounded="lg">  -->
        <v-row no-gutters>
          <!-- again row col divison to add search bars  -->
          <v-col cols="12" md="3" lg="3" v-for="(primaryFilter,i) in primaryFilters" :key="i">
            <v-text-field
              solo
              dense
              v-model="primaryFilter.value"
              hide-details
              :placeholder="primaryFilter.placeholder"
              :class="primaryFilter.class"
            >
              <template slot="prepend-inner">
                <img width="14" :src="require('/src/assets/search.png')" />
              </template>
              <template slot="append">
                <img width="1" :src="require('/src/assets/divider.png')" />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <!-- </v-card> -->
      </v-col>
      <!-- main row col divison 2  -->
      <v-col cols="12" md="2" lg="2" sm="12">
        <v-row class="ml-1">
          <v-col cols="12" md="6" lg="6" class="py-0 ">
            <div class="pa-4 ml-n4 div-class-search d-none d-md-block">
              <v-btn
                class="appBlack white--text mt-n5 ml-1"
                small
                width="100%"
                @click="searchData()"
                >Search</v-btn
              >
            </div>
          </v-col>
          <v-col cols="11" md="4" lg="4" >
            <div class="toogle-div-center d-none d-md-block">
              <span class="align-toggle-filter">
                <v-img
                  v-if="searchFilters == false"
                  :src="require('/src/assets/toogle_btn.png')"
                  width="18px"
                  class="ml-1 mt-n1 img-pointer"
                  @click="toogleButton()"
                ></v-img>
                <v-img
                  v-if="searchFilters == true"
                  :src="require('/src/assets/cross.png')"
                  width="18px"
                  class="ml-1 mt-n1 img-pointer"
                  @click="toogleButtonClose()"
                ></v-img>
              </span>
            </div>
            <!-- small screen display for search button and image  -->
            <div class="d-sm-flex d-md-none mt-2">
              <span class="float-left">
                <v-btn
                  class="appBlack white--text ml-n2"
                  small
                  width="84px"
                  @click="searchData()"
                  >Search</v-btn
                >
              </span>
              <v-spacer />
              <span class="float-right">
                <v-img
                  v-if="searchFilters == false"
                  :src="require('/src/assets/toogle_btn.png')"
                  width="18px"
                  class=""
                  @click="toogleButton()"
                ></v-img>
                <v-img
                  v-if="searchFilters == true"
                  :src="require('/src/assets/cross.png')"
                  width="18px"
                  class=""
                  @click="toogleButtonClose()"
                ></v-img>
              </span>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- additional filters  -->
    <Secondary ref="secondary" v-if="searchFilters == true" />
  </div>
</template>

<script>
import * as types from "../../../constants/Store";
import Secondary from "./SecondaryFilters.vue";
export default {
  components: {
    Secondary,
  },
  data() {
    return {
      searchFilters: false,
       primaryFilters: [
        { placeholder: "Benificiary Name", value: "", class:"default-font top-row-radius"},
        { placeholder: "Reference", value: "" , class:"default-font"},
        { placeholder: "BIC", value: "", class:"default-font"},
        { placeholder: "IBAN", value: "", class:"default-font"},
      ], 
    };
  },
  methods: {
    searchData() {
      this.$store
        .dispatch(types.SEARCH_DATA)
        .then((res) => {
          console.log("search-res", res);
        })
        .catch((err) => {
          console.log("error", err);
        });
    },
    toogleButton() {
      this.searchFilters = true;
    },
    toogleButtonClose() {
      this.searchFilters = false;
      this.$refs.secondary.clearFilters();
    },

  },
};
</script>

<style scoped>
.div-class-search {
  /* height: 4.6vh; */
  height: 56%;
  background-color: white;
  margin-top: 12px;
  border-radius: 0px 4px 4px 0px;
}
</style>