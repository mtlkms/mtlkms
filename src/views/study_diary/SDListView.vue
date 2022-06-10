<template>
<div class="container">
    <h3>Nhật Ký Thời Gian Học</h3>

    
</div>
</template>

<script>
import store from '@/assets/js/store'

export default {
    name: 'SDListView',

    data () {
        return {
            data: store.getAll()
        }
    },

    methods: {
        
    }
}
</script>

<style scoped>

</style>