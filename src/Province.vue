<template>
    <div>
        <multiselect v-model="selected" :options="optiontxt" 
            :close-on-select="true" :clear-on-select="true"
            :hide-selected="false" :preserve-search="true" 
            :option-height="30" :block-keys="['Delete']"
            disabledReason="true" placeholder="กรุณาเลือก" 
            select-label="เลือก" deselect-label="ลบ"
            selectedLabel="เลือกอยู่" label="province" 
            @select="onSelect"
            v-validate="iRequire" 
            :data-vv-name="iKey"
            :class="{'is-invalid': errors.has(this.iKey) ,'is-valid': selected }"
            :disabled="readonly">
            <span slot="noResult">ไม่พบรายการค้นหา</span>
            <template slot="singleLabel" slot-scope="props">
                <div class="option__desc">
                    <span class="option__title">{{ props.option.province }}</span>
                </div>
            </template>
            <template slot="option" slot-scope="props">
                <div class="option__desc">
                    <span class="option__title">{{ props.option.province }}</span>
                </div>
            </template>
        </multiselect>
        <span v-show="errors.has(this.iKey)" class="help is-danger">{{ errors.first(this.iKey) }}</span>
    </div>
</template>

<script>
    // import axios from 'axios';
    import province from './ThailandAddress/OnlyProvince.json'
    import Multiselect from 'vue-multiselect'
    export default {
        props: ['iStore', 'iKey', 'iVal', 'iDisplay', 'iRequire', 'iReadonly'],
        inject: ['$validator'],
        data() {
            return {
                optiontxt: province,
                readonly: false,
            }
        },
        components: {
            Multiselect
        },
        mounted() {
            this.checkPropsiReadonly();
        },
        computed: {
            Obj: {
                get() {
                    return this.$store.getters[`${this.iStore}/getObj`]
                },
            },
            selected: {
                get() {
                    const index = this.optiontxt.findIndex(data => data.province == this.Obj[this.iKey])

                    if (index >= 0) {
                        const data = [{
                            province: this.optiontxt[index].province,
                            value: this.Obj[this.iKey]
                        }]
                        return data;
                    } else {
                        return null;
                    }
                },
                set(val) {
                    this.updateObjByKey({
                        key: this.iKey,
                        data: val.province
                    });
                }
            }
        },
        methods: {
            checkPropsiReadonly() {
                if (this.iReadonly == "readonly" || this.iReadonly == "disabled" || this.iReadonly == true) {
                    this.readonly = true;
                } else {
                    this.readonly = false;
                }
            },
            updateObjByKey(payload) {
                this.$store.dispatch(`${this.iStore}/updateObjByKey`, payload)
            },
            ClickEvent($event) {
                this.$refs[this.iKey].open = true
            },
            onSelect(option, id) {

            },
            setBindingDisable(value_readonly) {
                if (value_readonly) {
                    if (value_readonly == "readonly" || value_readonly == "disabled" || value_readonly == true) {
                        this.readonly = true;
                    } else {
                        this.readonly = false;
                    }
                } else {
                    this.readonly = false;
                }
            },
        },
        watch: {
            iReadonly: function (value_readonly) {
                this.setBindingDisable(value_readonly);
            },
        },
    }

</script>
<style>
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
        color: #fff;
    }

    .multiselect__option--highlight:after {
        content: attr(data-select);
        background: #007bff;
        color: #fff;
    }
    .option__title{
        font-size: 20px;
        color: #777 !important;
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
    .multiselect__option{
        font-size: 20px;
    }

</style>
