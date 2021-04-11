<style scope>
#radiusSpanNum {
border-radius: 5px 5px 5px 5px;
}
</style>
<template>
  <v-app>
        <div class="input-group">
          <input id="radiusSpanNum"
            v-model="input"
            @keypress="isNumberKey($event)"
            @blur="isInputActive = false" @focus="isInputActive = true"
            autocomplete="off"
            v-validate="isRequired"
            :name="iKey"
            :maxlength="maxLength"
            :placeholder="iType == 'currency' ? '0.00':''"
            :disabled="readonly ? true : false"
            :class="{'form-control':true,'is-invalid': errors.has(iKey),'is-valid': input }"
          >
          <span v-show="errors.has(iKey)" class="invalid-feedback">{{ errors.first(iKey) }}</span>
        </div>
  </v-app>
</template>

<script>
export default {
  props: ["iStore", "iKey","iRequire","iType","iMaxlength","iReadonly"],
  data: function(){
    return{
      menu: false,
      readonly:false,
      isInputActive: false,
      maxLength: this.iMaxlength, 
      isRequired: this.iRequire
    }
  },
  inject: ["$validator"],
  mounted(){
        if (this.iReadonly == "readonly" || this.iReadonly == "disabled") {
            this.readonly = true
        }
    },
  computed: {
    Obj:{
        get () {
          return this.$store.getters[`${this.iStore}/getObj`]
        },
    },
    input: {
      get() {
        if(this.iType == "currency"){
          const val = this.Obj[this.iKey]
          if(val == null || val == ""){
            return val
          }else{
            if (this.isInputActive) {
                  return val.toString()
            }else{
              this.updateObjByKey({ key: this.iKey, data: parseFloat(val).toFixed(2) });
              return parseFloat(val).toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")
            }
          }
        }else if(this.iType == "IDCard"){
          var val = this.Obj[this.iKey]
          if(val == null){
            return val
          }else{
            if (this.isInputActive) {
              this.maxLength = 13
              var change = this.isRequired
              var isChange = change.replace("regex:\\d{1}-\\d{4}-\\d{5}-\\d{2}-\\d{1}", "regex:\\d{13}");
              this.isRequired = isChange
              return val.toString()
            }else{
              if(val == null || val == ""){
                return null
              }else{
                var pattern=new String("_-___-____-_-_");
                var pattern_ex=new String("-");  
                var val_l=val.toString().length;  
                var val_s = val.toString();
                var val_l2=val_l-1;  
                var re="";
                for(var n = 0; n <= pattern.length; n++){
                  re += val_s.substr(n,1)
                  if(pattern.charAt(n+1)==pattern_ex){
                    re += pattern.charAt(n+1)
                  }
                }
                this.maxLength = 17
                
                var change = this.isRequired
                var isChange = change.replace("regex:\\d{13}", "regex:\\d{1}-\\d{4}-\\d{5}-\\d{2}-\\d{1}");
                this.isRequired = isChange
                return re;
              }
            }
          } 
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
    isNumberKey(evt){      
      var charCode = (evt.which) ? evt.which : event.keyCode
      // console.log(evt);
      switch (this.iType) {
        case "IDCard":
          if (charCode > 31 && (charCode < 48 || charCode > 57)){
          evt.preventDefault();
        }else{
          return true
        }
        case "number":
          if (charCode > 31 && (charCode < 48 || charCode > 57)){
          evt.preventDefault();
         }else{
           return true;
         }
        case "decimal":
          if (charCode > 31 && (charCode < 48 || charCode > 57)){
           if(charCode == 46){
              return true;
           }
          evt.preventDefault();
         }else{
           return true;
         }
        case "currency":
          if (charCode > 31 && (charCode < 48 || charCode > 57)){
           if(charCode == 46){
              return true;
           }
          evt.preventDefault();
         }else{
           return true;
         }
        default:
          break;
      }
         
    },
    updateObjByKey(payload) {
      this.$store.dispatch(`${this.iStore}/updateObjByKey`, payload);
    },
    setBindingDisable(value_readonly){
      if(value_readonly){
        if(value_readonly == "readonly" || value_readonly == "disabled"){
          this.readonly = true;
        }else{
          this.readonly = false;
        }
      }else{
        this.readonly = false;
      }
    },
    setRequiredByWatch(value_required){
      if(value_required){
        if(value_required == "required"){
          this.isRequired = value_required;
        }else{
          this.isRequired = "";
        }
      }else{
          this.isRequired = "";
      }
    }
  },
  watch: {
    iReadonly:function(value_readonly) {
      this.setBindingDisable(value_readonly);
    },
    iRequire:function(value_required) {
      this.setRequiredByWatch(value_required);
    }
  },
};
</script>