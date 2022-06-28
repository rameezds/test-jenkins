<template>
  <div v-if="dialogBox == true">
    <v-navigation-drawer
      v-model="dialogBox"
      absolute
      temporary
      right
      width="445px"
    >
      <v-card elevation="0">
        <v-card-text>
          <v-img
            :src="require('/src/assets/ds.png')"
            width="50px"
            height="50px"
            class="float-left"
          ></v-img>
          <span class="subtitle-1 ml-3 font-weight-medium appBlack--text"
            >{{brandsName.name}}</span
          >
          <br />
          <span class="fontLite--text ml-3 subtitle-2">Brands ({{brandsName.brand_count}})</span>
             <v-img :src="require('/src/assets/x.png')" 
                    width="20px" height="20px" class="img-pointer float-right mt-n5"
                    @click="modalClose()">
             </v-img>
        </v-card-text>
        <v-divider class="appLiteGray"></v-divider>
        <v-card-text class="mb-n10">
          <v-text-field
            class="search-field mt-1"
            dense
            placeholder="Search Brands"
            outlined
            height="42px"
          >
            <template slot="prepend-inner">
              <img
                width="13"
                :src="require('/src/assets/search_brand.png')"
                class="mt-2"
              />
            </template>
          </v-text-field>
        </v-card-text>
        <v-card-text class="text-border ml-4 mt-3" v-for="(brands, i) in brandsName.brand" :key="i">
          <v-img
            :src="require('/src/assets/ds.png')" width="33px" height="33px" class="float-left mt-n2"
          ></v-img>
          <span class="subtitle-2 ml-3 mt-n1 font-weight-medium appBlack--text">{{brands.name}}</span>
          <span class="float-right">
            <v-menu offset-y left>
              <template v-slot:activator="{ on, attrs }">
                <v-img
                  v-on="on"
                  v-bind="attrs"
                  :src="require('/src/assets/more-horizontal.png')"
                  class="img-pointer"
                  width="20px"
                  height="20px"
                ></v-img>
              </template>
              <v-list width="140px" height="85px">
                <!-- reset password list -->
                <!-- <v-list-item v-for="(action, i) in actions" :key="i">
                  <v-list-item-title
                    :class="action.class"
                    @click="editBrand()"
                  >
                 <v-img :src="require('/src/assets/' +action.action+ '.png')" width="11px" height="12px" class="float-left mt-1"></v-img>   
                 <span class="caption appGray--text ml-3">{{action.name}}</span>
                  </v-list-item-title>
                </v-list-item> -->
                 <v-list-item>
                  <v-list-item-title
                    class="mt-n4 img-pointer"
                    @click="editBrand(brands)"
                  >
                  <!-- {{action.funct}} -->
                 <v-img :src="require('/src/assets/edit.png')" width="11px" height="12px" class="float-left mt-1"></v-img>   
                 <span class="caption appGray--text ml-3">Edit Brand</span>
                  </v-list-item-title>
                </v-list-item>
                 <!-- delete  -->
                   <v-list-item>
                  <v-list-item-title
                    class="mt-n12 img-pointer"
                    @click="deleteBrand(brands)"
                  >
                 <v-img :src="require('/src/assets/delete.png')" width="11px" height="12px" class="float-left mt-1"></v-img>   
                 <span class="caption appGray--text ml-3">Delete Brand</span>
                  </v-list-item-title>
                </v-list-item>
                
              </v-list>
            </v-menu>
          </span>
        </v-card-text>
      </v-card>
      <EditBrand :editDialog="editDialog" :brandName="brandsName" :editBrand="editBrandDetail" @setEvent="closeEditBrand()" />
      <DeleteBrand :isDelete="isDelete" :brandDelete="deleteDialog" @setEvent="closeDeleteBrand()" />
    </v-navigation-drawer>
  </div>
</template>

<script>
import EditBrand from "./EditBrandModal.vue";
import DeleteBrand from "./ConfirmDelete.vue";

export default {
  props: ["dialogBox" , "brandsName"],
   components:{
      EditBrand,
      DeleteBrand,
   },
  data() {
    return {
        actions:[
            {name:"Edit Brand", action:"edit" , class:'mt-n4 img-pointer', },
            {name:"Delete Brand", action:"delete", class:'mt-n12 img-pointer'}
        ], 
        editDialog: false,
        editBrandDetail:{},
        isDelete: false,
        deleteDialog:{},
    };
  },
  watch: {},
  methods: {
    modalClose() {
      this.$emit("setEvent", false);
    },
    editBrand(index){
        this.editDialog = true;
        this.editBrandDetail = index;
    },
    closeEditBrand(){
      this.editDialog = false;
    },
    deleteBrand(index){
       this.deleteDialog = index
      this.isDelete = true;
    },
    closeDeleteBrand(){
      this.isDelete = false;
    }
  },
};
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  /* border-style: none; */
  border-color: #e8ebf6;
  font-weight: 900;
}
.text-border {
  border: solid 1px #f7f7f9;
  width: 408px;
  height: 50px;
}

</style>