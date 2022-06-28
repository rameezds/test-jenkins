<template>
  <div>
    <ApiTable :headers="headers" />
  </div>
</template>

<script>
import ApiTable from "./ApiKeyTable.vue"
export default {
   components:{
     ApiTable,
   },
   data(){
     return{
       headers:[
        { text: "Account Reference", value: "account_reference", class: " fontLite--text", sortable: false,},
        { text: "Merchant id", value: "id", class: " fontLite--text", sortable: false,},
        { text: "Merchant Name", value: "name", class: " fontLite--text", sortable: false,},
        { text: "Merchant Email", value: "email", class: " fontLite--text",sortable: false,},
        { text: "Public API Key ", value: "encrypted_public_key", class: " fontLite--text",  sortable: false,},
        { text: "Private API Key", value: "private_key", class: " fontLite--text",sortable: false,},
        { text: "Merchant Brands", value: "brands", class: " fontLite--text",sortable: false,},
        { text: "Action", value: "action", class: " fontLite--text",sortable: false,},
        
      ],
     }
   }
}
</script>

<style>

</style>