<template>
  <div>
     <v-dialog content-class="dialog-style" v-model="isApiDialog" persistent 
     :no-click-animation='false'
      transition="scale-transition" width="1217px">
        <v-card outlined rounded="lg" height="">
          <v-row  class="ml-1">
            <v-col lg="11" md="11" cols="9">
              <v-card-title>
                <span class="subtitle-1 font-name">Brands API keys</span>
              </v-card-title>
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
          <v-card-text>
              <v-data-table
               fixed-header
               hide-default-footer
               height="35vh"
               no-data-text="No Record Found"
              :loading="loader"
               loader-height="2"
              :headers="headers"
              :items="merchantBrands"
              :mobile-breakpoint="0"
              >
              <template slot="item" slot-scope="props">
            <tr>
              <!-- <td>{{props.item.account_reference}}</td> -->
              <td>{{'ac_ref'+Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 15)}}</td>
              <td>{{props.item.name}}</td>
              <td>{{props.item.email}}</td>
              <td>
                  <span  v-if="props.item.isShow==true" class="float-left">{{props.item.encrypted_public_key}} &nbsp;&nbsp;</span>
                  <span v-else class="float-left">**********&nbsp;&nbsp;</span>
                  <v-img :src="require('/src/assets/copy.png')" @click="copyText(props.item.encrypted_public_key )"
                  class="float-left mt-1 mr-2 img-pointer" width="14px" height="14px"></v-img>
                  <v-img :src="require('/src/assets/share.png')" class="mt-1 img-pointer" width="14px" height="14px"></v-img>
                
              </td>
               <td>
                  <span  v-if="props.item.isShow==true" class="float-left">{{props.item.encrypted_private_key}} &nbsp;&nbsp;</span>
                   <span v-else class="float-left">**********&nbsp;&nbsp;</span>
                  <v-img :src="require('/src/assets/copy.png')" class="float-left mt-1 mr-2 img-pointer" width="14px" height="14px"></v-img>
                  <v-img :src="require('/src/assets/share.png')" class="mt-1 img-pointer" width="14px" height="14px"></v-img>
                
              </td>
            </tr>
          </template>

              </v-data-table>
          </v-card-text>
         
        </v-card>
      </v-dialog>

  </div>
</template>

<script>
export default {
    props:["isApiDialog" , "merchantBrands"],
    data(){
        return{
            accountRandom:"",
            loader:false,
            headers:[
                 { text: "Account Reference", value: "account_reference", class: " fontLite--text", sortable: false,},
                 { text: "Brand Name", value: "beneficiary_name", class: " fontLite--text", sortable: false,},
                 { text: "Brand Email", value: "brand_email", class: " fontLite--text",sortable: false,},
                 { text: "Public API Key ", value: "public_key", class: " fontLite--text",  sortable: false,},
                 { text: "Private API Key", value: "private_key", class: " fontLite--text",sortable: false,},
            ],
            item:[],
        //     item:[
        // {account_reference:"0981234567", beneficiary_name:"Coke" , brand_email:"coke@coke",
        // public_key:"123abcmgfrty787ytfghjhgft", private_key:"321bcai87654redfgyui987",brands:"Brands"},
        //    {account_reference:"0981234567", beneficiary_name:"Coke" , brand_email:"coke@coke",
        // public_key:"123abcmgfrty787ytfghjhgft", private_key:"321bcai87654redfgyui987",brands:"Brands"},
        // ],

        }
    },
     methods:{
     modalClose(){
         this.$emit('setEvent', false);
         console.log(this.merchantBrands, "test")
         },
      updateBrandKeys(){
        this.item = this.merchantBrands;
        accountRandom = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
        // this.merchantBrands = this.item;
        console.log("brands updated succesffullyy", this.item)
      },
              copyText(item) {
      let copyText = item;
      console.log(copyText, "copy");
      navigator.clipboard.writeText(copyText);
      // this.dialog = true;
      // this.message = "copy to clipboard";
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 500);
    },   
     }
}
</script>

<style scoped>
.font-name{
    font-family: "Inter" !important;
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
  color: #212429;
}
.v-data-table::v-deep tr {
  height: 61px !important;
}
</style>