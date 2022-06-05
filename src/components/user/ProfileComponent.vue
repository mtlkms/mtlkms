<template>
<div class="main">
    <img :src="api.getAvatarURL(data.user.username)" :alt="data.user.username" class="avatar-lg">

    <div>
        <p><b>{{ data.user.name }}</b></p>
        <p>{{ data.user.username }}</p>
        <p>{{ data.user.slogan }}</p>
        <p><router-link to="/profile/edit">[Edit]</router-link></p>
    </div>
</div>
</template>

<script>
import store from '@/assets/js/store'
import api from '@/assets/js/api'

export default {
    name: 'UserProfile',

    data () {
        return {
            data: store.getAll(),
            api: api
        }
    }
}
</script>

<style scoped>
.main {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    box-sizing: border-box;
}

.main > div {
    width: 100%;
    margin-left: 1rem;
}
</style>