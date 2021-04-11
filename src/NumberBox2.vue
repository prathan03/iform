<template>
    <div>
        <input type="hidden" v-model="getTextData" class="form-control" :readonly="readonly">
        <NumberBox 
            v-if="checkDecimal==true"
            :iType="iType" 
            :iKey="iKey" 
            :ireadonly="ireadonly" 
            :iRequire="iRequire" 
            :iStore="iStore" />
        <icleave 
            v-else
            :options="options"
            v-validate="iRequire"
            :data-vv-name="iKey"
            :class="{'form-control':true,'is-invalid': errors.has(this.iKey),'is-valid':textBox}" 
            v-model="textBox" 
            :iType="iType" 
            :iKey="iKey" 
            :iStore="iStore" 
            :readonly="readonly" />
        <!-- <font v-if="this.iRequire" style="position: absolute;right: 0px;font-size: 30px;top: 25px;" color="red">*</font> -->
        <span  v-show="errors.has(this.iKey)" class="invalid-feedback">{{ errors.first(this.iKey) }}</span>
    </div>
</template>

<script>
    import {
        mapActions,
        mapGetters
    } from "vuex";
    import icleave from './icleave.vue'
    import NumberBox from './NumberBox.vue'
    export default {
        props: ['iStore', 'iKey', 'iType', 'iMaxLength', 'iDecimalLength', "iSymbol", "iValue", 'iRequire','ireadonly'
        ],
        inject: ['$validator'],
        data() {
            return {
                textBox: "",
                placeholder: "",
                getStore: "tad_time_sheet/getObj",
                readonly: false,
                options: {
                    numeral: true,
                    numeralDecimalMark: ',',
                    numeralIntegerScale: 35,
                    delimiter: '',
                },
                showFormat: {
                    cellphone: "XX-XXXX-XXXX",
                    homephone: "X-XXXX-XXXXX",
                    number: "",
                    integer: "",
                    decimal: "",
                    taxidentification:"",
                    creditcard: "0000-0000-0000-0000",
                    idcard: "0-0000-00000-00-0",
                    playMoney: {
                        currency: {
                            th: "THB ",
                            en: 'USD '
                        },
                        symbol: {
                            th: "฿ ",
                            en: "$ "
                        }
                    },
                },
                format: {
                    idcard: {
                        prefix: '',
                        delimiter: '-',
                        delimiters: ['-', '-'],
                        blocks: [1, 4, 5, 2, 1],
                        numeralIntegerScale: 13,
                    },
                    creditcard: {
                        creditCard: true,
                        delimiter: '-',
                    },
                    number: {
                        numeral: true,
                        numeralDecimalMark: ',',
                        numeralIntegerScale: 35,
                        delimiter: '',
                    },
                     taxidentification: {
                        numeral: true,
                        numeralIntegerScale: 13,
                        delimiter: '',
                    },
                    integer: {
                        uppercase: true,
                        numeral: true,
                        numeralIntegerScale: 15,
                        numeralDecimalScale: false,
                    },
                    decimal: {
                        prefix: '',
                        numeral: true,
                        numeralIntegerScale: 15,
                    },
                    integermoney: {
                        prefix: '฿ ',
                        numeral: true,
                        numeralIntegerScale: 15,
                        numeralDecimalScale: false,
                    },
                    decimalmoney: {
                        prefix: '฿ ',
                        numeral: true,
                        numeralIntegerScale: 15,
                    },
                    cellphone: {
                        prefix: '',
                        delimiter: '-',
                        delimiters: ['-', '-'],
                        blocks: [2, 4, 4],
                        numeralIntegerScale: 10,
                    },
                    homephone: {
                        prefix: '',
                        delimiter: '-',
                        delimiters: ['-', '-'],
                        blocks: [1, 4, 4],
                        numeralIntegerScale: 9,
                    }
                }
            }

        },
        mounted() {
            if (this.ireadonly == 'readonly') {
                this.readonly = true;
            }
            switch (this.iType) {
                case "idcard":
                    this.placeholder = this.showFormat.idcard;
                    this.options = this.format.idcard;
                    break;
                case "creditcard":
                    this.placeholder = this.showFormat.creditcard;
                    this.options = this.format.creditcard;
                    break;
                case "number":
                    this.placeholder = this.showFormat.number;
                    this.options = this.format.number;
                    break;
                 case "taxidentification":
                    this.placeholder = this.showFormat.taxidentification;
                    this.options = this.format.taxidentification;
                    break;
                case "integer":
                    this.placeholder = this.showFormat.integer;
                    this.options = this.format.integer;
                    break;
                case "integermoney":
                    this.options = this.format.integermoney;
                    this.checkedPlayMoney(this.showFormat.integer, this.showFormat.playMoney);
                    break;
                case "decimal":
                    this.placeholder = this.showFormat.decimal;
                    this.options = this.format.decimal;
                    break;
                case "decimalmoney":
                    this.options = this.format.decimalmoney;
                    this.checkedPlayMoney(this.showFormat.decimal, this.showFormat.playMoney);
                    break;
                case "cellphone":
                    this.placeholder = this.showFormat.cellphone;
                    this.maxlength = 12;
                    this.options = this.format.cellphone;
                    break;
                case "homephone":
                    this.placeholder = this.showFormat.homephone;
                    this.maxlength = 11;
                    this.options = this.format.homephone;
                    break;
                    // default:
                    //     starClassNamePostfix = '';
            }
        },
        methods: {
            updateObjByKey(payload) {
                this.$store.dispatch(`${this.iStore}/updateObjByKey`, payload)
            },
            checkDecimal(){
                if(['decimal', 'decimalmoney'].includes(this.iType)){
                    return true;
                }
                return false;
            }
        },
        computed: {
            displayLocale() {
                if (this.$i18n.locale === "th") {
                    return "en";
                }
                return "th";
            },
            getTextData() {
                let textBox = this.$store.getters[`${this.iStore}/getObj`][`${this.iKey}`];
                if(textBox === null || textBox == undefined || typeof textBox === "undefined" || !textBox){
                    this.textBox = "";
                }else{
                    this.textBox = textBox.toString();
                }
                return this.$store.getters[`${this.iStore}/getObj`][`${this.iKey}`];
            }
        },
        watch:{
            // textBox:function (val){
            //     this.updateObjByKey({
            //         key: this.iKey,
            //         data: val
            //     });
            // }
        },
        components: {
            icleave,
            NumberBox
        },
    }

</script>
