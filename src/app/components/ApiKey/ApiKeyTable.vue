<template>
  <div>
    <v-card elevation="0" class="mt-5 ml-4 mr-4" rounded="lg">
      <v-card-title>
        <v-row>
          <v-col md="7" cols="12" lg="9">
            <span class="subtitle-1 appBlack--text ml-4">Api Key</span>
          </v-col>
          <v-col md="5" cols="12" lg="3">
            <v-text-field
              dense
              outlined
              placeholder="Search by name"
              v-model="searchBox"
              class="subtitle-2 search-field search-field-modal appGray--text"
            >
              <template slot="prepend-inner">
                <img
                  width="14"
                  :src="require('/src/assets/light_search.png')"
                  class="mt-1"
                />
              </template>
            </v-text-field>
          </v-col>
        </v-row>
      </v-card-title>
      <v-card-text>
        <v-data-table
          fixed-header
          hide-default-footer
          height="60vh"
          :loading="loader"
          loader-height="2"
          no-data-text="No Record Found"
          :headers="headers"
          :mobile-breakpoint="0"
          :items="item"
        >
          <template slot="item" slot-scope="props">
            <tr>
              <td>{{ props.item.accounts[0].account_reference }}</td>
              <td>{{ props.item.id }}</td>
              <td>{{ props.item.name }}</td>
              <td>{{ props.item.email }}</td>
              <td>
                <span class="float-left" v-if="props.item.isShow == true" 
                  >{{ props.item.encrypted_public_key }}
                </span>
                <span class="float-left" v-else>**********</span>
                  <v-img :src="require('/src/assets/copy.png')" @click="copyText(props.item.encrypted_public_key )"
                   class="float-left mt-1 mr-2 ml-2 img-pointer" width="14px" height="14px"></v-img>
                  <v-img :src="require('/src/assets/share.png')" class="mt-1 img-pointer" width="14px" height="14px"></v-img>            
              </td>
              <td>
                <span class="float-left"
                 v-if="props.item.isShow == true" @click="copyText(props.item.encrypted_private_key )"
                  >{{ props.item.encrypted_private_key }}
                </span>
                <span class="float-left" v-else>**********</span>
                  <v-img :src="require('/src/assets/copy.png')" @click="copyText(props.item.encrypted_private_key )"
                   class="float-left mt-1 mr-2 ml-2 img-pointer" width="14px" height="14px"></v-img>
                  <v-img :src="require('/src/assets/share.png')" class="mt-1 img-pointer" width="14px" height="14px"></v-img>      
              </td>
              <td>
                <span class="float-left">{{ "View Keys" }}&nbsp; &nbsp;</span>
                <v-img
                  :src="require('/src/assets/drop-down.png')"
                  width="16px"
                  height="16px"
                  @click="elipseIcon(props.item)"
                  class="img-pointer"
                >
                </v-img>
              </td>
              <td>
                <v-img
                  :src="require('/src/assets/eye-grey.png')"
                  @click="viewKeys(props.item)"
                  width="16px"
                  height="16px"
                  class="img-pointer"
                ></v-img>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
    <ApiModal
      :isApiDialog="isApiDialog"
      :merchantBrands="merchantBrands"
      @setEvent="closeDeatils()"
      ref="ApiKeyModal"
    />
    <Decrypt
      :isPassword="isPassword"
      :id="id"
      :brandDecrypt="brandDecrypt"
      :decryptPublicKey="decryptPublicKey"
      :decryptPrivateKey="decryptPrivateKey"
      @setEvent="closeDecrypt()"
      @click="updateKey"
      v-on:update="updateBrands"
    />
     <Pagination
      v-if="item.length > 0"
      :count="total"
      :itemsPerPage="itemsPerPage"
      :page="page"
    />
  </div>
</template>

<script>
import Pagination from "../../../common/components/pagination/Pagination.vue";
import * as types from "../../../constants/Store";

import { showSnackbar } from "../../utils/GlobalActions";
// import Pagination from "../../../common/components/pagination/Pagination.vue";
import ApiModal from "./ApiKeyModal.vue";
import Decrypt from "./DecryptApiKeys.vue";
export default {
  props: ["headers"],
  components: {
    Pagination,
    ApiModal,
    Decrypt,
  },
  data() {
    return {
      searchBox: "",
      isCopied:false,
      show: false,
      myId: null,
      isPassword: false,
      loader: false,
      isApiDialog: false,
      item: [],
      decryptPublicKey: null,
      decryptPrivateKey: null,
      id: null,
      merchantBrands: null,
      brandDecrypt: null,
       page: {
        key: 1,
      },
      itemsPerPage: {
        key: 5,
      },
      total: null,
      //   {account_reference:"0981234567",merchant_id:"123", beneficiary_name:"Coke" , merchant_email:"coke@coke",public_key:"123abc",
      // private_key:"321bca",brands:"Brands"},
    };
  },
   watch: {
    "page.key"() {
      this.onSubmit();
    },
    "itemsPerPage.key"() {
      this.onSubmit();
    },
    searchBox:{
      handler(newVal){
        this.onSubmit(newVal)
      }
    }
  },
  mounted() {
    this.onSubmit();
  },
  methods: {
    onSubmit(value) {
      this.loader = true;
      this.$store
        .dispatch(types.API_KEY_DATA, {
          per_page: this.itemsPerPage.key,
          page: this.page.key,
          name:value,
        })
        .then((res) => {
          console.log("res_Api_key", res.data);
          this.loader = false;
          this.item = res.data.users.data;
          this.total = res.data.users.total
        })
        .catch((err) => {
          this.loader = false;
          console.log("merchant_error", err.response);
        });
    },
    closeDeatils() {
      this.isApiDialog = false;
    },
    closeDecrypt() {
      this.isPassword = false;
    },
    elipseIcon(index) {
      this.isApiDialog = true;
      this.merchantBrands = index.brand;
      console.log("api key data", index);
      this.$refs.ApiKeyModal.updateBrandKeys();
    },
    viewKeys(index) {
      this.decryptPublicKey = index.encrypted_public_key;
      this.decryptPrivateKey = index.encrypted_private_key;
      this.brandDecrypt = index.brand;
      this.id = index.id;
      this.isPassword = true;
    },
    updateKey(publicKey, privateKey, id) {
      this.item.map((items) => {
        if (items.id == id) {
          items.isShow = true;
          items.encrypted_public_key = publicKey;
          items.encrypted_private_key = privateKey;
        }
      });
    },
    updateBrands(publicKey, privateKey, id ) {
      this.item.map((items) => {
        items.brand.map((item2) => {
          if (item2.id == id) {
            item2.encrypted_public_key = publicKey;
            item2.encrypted_private_key = privateKey;
            item2.isShow=true;
          }
        });
      });
      this.$refs.ApiKeyModal.updateBrandKeys();
      console.log("Data here" , publicKey, privateKey,"<<>>" ,email)
      // return;
    },
        copyText(item) {
      let copyText = item;
      this.isCopied = true;
      console.log(copyText, "copy");
      navigator.clipboard.writeText(copyText);
      showSnackbar("Success!", "Copied To Clipboard.", "success");
    },
  },
};
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  /* border-style: none; */
  border-color: #e8ebf6;
  font-weight: 900;
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
.position-cursor{
  
}
</style>