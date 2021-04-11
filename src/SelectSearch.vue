<template>
    <v-flex xs12 sm6 md2>
        <v-select
            :items="optiontxt"
            :item-text="iDisplay"
            :value="iVal"
            :placeholder="iName"
            @change="changedSelect"
            :class="{'mr-2':true,'mt-2':true}"
            v-model="selected"
        ></v-select>
    </v-flex>
</template>

<script>
import axios from 'axios';
export default {
    props: ['iVal','iDisplay','iType','iData','iName','iDefaultValue'],
    data() {
         return {
             optiontxt:[this.iVal == this.iDisplay ? {[this.iDisplay]:this.iName} : {[this.iDisplay]:this.iName,[this.iVal]:"null"}],
             selected: null
         }
     },
    mounted() {
       switch (this.iType) {
           case 'link':
                axios.get(siteapi+this.iData).then(response => {
                    response.data.map((val) => {
                        this.optiontxt.push(val)
                    })
                    this.selected = this.iDefaultValue
                });
               break;
           case 'array':
                this.iData.map((val) => {
                    this.optiontxt.push(val)
                })
                this.selected = this.iDefaultValue
               break;    
       }
    },
    methods: {
        changedSelect(x) {
            var v = this.optiontxt.find(data => data[this.iDisplay] == x)
            const index = this.optiontxt.findIndex(data => data[this.iDisplay] == x);

            if(index == 0){
                this.$emit('returnValue',null);
            }else{
                this.$emit('returnValue',v[this.iVal]);
            }
        }
    }
}
</script>