<template>
<div class="container">
    <h3>Hello</h3>
</div>
</template>

<script>
import store from '@/assets/js/store'

export default {
    name: 'SDTagView',

    created () {

    },

    data () {
        return {
            data: store.getAll()
        }
    },

    methods: {

    },
}
</script>