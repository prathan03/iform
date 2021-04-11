<style scope>
.application--wrap {
    min-height: 1vh !important;
    background-color: rgba(255, 255, 255, 0);
}
#radiusSpan {
border-radius: 0px 5px 5px 0px;
}
.v-application .accent {
    background-color: #949494 !important;
    border-color: #7b7b7b !important;
}
</style>
<template>
  <v-app>
    <div v-if="readonly">
    <v-menu
      v-model="menu"
    >
      <template v-slot:activator="{ on }">
        <div class="input-group">
          <input
            v-model="inputDate"
            v-on="on"
            :readonly="readonly"
            onkeydown="return event.which == 8 || event.which == 46"
            v-on:keydown.delete="eraseDate"
            autocomplete="off"
            v-validate="iRequire"
            :name="iKey"
            :class="{'form-control':true,'is-invalid': errors.has(iKey),'is-valid': inputDate }"
            placeholder="วว/ดด/ปปปป"
          >
          <!-- <font
            v-if="iRequire"
            style="
              position: absolute;
              right: -15px;
              font-size: 30px;
              top: -2px;"
            color="red"
          >*</font> -->
          <div class="input-group-append">
            <span class="input-group-text pb-0 pt-0" id="radiusSpan">
              <i class="far fa-calendar-alt"></i>
            </span>
          </div>
          <span v-show="errors.has(iKey)" class="invalid-feedback">{{ errors.first(iKey) }}</span>
        </div>
      </template>
    </v-menu>
    </div>
    <div v-if="!readonly">
      <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-right="40"
      lazy
      transition="scale-transition"
      offset-y
      full-width
      min-width="290px"
      :iKey="iKey"
    >
      <template v-slot:activator="{ on }">
        <div class="input-group">
          <input
            v-model="inputDate"
            v-on="on"
            onkeydown="return event.which == 8 || event.which == 46"
            v-on:keydown.delete="eraseDate"
            autocomplete="off"
            v-validate="iRequire"
            :name="iKey"
            :class="{'form-control':true,'is-invalid': errors.has(iKey),'is-valid': inputDate }"
            placeholder="วว/ดด/ปปปป"
          >
          <!-- <font
            v-if="iRequire"
            style="
              position: absolute;
              right: -15px;
              font-size: 30px;
              top: -2px;"
            color="red"
          >*</font> -->
          <div class="input-group-append" v-on="on" style="cursor: pointer;">
            <span class="input-group-text pb-0 pt-0" id="radiusSpan">
              <i class="far fa-calendar-alt"></i>
            </span>
          </div>
          <span v-show="errors.has(iKey)" class="invalid-feedback">{{ errors.first(iKey) }}</span>
        </div>
      </template>
      <v-date-picker :no-title="true" v-model="selectDate" :min="iMin" :max="iMax" @input="menu = false" locale="th" color="#7f8c8d"></v-date-picker>
    </v-menu>
    </div>
  </v-app>
</template>

<script>
export default {
  props: ["iStore", "iKey","iRequire","iType","iMax","iMin","notTime"],
  data: () => ({
    menu: false,
    readonly:false
  }),
  inject: ["$validator"],
  mounted(){
        if (this.iType == "readonly" || this.iType == "disabled") {
            this.readonly = true
        }
    },
  computed: {
    Obj:{
        get () {
          return this.$store.getters[`${this.iStore}/getObj`]
        },
    },
    inputDate: {
      get() {
        if (this.Obj[this.iKey]) {
          var dt = this.Obj[this.iKey].split(' ')[0];
          var year = parseInt(dt.split('-')[0]) + 543;
          var dateTH = dt.split('-')[2] + "/" + dt.split('-')[1] + "/" + year;          
          return dateTH;
        }else{
          return this.Obj[this.iKey]
        }
      },
      set(val) {
        this.updateObjByKey({ key: this.iKey, data: val });
      }
    },
    selectDate: {
      get() {
        if(this.Obj[this.iKey] == null || this.Obj[this.iKey] == ""){
          return this.Obj[this.iKey]
        }else{
          var d = new Date(this.Obj[this.iKey]);
          var date = d.getDate();
          var month = d.getMonth() + 1;
          var year = d.getFullYear();
          var ddate = date < 10 ? "0" + date : date;
          var mmonth = month < 10 ? "0" + month : month;
          return year + "-" + mmonth + "-" + ddate;
        }     
      },
      set(val) {
        if(this.notTime){
          var datetime =  val;
        }else{
          var datetime =  val + " " + "00:00:00";
        }
          this.updateObjByKey({ key: this.iKey, data: datetime });
      }
    }
  },
  methods: {
    updateObjByKey(payload) {
      this.$store.dispatch(`${this.iStore}/updateObjByKey`, payload);
    },
    eraseDate(){
      this.updateObjByKey({ key: this.iKey, data: "" });
    },
    setBindingDisable(value_type){
      if(value_type){
        if(value_type == "readonly" || value_type == "disabled"){
          this.readonly = true;
        }else{
          this.readonly = false;
        }
      }else{
        this.readonly = false;
      }
    }
  },
  watch: {
    iType:function(value_type) {
      this.setBindingDisable(value_type);
    }
  },
};
</script>