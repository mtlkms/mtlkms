<template>
<div class="container container-sm">
    <h2 class="mb-4">Đăng xuất</h2>

    <p>Bạn có chắc muốn đăng xuất không?</p>

    <button class="btn btn-primary" @click="logout">Đăng xuất</button>
</div>
</template>

<script>
import store from '/src/assets/js/store'
import api from '/src/assets/js/api'

export default {
    name: 'LogoutView',

    methods: {
        logout() {
            api.get('/logout').then(() => {
                store.set('isLogin', false);
                store.set('user', {});
                this.$router.push('/login');
            });
        }
    }
}
</script>