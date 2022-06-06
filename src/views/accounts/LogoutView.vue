<template>
<div class="container container-sm">
    <h2 class="mb-4">Đăng xuất</h2>

    <p>Bạn có chắc muốn đăng xuất không?</p>

    <button class="btn btn-primary" @click="logout">
        <span class="material-icons mr-2">logout</span>
        Đăng xuất
    </button>
</div>
</template>

<script>
import store from '@/assets/js/store'
import api from '@/assets/js/api'

export default {
    name: 'LogoutView',

    methods: {
        logout() {
            api.get('/logout').then(() => {
                store.set('isLogin', false)
                store.set('user', {})
                this.$router.push('/login')
            })
        }
    }
}
</script>