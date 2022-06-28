<template>
<span  v-if="chipsData != ''&& chipsData != '-1'" >
  <span class="filters-chips"
    >{{ chipsData }} 
    <v-avatar color="#CBE7F0" size="14px">
      <v-icon size="12px" color="#7BA3AF" @click="closeChip()">mdi-close</v-icon>
    </v-avatar>
  </span>&nbsp;
</span>
</template>

<script>
export default {
    props:['chipsData', 'chipsMode'],
  data() {
    return {
      mode:"",
    };
  },
  methods:{
      closeChip()
      {
        //  item = ""; 
        //  this.chipsData = item;
        this.mode = this.chipsMode
        this.$emit('setEvent', this.mode);
        console.log(this.chipsData, "chips", this.mode)
      }
  }
};
</script>

<style scoped>
.filters-chips {
  background-color: rgba(203, 231, 240, 0.26);
  font-size: 12px;
  color: #212632;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 8px;
  padding-bottom: 10px;
  border-radius: 8px;
  width: 82px;
  height: 30px;
}
</style>