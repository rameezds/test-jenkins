<template>
  <div>
    <v-row
      class="ma-0 pa-0 file-input d-flex align-content-center justify-center"
      @click="createRole()"
    >
      <v-col
        cols="4"
        lg="8"
        md="8"
        sm="12"
        class="d-flex flex-column align-center"
      >
        <v-img
          :src="require('/src/assets/createRole.png')"
          width="25px"
        ></v-img>

        <div>
          <span class="subtitle-2 appGray--text">Create a new role</span>
        </div>
      </v-col>
    </v-row>
    <RoleModal :dialogBox="createRoleDialog" @setEvent="closeDialog()" />
  </div>
</template>

<script>
import RoleModal from "./CreateRoleModal.vue";
export default {
  components: {
    RoleModal,
  },
  data() {
    return {
      createRoleDialog: false,
    };
  },
  methods: {
    createRole() {
      this.createRoleDialog = true;
    },
    closeDialog() {
      this.createRoleDialog = false;
    },
  },
};
</script>

<style scoped>
.file-input {
  border: 1.5px dashed #d8d8d8;
  background-color: inherit !important;
  border-radius: 8px;
  /* width: 80%; */
  height: 142px;
  cursor: pointer;
}
</style>