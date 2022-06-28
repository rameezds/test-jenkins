<template>
  <div>
      <v-dialog content-class="dialog-style" v-model="isDelete" 
      :no-click-animation='false'
       transition="scale-transition" persistent width="545px">
        <v-card outlined rounded="lg">
         <v-row  class="mt-n5">
            <v-col lg="10" md="10" cols="9">
            </v-col>
            <v-col lg="1" md="1" cols="1">
              <v-card-title>
                <span >
                    <v-img :src="require('/src/assets/modalCross.png')" 
                    width="24px" height="24px" class="img-pointer"
                    @click="modalClose()">
                    </v-img>
                </span>
              </v-card-title>
            </v-col>
          </v-row>
          <v-card-text class="" >
             <v-row class="ml-2 mt-n8">
                 <v-col lg="2" md="2" sm="2" cols="2" class="">
                     <div class="dustbin-background">
                   <v-img :src="require('/src/assets/dustbin.png')"></v-img>
                   </div>
                 </v-col>
                 <v-col lg="8" md="8" sm="9" cols="9">
                    <span class="delete-title">Sure you want to delete this brand? </span> <br>
                    <span class="delete-sub-title">This brand will be deleted permently...</span>
                 </v-col>

             </v-row>
             <br>
             <v-row class="ml-2 mt-4">
                 <v-col lg="6" md="6" sm="6" cols="2" class="">
                    <v-btn text class="cancel-btn" @click="modalClose()">No,Cancel</v-btn>
                 </v-col>
                 <v-col lg="6" md="6" sm="6" cols="6">
                   <v-btn text class="cancel-btn appBlack white--text" @click="deleteBrand()">Yes, Confirm</v-btn>
                 </v-col>

             </v-row>
             
          </v-card-text>
        </v-card>
      </v-dialog>

  </div>
</template>

<script>
import * as types from "../../../constants/Store";
export default {
    props:['isDelete' , "brandDelete"],
 data(){
     return{
     }
 },
 methods:{
     modalClose(){
         this.$emit('setEvent', true);
     },
     deleteBrand(){
         this.$store
        .dispatch(types.DELETE_BRAND ,{
          users: this.brandDelete
        })
        .then((res) => {
          console.log("edit-brand-res", res);
          
        })
        .catch((err) => {
          console.log("error", err);
        });
     },
 }
}

</script>

<style scoped>
.dustbin-background{
    width: 56px;
    height: 56px;
    background-color: #F5F5F5;
    border-radius: 8px;
}
.delete-title{
    font-family: "Inter" !important;
    font-weight: 600 !important;
    font-size: 18px !important;
    color: #161C27;
}
.delete-sub-title{
     font-family: "Inter" !important;
    font-weight: 500 !important;
    font-size: 14px !important;
    color: #8692A6;
    position: relative;
    top: 10px;
}
.cancel-btn{
   width: 220px;
   height: 45px;
   border-radius: 8px;
   border: solid 1px; 
}
</style>