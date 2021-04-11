<template>
    <div>
        <div v-if="readonly">
          <select :name="iKey" v-model="selected" v-validate="iRequire" :ref="iKey" :class="{'form-control':true,'is-invalid': errors.has(this.iKey) ,'is-valid': selected }" disabled>
            <option disabled value="">กรุณาเลือก</option>
            <option  v-for="item in optiontxt" :selected="item.province == Obj.province" :key="item.id" :value="item[iVal]">{{ item[iDisplay] }}</option>
        </select>
      </div>
      <div v-else>
          <select :name="iKey" v-model="selected" v-validate="iRequire" :ref="iKey" :class="{'form-control':true,'is-invalid': errors.has(this.iKey) ,'is-valid': selected }">
            <option value="">กรุณาเลือก</option>
            <option  v-for="item in optiontxt" :selected="item.province == Obj.province" :key="item.id" :value="item[iVal]">{{ item[iDisplay] }}</option>
        </select>
      </div>
      <!-- <font v-if="this.iRequire" style="position: absolute;right: 0px;font-size: 30px;top: 25px;" color="red">*</font> -->
        <span v-show="errors.has(this.iKey)" class="invalid-feedback d-block">{{ errors.first(this.iKey) }}</span>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['iStore','iKey', 'iVal','iDisplay','iType','iData','iRequire'],
    inject: ['$validator'],
    data() {
         return {
             optiontxt:[],
             readonly:false
         }
     },
     mounted() {
       const res = this.iType.split("|");
       const selfe = this
       res.forEach(function(element) {
        switch (element) {
           case 'link':
                axios.get(siteapi+selfe.iData).then(response => {
                    selfe.optiontxt = response.data
                });
               break;
           case 'array':
                selfe.optiontxt = selfe.iData
               break;
           case 'readonly':
                selfe.readonly = true
               break;
       }
      });
     },
     computed: {
        Obj:{
             get () {
                return this.$store.getters[`${this.iStore}/getObj`]
            },
        },
     selected: {
        get () {
          return this.Obj[this.iKey];
        },
        set (val) {
            this.updateObjByKey({key:this.iKey,data:val});
        }
      }
    },
     methods:{
        updateObjByKey(payload){
                this.$store.dispatch(`${this.iStore}/updateObjByKey`, payload)
        },
        ClickEvent($event) {
            this.$refs[this.iKey].open = true
        },
        setBindingDisable(value_type){
          if(value_type){
            var data_split = value_type.split("|");
            data_split.forEach(value_split => {
              if(value_split == "readonly"){
                this.readonly = true;
              }else{
                this.readonly = false;
              }
            });
          }
        }
     },
     watch: {
       iData:function() {
          switch (this.iType) {
           case 'link':
                axios.get(siteapi+this.iData).then(response => {
                    this.optiontxt = response.data
                });
               break;
           case 'array':
                this.optiontxt = this.iData
               break;
       }
       },
       iType:function(value_type){
         this.setBindingDisable(value_type);
       }
     },
}
</script>
