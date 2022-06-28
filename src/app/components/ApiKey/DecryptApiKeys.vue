<template>
  <div>
    <v-dialog
      content-class="dialog-style"
      v-model="isPassword"
      persistent
      width="480px"
      transition="scale-transition"
      :no-click-animation='false'
    >
      <v-card outlined rounded="lg" height="">
        <v-row class="ml-3">
          <v-col lg="10" md="10" cols="9">
            <v-card-title>
              <span class="subtitle-1 font-name">Enter Password</span>
            </v-card-title>
          </v-col>
          <v-col lg="1" md="1" cols="1">
            <v-card-title>
              <span>
                <v-img
                  :src="require('/src/assets/modalCross.png')"
                  width="24px"
                  height="24px"
                  class="img-pointer"
                  @click="modalClose()"
                >
                </v-img>
              </span>
            </v-card-title>
          </v-col>
        </v-row>
        <v-divider class="appLiteGray"></v-divider>
        <v-card-text class="mt-8">
          <v-row class="ml-1 mr-1 mt-n4">
            <!-- first coloum send  -->
            <v-col cols="12" lg="12" md="12" sm="12">
              <label>Enter Password *</label>
              <v-text-field
                v-model="password"
                class="search-field-modal search-field mt-1"
                dense
                placeholder="Enter Merchant Name"
                outlined
                height="42px"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
                color="appGray"
              >
              </v-text-field>
              <span class="caption red--text mt-n2">{{ message }}</span>
            </v-col>
            <v-col cols="12" lg="12" md="12" sm="12" class="mt-n5">
              <v-btn
                block
                class="appBlack white--text"
                :loading="isLoading"
                :disabled="isLoading"
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                @click:append="show2 = !show2"
                @click="submitPassword()"
                @keyup.enter="submitPassword"
              >
                Submit
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as types from "../../../constants/Store";
import { showSnackbar } from "../../utils/GlobalActions";
// import CryptoJS from 'vue-cryptojs'
// import { Base64 } from 'js-base64';
import { mapGetters } from "vuex";
export default {
  props: [
    "isPassword",
    "decryptPublicKey",
    "decryptPrivateKey",
    "id",
    "brandDecrypt",
  ],
  data() {
    return {
      isLoading: false,
      password: "",
      show1: false,
      show2: false,
      message: "",
    };
  },
  computed: {
    ...mapGetters(["getUser"]),
  },
  methods: {
    modalClose() {
      this.$emit("setEvent", false);
      //  this.getEncryptedPassword(this.decryptData);
    },
    submitPassword() {
      this.isLoading = true;
      this.$store
        .dispatch(types.VERIFY_PASSWORD, {
          current_password: this.password,
          email: this.$store.getters.getUser.email,
        })
        .then((res) => {
          console.log("verify_password_response", res.data);
          this.isLoading = false;
          if (res.data.userVerified == true) {
            this.getEncryptedPassword(
              this.decryptPublicKey,
              this.decryptPrivateKey,
              this.brandDecrypt
            );
            this.modalClose();
            this.password = "";
          } else {
            showSnackbar("Error!", "Incorrect Password.", "error");
          }
        })
        .catch((err) => {
          this.isLoading = false;
          console.log("verify_passwword_error", err.response);
        });
    },
    getEncryptedPassword(decryptPublicKey, decryptPrivateKey, brands) {
      if (decryptPublicKey != null && decryptPrivateKey != null) {
        var keyId = this.id;
        var encryptPublic = decryptPublicKey;
        var encryptPrivate = decryptPrivateKey;
        var key = process.env.VUE_APP_PROJECT_KEY;
        var encrypted_json = JSON.parse(Base64.decode(encryptPublic));
        var encrypted_json_private = JSON.parse(Base64.decode(encryptPrivate));

        var decrypted = CryptoJS.AES.decrypt(
          encrypted_json.value,
          CryptoJS.enc.Base64.parse(key),
          {
            iv: CryptoJS.enc.Base64.parse(encrypted_json.iv),
          }
        );
        var decryptPrivate = CryptoJS.AES.decrypt(
          encrypted_json_private.value,
          CryptoJS.enc.Base64.parse(key),
          {
            iv: CryptoJS.enc.Base64.parse(encrypted_json_private.iv),
          }
        );
        //maping brands here
        console.log(
          "encrypt data",
          decrypted.toString(CryptoJS.enc.Utf8),
          decryptPrivate.toString(CryptoJS.enc.Utf8)
        );
        this.$emit(
          "click",
          decrypted.toString(CryptoJS.enc.Utf8),
          decryptPrivate.toString(CryptoJS.enc.Utf8),
          keyId
        );
        this.decryptionOfBrand(brands, key);
        return decrypted.toString(CryptoJS.enc.Utf8);
      }
    },
    decryptionOfBrand(brands, key) {
      let count = 0;

      // var parentId = brands[0].parent_id;
      brands.forEach((item) => {
        console.log("count", item);
        var id = item.id
        var decrypted = CryptoJS.AES.decrypt(
          JSON.parse(Base64.decode(item.encrypted_public_key)).value,
          CryptoJS.enc.Base64.parse(key),
          {
            iv: CryptoJS.enc.Base64.parse(
              JSON.parse(Base64.decode(item.encrypted_public_key)).iv
            ),
          }
        );
        var decryptPrivate = CryptoJS.AES.decrypt(
          JSON.parse(Base64.decode(item.encrypted_private_key)).value,
          CryptoJS.enc.Base64.parse(key),
          {
            iv: CryptoJS.enc.Base64.parse(
              JSON.parse(Base64.decode(item.encrypted_private_key)).iv
            ),
          }
        );
        count = count + 1;
        console.log(
          "encrypt Brand data",
          decrypted.toString(CryptoJS.enc.Utf8),
          decryptPrivate.toString(CryptoJS.enc.Utf8)
        );
        this.updateBrandData(decrypted.toString(CryptoJS.enc.Utf8),decryptPrivate.toString(CryptoJS.enc.Utf8),id);
        // this.$emit(
        //   "update",
        //   decrypted.toString(CryptoJS.enc.Utf8),
        //   decryptPrivate.toString(CryptoJS.enc.Utf8),
        //   parentId
        // );
         
      });
    },
    updateBrandData(publicKey, privateKey , id){
        this.$emit(
          "update",
           publicKey, privateKey , id
        );

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
label {
  color: #1d1d1d;
  font-size: 14px;
  font-weight: 500;
  font-family: "Inter" !important;
}
</style>