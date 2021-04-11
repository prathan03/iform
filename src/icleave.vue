<template>
  <input v-model="textInput" ref="input" type="text" v-on:change="setDataStore"/>
</template>

<script>
import Cleave from 'cleave.js'

    import {
        mapActions,
        mapGetters
    } from "vuex";
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default: () => ({})
    },
    events: {
      type: Object,
      default: () => ({})
    },
    iType: {
      type: String,
      default: ''
    },
    iKey: {
      type: String,
      default: ''
    },
    iStore: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      textInput: null,
      cleave: null
    }
  },
  methods: {
    emitEvent () {
      this.$emit('input', this.$el.value)
      this.$emit('rawValueChanged', this.cleave.getRawValue())
    },
    updateObjByKey(payload) {
        this.$store.dispatch(`${this.iStore}/updateObjByKey`, payload)
    },
    setDataStore: function (e){
      let val = this.textInput;
      let data = "";
      val = val.split(",");
      val.forEach(element => {
        data = data+element;
      });
      this.updateObjByKey({
          key: this.iKey,
          data: data
      });
    }
  },
  mounted () {
    this.$el.value = this.value;
    this.cleave = new Cleave(this.$el, this.options)
    Object.keys(this.events).map((key) => {
      this.$refs.input.addEventListener(key, this.events[key])
    })

    // in case of cleave.js remove result or properties from cleave instance.
    if (this.cleave.properties && this.cleave.properties.hasOwnProperty('result')) {
      this.$watch('cleave.properties.result', this.emitEvent)
    } else {
      this.$el.addEventListener('input', this.emitEvent)
    }
  },
  beforeDestroy () {
    this.cleave.destroy()
  },

  watch: {
    options: {
      deep: true,
      handler (val) {
        this.cleave.destroy()
        this.cleave = new Cleave(this.$el, val)
      }
    }
  },

}
</script>
