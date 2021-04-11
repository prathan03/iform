<template>
    <div>
        <input v-if="!hidden" :name="iKey" :maxlength="maxLength" type="text" @keypress="isKeyPress($event)"  v-validate="iRequire" v-on:change="putUpdate" :class="{'form-control':true,'is-invalid': errors.has(this.iKey) ,'is-valid': textBox }"  v-model="textBox" :readonly="readonly">
        <input v-else class="form-control" type="hidden"  v-model="textBox" v-on:change="putUpdate" />
        <!-- <font v-if="this.iRequire" style="position: absolute;right: 0px;font-size: 30px;top: 25px;" color="red">*</font> -->
        <span v-if="!hidden" v-show="errors.has(this.iKey)" class="invalid-feedback">{{ errors.first(this.iKey) }}</span>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    props: ['iStore','iKey','iType','iRequire', 'iMaxlength', 'iEng', 'iReadonly'],
    inject: ['$validator'],
    data() {
        return {
            hidden:false,
            readonly:false,
            maxLength: this.iMaxlength ? this.iMaxlength : 200,
        }
    },
    methods:{
        updateObjByKey(payload){
            this.$store.dispatch(`${this.iStore}/updateObjByKey`, payload)
        },
        putUpdate(){
           this.updateObjByKey({key:this.iKey,data:this.textBox});    
        },
        isKeyPress(evt){
            var charCode = (evt.which) ? evt.which : event.keyCode
            if(this.iEng == "true"){
                if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122)){
                    return true
                }else{
                    evt.preventDefault();
                }
            }else{
                return true;
            }
        },
        setBindingDisable(value_type){
            if(value_type){

                if(value_type == "hidden"){
                    this.hidden = true;
                    this.readonly = false;
                }else if(value_type == "readonly"){
                    this.hidden = false;
                    this.readonly = true;
                }else{
                    this.hidden = false;
                    this.readonly = false;
                }

            }else{
                this.hidden = false;
                this.readonly = false;
            }
        }
    },
    mounted(){
        if (this.iType == "hidden") {
            this.hidden = true
        }else if(this.iType == "readonly"){
            this.readonly = true
        }
        this.textBox = this.$store.getters[this.iStore+"/getObj"][this.iKey]
    },
    computed: {
        Obj:{
             get () {
                return this.$store.getters[`${this.iStore}/getObj`]
            },
        },
        textBox: {
            get() {
                if (this.Obj[this.iKey]) {
                    return this.Obj[this.iKey];
                }else{
                    return this.Obj[this.iKey]
                }
            },
            set(val) {
                this.updateObjByKey({ key: this.iKey, data: val });
            }
        },
    },
    watch: {
        iType:function(value_type) {
            this.setBindingDisable(value_type);
        }
    },
}
</script>
