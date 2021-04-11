<template>
    <div>
        <textarea class="form-control" :rows="rows" :cols="cols" :name="iKey" type="text" v-validate="iRequire"
            :class="{'form-control':true,'is-invalid': errors.has(this.iKey) ,'is-valid': textBox }" v-model="textBox"
            :readonly="readonly"></textarea>
        <!-- <font v-if="this.iRequire" style="position: absolute;right: 0px;font-size: 30px;top: 25px;" color="red">*</font> -->
        <span v-show="errors.has(this.iKey)" class="invalid-feedback">{{ errors.first(this.iKey) }}</span>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        props: ['iStore', 'iKey', 'iVal', 'iRows', 'iCols', 'iRequire', 'iType'],
        inject: ['$validator'],
        data() {
            return {
                rows: 10,
                cols: 100,
                readonly: false,
            }
        },
        mounted() {
            if (this.iRows) {
                this.rows = this.iRows;
            }
            if (this.iCols) {
                this.cols = this.iCols;
            }

            if (this.iType == "readonly") {
                this.readonly = true;
            }
        },
        methods: {
            updateObjByKey(payload) {
                this.$store.dispatch(`${this.iStore}/updateObjByKey`, payload)
            }
        },
        computed: {
            Obj: {
                get() {
                    return this.$store.getters[`${this.iStore}/getObj`]
                },
            },
            textBox: {
                get() {

                    return this.Obj[this.iKey];
                },
                set(val) {
                    this.updateObjByKey({
                        key: this.iKey,
                        data: val
                    });
                }
            }
        },
        watch: {
            iType(value_iType) {
                if (value_iType == "readonly") {
                    this.readonly = true;
                } else {
                    this.readonly = false;
                }

            }
        },
    }

</script>
