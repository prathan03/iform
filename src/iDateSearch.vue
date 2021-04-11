<style scope>
.application--wrap {
  min-height: 1vh !important;
  background-color: rgba(255, 255, 255, 0);
}
</style>
<template>
    <v-flex xs12 sm6 md2>
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          min-width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              :class="{'mr-2':true,'mt-2':true}"
              v-model="inputDate"
              :label="label"
              append-icon="event"
              readonly
              onkeydown="return event.which == 8 || event.which == 46"
              v-on:keydown.delete="eraseDate"
              autocomplete="off"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="selectDate" @input="menu = false" locale="th" color="#bc2327"></v-date-picker>
        </v-menu>
      </v-flex>
</template>

<script>
export default {
  props: ["label"],
  data: () => ({
    menu: false,
    dataDate: ""
  }),
  inject: ["$validator"],
  mounted(){

    },
  computed: {
    inputDate: {
      get() {
        if (this.dataDate) {
          var dt = this.dataDate.split(' ')[0];
          var year = parseInt(dt.split('-')[0]) + 543;
          var dateTH = dt.split('-')[2] + "/" + dt.split('-')[1] + "/" + year;          
          return dateTH;
        }else{
          return this.dataDate
        }
      },
      set(val) {
        this.dataDate = val
      }
    },
    selectDate: {
      get() {
          return this.dataDate
      },
      set(val) { 
        var datetime =  val + " " + "00:00:00";
        this.dataDate = datetime
        this.$emit('returnValue',datetime);
      }
    }
  },
  methods: {
    eraseDate(){
      this.dataDate = ""
      this.$emit('returnValue',null);
    }
  }
};
</script>