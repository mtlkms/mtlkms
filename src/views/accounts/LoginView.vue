<template>
<div class="container container-sm">
    <form action="" method="POST" @submit.prevent='submitForm()'>
        <h2 class="mb-4">Đăng nhập</h2>

        <transition name="fade-in">
            <div class="log" v-show="log" :class="isSuccess ? 'success' : 'error'">
                <p>{{ apiLog }}</p>
                <p>{{ log }}</p>
            </div>
        </transition>

        <label class="input">
            <span class="material-icons">person</span>
            <input type="text" name="username" required placeholder="Username" v-model="form.username">
            <p>Username</p>
        </label>

        <label class="input">
            <span class="material-icons">lock</span>
            <input type="password" name="password" required placeholder="Mật khẩu" v-model="form.password">
            <p>Password</p>
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

<style scoped>
.log {
    padding: .25rem 1rem;
    border-radius: .25rem;
    font-size: 12px;
}

.error {
    color: red;
    background-color: #ff000010;
}

.success {
    color: green;
    background-color: #00ff0010;
}
</style>

<script>
import api from '/src/assets/js/api'
import store from '/src/assets/js/store'

export default {
    name: 'LoginView',

    created () {
        this.checkLogin()
    },

    data () {
        return {
            form: {
                username: '',
                password: ''
            },
            isSuccess: false,
            apiLog: '',
            log: ''
        }
    },

    methods: {
        submitForm() {
            api.post('/login', this.form)
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    res.json().then(data => {
                        this.isSuccess = true
                        this.apiLog = '';
                        this.log = "Đăng ký thành công"
                        store.set('user', data.user)
                        store.set('isLogin', true)
                        this.$router.push('/')
                    })
                }
                else {
                    res.json().then(data => {
                        this.isSuccess = false
                        this.apiLog = data.error
                        this.showLog()
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        },

        showLog () {
            if (this.apiLog == 'Username not found or password is incorrect') this.log = 'Tên đăng nhập hoặc mật khẩu không chính xác'
            else this.log = 'Đã có lỗi xảy ra'
        },

        redirect () {
            if (store.get('redirect')) {
                this.$router.push(store.get('redirect'))
                store.set('redirect', null)
            }
            else {
                this.$router.push('/')
            }
        },

        checkLogin () {
            if (store.get('isLogin')) {
                this.redirect()
            }

            api.get('/check-login')
            .then(res => {
                if (res.status === 200) {
                    res.json().then(data => {
                        store.set('user', data.user)
                        store.set('isLogin', true)
                        this.redirect()
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    }
}
</script>