<template>
  <v-row class="my-4 mx-4 bg-white flow-bar">
    <v-col lg="12" md="12" sm="12">
      <form @submit.prevent="submit">
        <v-file-input truncate-length="15"></v-file-input>
        <v-btn>save</v-btn>
      </form>
    </v-col>
  </v-row>
</template>

<script>
  export default {
    components: {
    },
    data: () => ({
      file: '',
    }),
    methods: {
      submit () {
        this.$refs.observer.validate()
      },
    },
  }
</script>

<style></style>
