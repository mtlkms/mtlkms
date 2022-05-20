<template>
<div class="container container-sm">
    <form action="" method="POST" @submit.prevent='submitForm()'>
        <h2 class="mb-4">Đăng nhập</h2>

        <label class="input">
            <span class="material-icons">email</span>
            <input type="email" name="email" required placeholder="Email or Username">
            <p>Email/Username</p>
        </label>

        <label class="input">
            <span class="material-icons">lock</span>
            <input type="password" name="password" required placeholder="Mật khẩu">
            <p>Mật khẩu</p>
        </label>

        <div class="footer">
            <button class="btn btn-primary">Đăng nhập</button>

            <div>
                <p>Chưa có tài khoản? <a href="/register">[Đăng Ký]</a></p>
                <p><a href="">[Quên Mật Khẩu]</a></p>
            </div>
        </div>
    </form>
</div>
</template>

<script>
// import API from '/src/assets/js/api'
// import Store from '/src/assets/js/store'

// let api = new API()
// let store = new Store()

export default {
    name: 'LoginView',

    data() {
        return {
            
        }
    },

    methods: {
        submitForm() {
            
        }
    },
}
</script>