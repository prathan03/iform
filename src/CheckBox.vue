<template>
<div class="form-check">

        <label class="form-check-label">
            <input type="checkbox" 
            :name="iKey"
            :class="{'form-check-input':true,'is-invalid': errors.has(iKey),'is-valid': checkBox }"
            v-model="checkBox"
            v-validate="iRequire"
            :disabled="readonly"
            > {{ this.iDisplay }}
        </label>
        <span v-show="errors.has(iKey)" class="help is-danger">{{ errors.first(iKey) }}</span>

</div>
  
</template>

<script>
export default {
    props: ['iStore','iKey','iDisplay','iRequire','iType'],
    data: () => ({
        readonly:false
    }),
    inject: ["$validator"],
    mounted(){
        if (this.iType == "readonly" || this.iType == "disabled") {
            this.readonly = true
        }
    },
    watch: {
        iType: function(val){
            if (val == "readonly" || val == "disabled") {
                this.readonly = true
            }else{
                this.readonly = false
            }
        }
    },
    computed: {
    Obj:{
             get () {
                return this.$store.getters[`${this.iStore}/getObj`]
            },
        },
    checkBox: {
      get() {
          console.log(this.Obj[this.iKey]);
          
        return this.Obj[this.iKey];
      },
      set(val) {
        this.updateObjByKey({ key: this.iKey, data: val });
      }
    }
    },
    methods:{
        updateObjByKey(payload){
            this.$store.dispatch(`${this.iStore}/updateObjByKey`, payload)    
        }
    },
 }
</script>

<style scope>
.is-danger{
    color: #dc3545;
    font-size: 16px;
}

</style>
