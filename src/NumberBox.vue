<template>
    <div>
        <input v-model="textInput" ref="input" type="text"
            v-validate="iRequire"
            :data-vv-name="iKey"
            :class="{'form-control':true,'is-invalid': errors.has(this.iKey),'is-valid':textInput}"
            @keypress="isNumber" v-on:change="setDataStore" />
    </div>
</template>

<script>
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
            iRequire: {
                type: String,
                default: ''
            },
        },
        inject: ['$validator'],
        data() {
            return {
                data: '',
                textInput: ''
            }
        },
        mounted() {
            if (this.ireadonly == 'readonly') {
                this.readonly = true;
            }
            this.textInput = this.$store.getters[`${this.iStore}/getObj`][`${this.iKey}`];
        },
        methods: {
            updateObjByKey(payload) {
                this.$store.dispatch(`${this.iStore}/updateObjByKey`, payload)
            },
            isNumber(evt) {
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    evt.preventDefault();
                } else {
                    return true;
                }
            },
            setDataStore: function (e) {
                let val = this.textInput;
                this.updateObjByKey({
                    key: this.iKey,
                    data: val
                });
            }
        },
        computed: {
            // 
        },
        watch: {
            // textInput:function (val){
            //     // console.log(val);
            //     return false;

            // //     this.updateObjByKey({
            // //         key: this.iKey,
            // //         data: val
            // //     });
            // }
        },
    }

</script>
