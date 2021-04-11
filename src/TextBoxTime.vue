<style scope>
.application--wrap {
  min-height: 1vh !important;
  background-color: rgba(255, 255, 255, 0);
}
#radiusSpan {
border-radius: 0px 5px 5px 0px;
}
</style>
<template>
  <v-app>
    <div v-if="readonly"> 
        <v-menu
          ref="menu"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
          :iKey="iKey"
        >

      <template v-slot:activator="{ on }">
        <div class="input-group">
          <input
            v-model="inputTime"
            v-on="on"
            :readonly="readonly"
            onkeydown="return event.which == 8 || event.which == 46"
            v-on:keydown.delete="eraseDate"
            autocomplete="off"
            v-validate="iRequire"
            :name="iKey"
            :class="{'form-control':true,'is-invalid': errors.has(iKey),'is-valid': inputTime }"
            placeholder="HH:mm"
          >
          <div class="input-group-append">
            <span class="input-group-text pb-0 pt-0" id="radiusSpan">
            	<i class="far fa-clock"></i>
            </span>
          </div>
          <span v-show="errors.has(iKey)" class="invalid-feedback">{{ errors.first(iKey) }}</span>
        </div>
      </template>
      <v-time-picker format="24hr" v-model="time" @click:minute="$refs.menu.save()" color="#bc2327"></v-time-picker>
    </v-menu>
    </div>
    <div v-if="!readonly"> 
        <v-menu
          ref="menu"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          lazy
          transition="scale-transition"
          offset-y
          full-width
          max-width="290px"
          min-width="290px"
          :iKey="iKey"
        >

      <template v-slot:activator="{ on }">
        <div class="input-group">
          <input
            v-model="inputTime"
            v-on="on"
            onkeydown="return event.which == 8 || event.which == 46"
            v-on:keydown.delete="eraseDate"
            autocomplete="off"
            v-validate="iRequire"
            :name="iKey"
            :class="{'form-control':true,'is-invalid': errors.has(iKey),'is-valid': inputTime }"
            placeholder="HH:mm"
          >
          <div class="input-group-append" v-on="on" style="cursor: pointer;">
            <span class="input-group-text pb-0 pt-0" id="radiusSpan">
            	<i class="far fa-clock"></i>
            </span>
          </div>
          <span v-show="errors.has(iKey)" class="invalid-feedback">{{ errors.first(iKey) }}</span>
        </div>
      </template>
      <v-time-picker format="24hr" v-model="time" @click:minute="$refs.menu.save()" color="#bc2327"></v-time-picker>
    </v-menu>
    </div>
  </v-app>
</template>

<script>
export default {
  props: ["iStore", "iKey","iType","iRequire"],
  data: () => ({
    menu2: false,
     readonly:false
  }),
  inject: ["$validator"],
  mounted() {
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
    time: {
      get() {
        if (this.Obj[this.iKey]) {
          var t = this.Obj[this.iKey]; 
          var time = t.split(':')[0] + ":" + t.split(':')[1];          
          return time;
        }else{
          return this.Obj[this.iKey]
        }
      },
      set(val) {
        this.updateObjByKey({ key: this.iKey, data: val });
      }
    },
    inputTime:{
      get() {
        if (this.Obj[this.iKey]) {
          var t = this.Obj[this.iKey];
          var time = t.split(':')[0] + ":" + t.split(':')[1];          
          return time;
        }else{
          return this.Obj[this.iKey]
        }
      },
      set(val) {
        this.updateObjByKey({ key: this.iKey, data: val });
      }
    }
  },
  methods: {
    updateObjByKey(payload) {
      this.$store.dispatch(`${this.iStore}/updateObjByKey`, payload);
    },
    eraseDate(){
      this.updateObjByKey({ key: this.iKey, data: null });
    }
  }
};
</script>