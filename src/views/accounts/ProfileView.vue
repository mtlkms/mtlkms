<template>
<div class="container container-md">
    <Profile />
    
</div>
</template>

<script>
import store from '/src/assets/js/store'
import Profile from '/src/components/user/ProfileComponent.vue'

export default {
    name: 'ProfileView',

    components: {
        Profile
    },

    data () {
        return {
            data: store.getAll()
        }
    },

    methods: {

    }
}
</script>

<style>

</style>