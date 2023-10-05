<template>


    AAAAAAAAAAA
</template>


<script>

    export default {
        name:"Login",

        mounted() {
            console.log("BBASDA");
        },

        async created() {
            await this.access();
        },

        methods : {

            async access() {
                let data;
                data = (await fetch('http://localhost:8000/api/data'));
                console.log(data);
            }

        }
    };

</script>