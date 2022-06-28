<template>
  <v-row>
    <!-- Users Table -->
    <v-col cols="12" sm="12" md="12" class="pa-0 mt-3">
      <template>
        <showing-results
          :currentRecords="currentRecords"
          :totalRecords="totalRecords"
        />
        <v-data-table
          :headers="headersUser"
          :items="adminBackOfficeUsers"
          class="default-table"
          hide-default-footer
          :items-per-page="userPerPage.key"
          :height="528"
          :loading="userRecordsLoader"
          loader-height="2"
          disable-sort
        >
          <!-- User header -->
          <template v-slot:top>
            <v-row
              class="ma-0 pa-0"
              style="height: 60px; border-bottom: solid 1px #EBEEF7"
            >
              <v-col class="ml-auto d-flex align-center" style="height: 60px">
                <h4 class="default-heading">Users</h4>
              </v-col>
            </v-row>
          </template>
          <!-- Roles column -->
          <template
            class="d-flex align-center"
            v-slot:[`item.roles`]="{ item }"
          >
            <p class="pa-0 ma-0">
              {{
                item.role
                  ? item.role
                  : item.roles.length
                  ? item.roles[0].name
                  : ""
              }}
            </p>
          </template>
          <!-- Password column -->
          <template
            class="d-flex align-center"
            v-slot:[`item.encrypt_password`]="{ item }"
          >
            <v-text-field
              :value="getEncryptedPassword(item.encrypt_password)"
              class="password-text appColor--text pa-0 ma-0"
              color="appColor"
              :append-icon="
                item.is_setPassword
                  ? 'mdi-eye-outline appColor--text'
                  : 'mdi-eye-off-outline appColor--text'
              "
              @click:append="checkPassword(item)"
              :type="item.is_setPassword ? 'password' : 'text'"
              readonly
              hide-details
              style="width: 90%; font-size: 16px"
            ></v-text-field>
          </template>
          <!-- Status column -->
          <template v-slot:[`item.status`]="{ item }">
            <p v-if="item.status == 1" class="successColor--text">Active</p>
            <p v-else class="notRegisteredColor--text">
              Inactive
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-if="!item.encrypt_password && item.status == 0"
                    v-bind="attrs"
                    v-on="on"
                    color="notRegisteredColor"
                    style="font-size: 16px"
                    @click="resendEmail(item)"
                    >mdi-email-sync-outline</v-icon
                  >
                </template>
                <span>Resend Email</span>
              </v-tooltip>
            </p>
          </template>
          <!-- Actions column -->
          <template v-slot:[`item.actions`]="{ item }">
            <v-row justify="center">
              <div v-if="item.status == 0">
                <UserSVG :status="0" :item="item" />
              </div>
              <div v-else>
                <UserSVG :status="1" :item="item" />
              </div>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="appColor"
                    class="mr-3 icon-style"
                    @click="confirmDeleteUser(item.id)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-trash-can-outline
                  </v-icon>
                </template>
                <span>Delete User</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    color="appColor"
                    class="mr-3 icon-style"
                    @click="showEditDialog(item)"
                    v-bind="attrs"
                    v-on="on"
                  >
                    mdi-square-edit-outline
                  </v-icon>
                </template>
                <span>Edit User</span>
              </v-tooltip>
            </v-row>
          </template>
        </v-data-table>
        <!-- Pagination -->
        <pagination
          v-if="userRecords.length > 0"
          :count="usersCount"
          :page="userPage"
          :itemsPerPage="userPerPage"
          ref="pagination"
        />
      </template>
    </v-col>
    <edit-user-modal
      :EditUser="editDialog"
      :User="userObject"
      @setevent="setEditDialog"
    />
    <delete-modal ref="deleteModal" @delete="deleteUser()" />
    <v-dialog v-model="dialogShowPassword" persistent max-width="500px">
      <v-card class="dialog-border">
        <!-- <v-card-title class="default-font text-h6" dark> -->
        <v-card-title class="text-h6">
          Enter your password to view
        </v-card-title>
        <v-form ref="form" v-model="validate">
          <v-row>
            <v-col cols="12" class="pt-1">
              <label class="default-font"> Enter Password </label>
              <v-text-field
                :append-icon="
                  showPassword
                    ? 'mdi-eye appColor--text'
                    : 'mdi-eye-off appColor--text'
                "
                :type="showPassword ? 'text' : 'password'"
                placeholder="********"
                @click:append="showPassword = !showPassword"
                flat
                solo
                required
                v-model="userPassword"
                class="mt-1 default-font default-input"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row class="">
            <v-col class="pa-5 text-right" cols="12">
              <v-btn color="secondary" text @click="dialogShowPassword = false"
                >Cancel</v-btn
              >
              <v-btn color="appColor darken-1" text @click="seeUserPassword()"
                >Submit</v-btn
              >
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-dialog>
  </v-row>
</template>
New
5:34
<script>
import EditUserModal from "../modal/EditUserModal.vue";
import DeleteModal from "../../../../common/components/delete-modal/DeleteModal.vue";
import Pagination from "../../../../common/components/pagination/Pagination.vue";
import ShowingResults from "../../../../common/components/showing-results/ShowingResults.vue";
import UserSVG from "../../../../assets/icons/user/UserSVG.vue";
import * as types from "../../../../constants/Store";
import { mapGetters } from "vuex";
export default {
  components: {
    EditUserModal,
    DeleteModal,
    Pagination,
    ShowingResults,
    UserSVG,
  },
  data() {
    return {
      editDialog: false,
      editedIndex: -1,
      userObject: {},
      userPage: {
        key: 1,
      },
      userPerPage: {
        key: 10,
      },
      merchantPage: {
        key: 1,
      },
      merchantPerPage: {
        key: 10,
      },
      usersCount: 0,
      merchantCount: 0,
      userRecords: [],
      merchantRecords: [],
      deleteUserId: null,
      userPassword: "",
      showPasswordRules: [(v) => !!v || "Password is required"],
      showPassword: false,
      dialogShowPassword: false,
      validate: true,
      userRecordsLoader: false,
      merchantRecordsLoader: false,
      show: false,
      currentRecords: 0,
      totalRecords: 0,
    };
  },
  watch: {
    "userPage.key"() {
      this.getUsers();
    },
    "userPerPage.key"() {
      this.getUsers();
    },
    "merchantPage.key"() {
      this.getMerchant();
    },
    "merchantPerPage.key"() {
      this.getMerchant();
    },
  },
  computed: {
    ...mapGetters(["adminBackOfficeUsers"]),
    headersUser() {
      return [
        {
          text: "Name",
          value: "name",
          divider: true,
          width: "190px",
        },
        {
          text: "Email",
          value: "email",
          divider: true,
          width: "210px",
        },
        {
          text: "Role",
          value: "roles",
          divider: true,
          width: "170px",
        },
        {
          text: "Password",
          value: "encrypt_password",
          divider: true,
          width: "230px",
        },
        {
          text: "Status",
          value: "status",
          divider: true,
          width: "150px",
        },
        {
          text: "Actions",
          value: "actions",
          // divider: true,
          width: "160px",
        },
      ];
    },
    headersMerchant() {
      return [
        {
          text: "Name",
          value: "name",
          divider: true,
          width: "16%",
        },
        {
          text: "Organization",
          value: "organization_name",
          divider: true,
          width: "16%",
        },
        {
          text: "Email",
          value: "email",
          divider: true,
          width: "16%",
        },
        {
          text: "Role",
          value: "roles",
          divider: true,
          width: "16%",
        },
        {
          text: "Password",
          value: "encrypt_password",
          divider: true,
          width: "20%",
        },
        {
          text: "Status",
          value: "status",
          // divider: true,
          width: "10%",
        },
      ];
    },
  },
  methods: {
    showEditDialog(item) {
      this.editDialog = true;
      this.userObject = item;
    },
    setEditDialog() {
      this.editDialog = false;
    },
    role(item) {
      let role = item.replace("_", " ");
      return role.charAt(0).toUpperCase() + role.slice(1);
    },
    merchantRole(item) {
      let role = item.split("_");
      return role[1].charAt(0).toUpperCase() + role[1].slice(1);
    },
    getUsers() {
      this.userRecordsLoader = true;
      this.$store
        .dispatch(types.USER, {
          page: this.userPage.key,
          per_page: this.userPerPage.key,
        })
        .then((res) => {
          this.usersCount = res.data.adminBackOfficeUsers.total;
          this.userRecordsLoader = false;
        });
    },
    getMerchant() {
      this.merchantRecordsLoader = true;
      this.$store
        .dispatch(types.USER, {
          page: this.merchantPage.key,
          per_page: this.merchantPerPage.key,
        })
        .then((res) => {
          this.merchantRecords = res.data.merchantBackOfficeUsers.data;
          this.merchantCount = res.data.merchantBackOfficeUsers.total;
          this.merchantRecordsLoader = false;
          this.currentRecords = res.data.adminBackOfficeUsers.to;
          this.totalRecords = res.data.adminBackOfficeUsers.total;
        });
    },
    confirmDeleteUser(userId) {
      this.$refs.deleteModal.deleteModal = true;
      this.deleteUserId = userId;
    },
    deleteUser() {
      this.$store
        .dispatch(types.DELETE_USER, {
          id: this.deleteUserId,
        })
        .then((res) => {
          this.$refs.deleteModal.loader = false;
          this.$refs.deleteModal.deleteModal = false;
          this.userId = null;
        })
        .catch((err) => {
          this.$refs.deleteModal.loader = false;
          this.$refs.deleteModal.deleteModal = false;
          console.log(err);
        });
    },
    showPasswordDialog(item) {
      this.editedIndex = this.userRecords.indexOf(item);
      this.userEmail = item.email;
      this.getId = item.id;
      this.dialogShowPassword = true;
    },
    seeUserPassword() {
      this.$refs.form.validate();
      this.$store
        .dispatch(types.SEE_USER_PASSWORD, {
          password: this.userPassword,
        })
        .then((res) => {
          this.dialogShowPassword = false;
          // this.userPassword = '';
          this.show = true;
        })
        .catch(() => {
          this.dialogShowPassword = false;
          this.userPassword = "";
        });
    },
    checkPassword(item) {
      if (this.show) {
        item.is_setPassword = !item.is_setPassword;
      } else {
        this.dialogShowPassword = true;
        return;
      }
    },
    getEncryptedPassword(pass) {
      if (pass != null) {
        var encrypted = pass;
        var key = process.env.VUE_APP_PROJECT_KEY;
        var encrypted_json = JSON.parse(Base64.decode(encrypted));
        var decrypted = CryptoJS.AES.decrypt(
          encrypted_json.value,
          CryptoJS.enc.Base64.parse(key),
          {
            iv: CryptoJS.enc.Base64.parse(encrypted_json.iv),
          }
        );
        return decrypted.toString(CryptoJS.enc.Utf8);
      }
    },
    resendEmail(item) {
      this.$store.dispatch(types.RESEND_EMAIL, {
        id: item.id,
      });
    },
  },
  mounted() {
    this.getMerchant();
  },
};
</script>