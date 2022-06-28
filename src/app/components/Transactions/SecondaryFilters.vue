<template>
  <div>
    <v-row class="mt-n2 ml-1 mr-1">
      <v-col md="9" lg="9" cols="12">
        <v-row>
          <v-col md="2" lg="2" cols="6">
            <label>Start Date</label>
            <v-menu
              v-model="filters.datepick"
              :close-on-content-click="true"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  placeholder=" Enter Start Date"
                  class="caption search-field secondary-filters"
                  dense
                  solo
                  hide-details
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :value="filters.dateRange"
                >
                  <template slot="append">
                    <v-icon
                      v-if="filters.dateRange != ''"
                      size="18px"
                      @click="dateClear()"
                      >mdi-close</v-icon
                    >
                  </template>
                </v-text-field>
              </template>
              <v-date-picker v-model="filters.dateRange" no-title>
                <!-- <v-btn 
                      text class="mt-n10" color="appBlue" @click="searchData.dateRange = ''">Clear Date
                 </v-btn> -->
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col md="2" lg="2" cols="6">
            <label>End Date</label>
            <v-menu
              v-model="filters.datepickEnding"
              :close-on-content-click="true"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  placeholder=" Enter Start Date"
                  class="caption search-field secondary-filters"
                  dense
                  solo
                  hide-details
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :value="filters.dateRangeEnding"
                >
                  <template slot="append">
                    <v-icon
                      v-if="filters.dateRangeEnding != ''"
                      size="18px"
                      @click="dateClearEnding()"
                      >mdi-close</v-icon
                    >
                  </template>
                </v-text-field>
              </template>
              <v-date-picker v-model="filters.dateRangeEnding" no-title>
                <!-- <v-btn 
                      text class="mt-n10" color="appBlue" @click="searchData.dateRange = ''">Clear Date
                 </v-btn> -->
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col
            v-for="(secondaryFilter, i) in secondaryFilters"
            :key="i"
            md="2"
            lg="2"
            cols="6"
          >
            <label>{{ secondaryFilter.label }}</label>
            <v-text-field
              class="caption search-field secondary-filters"
              dense
              v-model="secondaryFilter.value"
              :type="secondaryFilter.type"
              solo
              :placeholder="secondaryFilter.placeholder"
            >
            </v-text-field>
          </v-col>

          <v-col md="2" lg="2" cols="6">
            <label>Brand</label>
            <v-select
              item-text="name"
              item-value="value"
              class="caption secondary-filters"
              v-model="brand"
              solo
              dense
              :items="brandSelect"
            >
              <template slot="selection" slot-scope="data">
                <!-- HTML that describe how select should render selected items -->

                <span class="appBlack--text ma-2"> {{ data.item.name }}</span>
              </template>
              <template slot="item" slot-scope="data">
                <!-- HTML that describe how select should render items when the select is open -->
                <span class="appBlack--text"> {{ data.item.name }}</span>
              </template>
              <template slot="append">
                <img
                  width="10"
                  :src="require('/src/assets/Polygon.png')"
                  class=""
                />
              </template>
            </v-select>
          </v-col>
        </v-row>
      </v-col>
      <!-- empty space  -->
      <v-col md="3" lg="3" cols="12"> </v-col>
    </v-row>
    <v-divider class="mt-n6 appAvatar"></v-divider>
    <!-- filters by chips  -->
    <v-row class="mt-n2 ml-1">
      <v-col lg="12" md="12" cols="12">
        <v-row>
          <v-col lg="1" md="1" cols="12" class="mt-1">
            <label>Filters By:</label>
          </v-col>
          <v-col lg="10" md="10" cols="12" class="mt-1">
            <Chips :chipsData="filters.dateRange" :chipsMode="filters.startDateMode"  @setEvent="chipDelete" />
            <Chips :chipsData="filters.dateRangeEnding" :chipsMode="filters.endDateMode"  @setEvent="chipDelete" />
            <Chips
              v-for="(secondaryFilter, i) in secondaryFilters"
              :key="i"
              :chipsData="secondaryFilter.value"
              :chipsMode="secondaryFilter.filter_mode"
              @setEvent="chipDelete"
            />
            <Chips :chipsData="brand" :chipsMode="brandMode"  @setEvent="chipDelete"/>
            <a class="caption appBlack--text" @click="clearFilters()"
              >Clear Filters</a
            >
          </v-col>
          <v-col lg="1" md="1" cols="12"> </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Chips from "./ChipsComponent.vue";
export default {
  components: {
    Chips,
  },
  data() {
    return {
         brandSelect: [
                   { name: 'Select Brands', value: '-1', },
                   { name: 'Marchant', value: '1',},
                      ],
         brandMode: true,
         brand: "-1",
      secondaryFilters: [
        { label: "Max Amount", placeholder: "Enter Max Amount", value: "", type: "number", filter_mode:"maxMode"},
        { label: "Min Amount", placeholder: "Enter Min Amount", value: "", type: "number", filter_mode:"minMode"},
        { label: "Full Name", placeholder: "Enter Full Name", value: "", type: "text", filter_mode:"nameMode"},
      ],
      filters: {
        dateRange: "",
        datepick: false,
        datepickEnding: false,
        dateRangeEnding: "",
        startDateMode: "startDateMode",
        endDateMode: "endDateMode"
      },
    };
  },
  methods: {
    clearFilters() {
      this.filters.dateRange = "";
      this.filters.dateRangeEnding = "";
      this.brand = "-1";
      this.secondaryFilters.map((item) => {
        item.value = "";
      });
    },
    dateClear() {
      this.filters.dateRange = "";
    },
    dateClearEnding() {
      this.filters.dateRangeEnding = "";
    },
    chipDelete(mode){
      this.secondaryFilters.map((item)=>{
          if(item.filter_mode== mode){
              item.value = "";
          }
      });
        if (mode === this.brandMode){
          this.brand = "-1";
      }
      if(mode == this.filters.startDateMode){
         this.filters.dateRange = "";
      }
      else if (mode == this.filters.endDateMode){
        this.filters.dateRangeEnding = "";
      }
   
    }
  },
};
</script>

<style scoped>
a {
  text-decoration: underline;
  font-weight: 500;
}
label {
  font-size: 12px;
  color: #212632;
}
</style>