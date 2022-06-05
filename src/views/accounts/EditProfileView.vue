<template>
<div class="container container-md">
    <div>
        <label class="input">
            <input type="file">
        </label>
    </div>

    <div>

    </div>

    <div>

    </div>
</div>
</template>

<script>
import store from '@/assets/js/store'

export default {
    name: 'EditProfileView',

    data () {
        return {
            data: store.getAll()
        }
    },

    methods : {

    }
}
</script>

<style scoped>

</style>