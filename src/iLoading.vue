<template>
    <div>
        <loading 
        :active.sync="isLoading" 
        :can-cancel="false" 
        :is-full-page="fullPage" 
        :loader="'bars'" 
        :height="65"
        :width="128" 
        :color="'#620003'">
        </loading>
    </div>
</template>

<script>
    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';

    export default {
        props: ['iShowLoader'],
        components: {
            Loading
        },
        data() {
            return {
                isLoading: true,
                fullPage: true
            }
        },
        mounted() {

        },
        methods: {

        },
        watch: {
            iShowLoader: function (result_data) {
                if (this.isLoading == true) {
                    if (result_data.status) {
                        setTimeout(() => {
                            this.isLoading = false;
                        }, 1500);
                    }
                } else {
                    this.isLoading = true;
                    setTimeout(() => {
                        this.isLoading = false;
                    }, 1500);
                }

            },
        },
    }

</script>
