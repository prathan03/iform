<template>
  <div>
    <treeselect
      :multiple="true"
      :noOptionsText="this.iNoOptionsText"
      :noResultsText="this.iNoResultsText"
      :noChildrenText="this.iNoChildrenText"
      :options="optiontxt"
      placeholder="กรุณาเลือก"
      v-model="selected"
      :class="{'is-invalid': errors.has(this.iKey) ,'is-valid': selected }"
    />
    <span v-show="errors.has(this.iKey)" class="help is-danger">{{ errors.first(this.iKey) }}</span>
  </div>
</template>

<script>
import axios from "axios";
import Treeselect from "@riophae/vue-treeselect";
export default {
  props: ["iStore", "iKey", "iVal", "iDisplay", "iType", "iData", "iRequire", "iNoOptionsText", "iNoResultsText", "iNoChildrenText"],
  inject: ["$validator"],
  data() {
    return {
      optiontxt: [],
      selecteds: []
    };
  },
  components: { Treeselect },
  mounted() {
    switch (this.iType) {
      case "link":
        this.$axios.$get(this.iData).then(response => {
          const data = response;
          data.map(val => {
            if(val.children.length > 0){
              this.optiontxt.push({
                label: val[this.iDisplay],
                id: val[this.iVal],
                children: val.children
              });
            }else{
              this.optiontxt.push({
                label: val[this.iDisplay],
                id: val[this.iVal]
              });
            }
            
          });
        });
        break;
      case "array":
        this.iData.map(val => {
          this.optiontxt.push({
            label: val[this.iDisplay],
            id: val[this.iVal]
          });
        });
        break;
    }
  },
  computed: {
    Obj: {
      get() {
        return this.$store.getters[`${this.iStore}/getObj`];
      }
    },
    selected: {
      get(payload) {
        const data = payload.Obj[this.iKey];

        return data;
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
    ClickEvent($event) {
      this.$refs[this.iKey].open = true;
    },
    onSelect(option, id) {
      console.log(option, id);
    }
  },
  watch: {
    iData: function() {
      switch (this.iType) {
        case "link":
          axios.get(siteapi + this.iData).then(response => {
            const data = response.data;
            this.optiontxt = [];
            data.map(val => {
              this.optiontxt.push({
                label: val[this.iDisplay],
                id: val[this.iVal]
              });
            });
          });
          break;
        case "array":
          this.optiontxt = [];
          this.iData.map(val => {
            this.optiontxt.push({
              label: val[this.iDisplay],
              id: val[this.iVal]
            });
          });
          break;
      }
    }
  }
};
</script>