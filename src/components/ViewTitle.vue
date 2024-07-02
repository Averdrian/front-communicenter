<script>
    export default {
        name: 'view-title',
        props: ['title'],
        watch: {
            title: {
                immediate: true,
                handler() {
                    document.title = this.title + " | Communicenter";
                }
            }
        }
    }
</script>