<template>
    <div>
        <multiselect 
            v-model="selected" 
            :options="optiontxt" 
            :close-on-select="true"
            :clear-on-select="true"
            :hide-selected="false" 
            :preserve-search="true" 
            :option-height="30" 
            :block-keys="['Delete']"
            disabledReason="true"
            placeholder="กรุณาเลือก" 
            select-label="เลือก"
            deselect-label="ลบ"
            selectedLabel="เลือกอยู่"
            label="name" 
            @select="onSelect"
            v-validate="iRequire" 
            :disabled="isDisabled"
            :data-vv-name="iKey"
            :class="{'is-invalid': errors.has(this.iKey) ,'is-valid': selected }"
      >
      <span slot="noResult">ไม่พบรายการค้นหา</span>
            <template slot="singleLabel" slot-scope="props">
                <div class="option__desc">
                    <span class="option__title">{{ props.option.name }}</span>
                </div>
            </template>
      </multiselect>
        <span v-show="errors.has(this.iKey)" class="help is-danger">{{ errors.first(this.iKey) }}</span>
    </div>
</template>

<script>
import axios from 'axios';
import Multiselect  from 'vue-multiselect'
export default {
    props: ['iStore','iKey', 'iVal','iDisplay','iType','iData','iRequire','iDisabled'],
    inject: ['$validator'],
    data() {
         return {
             optiontxt:[],
         }
     },
      components: { Multiselect },
     mounted() {
       switch (this.iType) {
           case 'link':
                axios.get(siteapi+this.iData).then(response => {
                    const data = response.data
                    data.map((val) => {
                        this.optiontxt.push({name:val[this.iDisplay],value:val[this.iVal]})
                    })
                });
               break;
           case 'array':
                this.iData.map((val) => {
                    this.optiontxt.push({name:val[this.iDisplay],value:val[this.iVal]})
                })
               break;
       }
     },
     computed: {
        isDisabled:{
            get(){
                if(this.iDisabled == null || this.iDisabled == "" || typeof this.iDisabled == 'undefined' || this.iDisabled == false || this.iDisabled == "false"){
                    return false
                }else if(this.iDisabled == "true" || this.iDisabled == true){
                    return true
                }else{
                    return false
                }
            }
        },
        Obj:{
             get () {
                return this.$store.getters[`${this.iStore}/getObj`]
            },
        },
     selected: {
        get () {
            const index = this.optiontxt.findIndex(data => data.value == this.Obj[this.iKey])

            
            if (index>=0) {
                const data = [{name:this.optiontxt[index].name,value:this.Obj[this.iKey]}]
                return data;
            }else{
                return null;
            }
        },
        set (val) {
            this.updateObjByKey({key:this.iKey,data:val.value});
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
        onSelect (option, id) {
            this.$emit('onChangeValue',option);
        }
     },
     watch: {
       iData:function() {
          switch (this.iType) {
           case 'link':
                axios.get(siteapi+this.iData).then(response => {
                    const data = response.data
                    this.optiontxt=[]
                    this.optiontxt.push({name:'กรุณาเลือก',value:""})
                    data.map((val) => {
                        this.optiontxt.push({name:val[this.iDisplay],value:val[this.iVal]})
                    })
                });
               break;
           case 'array':
                this.optiontxt=[]
                this.optiontxt.push({name:'กรุณาเลือก',value:""})
                this.iData.map((val) => {
                    this.optiontxt.push({name:val[this.iDisplay],value:val[this.iVal]})
                })
               break;
       }
       }
     },
}
</script>
<style >
    .multiselect__tags {
        min-height: 30px;
        display: block;
        background: #fff;
        font-size: 18px;
        color: #282b2e;
        border: 1px solid #ced4da;
        border-radius: .25rem;
        transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
        padding-top: 1px;
        height: 32px;
    }

    .multiselect {
    box-sizing: content-box;
    display: block;
    position: relative;
    width: 100%;
    min-height: 0px;
    height: 32px;
    text-align: left;
    color: #35495e;
}

    .multiselect__option--highlight {
        background: #007bff;
        outline: none;
        color: #fff
    }

    .multiselect__option--highlight:after {
        content: attr(data-select);
        background: #007bff;
        color: #fff
    }
    .option__title{
        font-size: 20px;
        color: #282b2e;
    }
    .option__desc{
         margin-top: 5px;
    }
    .multiselect__select{
       padding-top: 0px; 
    }
    .multiselect__single{
        background: unset !important;
    }
    .is-invalid .multiselect__tags {
        border-color: #dc3545;
    }
    .is-valid .multiselect__tags {
        border-color: #28a745;
    }
    .multiselect--disabled .multiselect__tags {
        border-color: #027b1e !important;
        background: #e4e6e8 !important;
    }
    .multiselect--disabled .multiselect__select{
       padding-top: 0px; 
       height: 30px;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .multiselect--disabled .multiselect__tags .multiselect__single{
        background: #e4e6e8 !important;
    }
    .multiselect--disabled .multiselect__tags .multiselect__single .option__desc .option__title{
        color: #000 !important;
    }

</style>
