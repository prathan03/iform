<template>
    <v-app>
        <VuePDFViewer :height="iHeight" :url="iUrl"/>     
    </v-app>
</template>

<script>
    import VuePDFViewer from 'vue-instant-pdf-viewer';

    export default {
        props: ['iHeight', 'iUrl'],
        components:{ 
            VuePDFViewer
            },
        data() {
            return {

            }
        },
        mounted() {

        },
        methods: {

        },
        computed: {

        },
    }
</script>
