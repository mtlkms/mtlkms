<template>
<div class="container container-sm">
    <form action="" method="POST" @submit.prevent='submitForm()'>
        <h2 class="mb-4">Đăng ký</h2>

        <label class="input">
            <span class="material-icons">tag</span>
            <input type="text" name="name" required placeholder="Tên hiển thị">
            <p>Tên hiển thị</p>
        </label>

        <label class="input">
            <span class="material-icons">person</span>
            <input type="text" name="username" required placeholder="Tên đăng nhập">
            <p>Tên đăng nhập</p>
        </label>

        <label class="input">
            <span class="material-icons">email</span>
            <input type="email" name="email" required placeholder="Email">
            <p>Email</p>
        </label>

        <label class="input">
            <span class="material-icons">lock</span>
            <input type="password" name="password" required placeholder="Mật khẩu">
            <p>Mật khẩu</p>
        </label>

        <label class="input">
            <span class="material-icons">lock</span>
            <input type="password" name="repassword" required placeholder="Nhập lại mật khẩu">
            <p>Re-password</p>
        </label>

        <div class="footer">
            <button class="btn btn-primary">Đăng ký</button>

            <div>
                <p>Đã có tài khoản? <a href="/login">[Đăng Nhập]</a></p>
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
    name: 'RegisterView',

    data () {
        return {
            
        }
    },
    
    methods: {
        submitForm () {

        }
    }
}
</script>