<template>
<div>
    <div id="appmenu-top">
        <div v-if="!data.isLogin">
            <img src="/img/icons/180.png" class="avatar d-block mx-auto">
            <h3>MTLKMS</h3>
            <hr>
            <p>Học hành chăm chỉ :(</p>
        </div>
        <div v-else>
            <img :src="data.avatarURL" class="avatar d-block mx-auto">
            <h3>Xin chào {{ data.user.name }}!</h3>
            <hr>
            <p>
                <span v-if="data.learningDiary">
                    Bạn đang học 
                    <router-link
                    :to="'/study-diary/' + data.learningDiary.sdtag">
                        môn này nè
                    </router-link>
                </span>
                <span v-else>
                    Bạn hiện chưa học gì!
                </span>
            </p>
            <hr>
            <p>Bạn còn 99 mục tiêu hằng ngày chưa hoàn tất!</p>
        </div>
    </div>

    <div>
        <div v-for="(link, index) in links" :key="index">
            <router-link :to="link.path" :class="{active: isActive(link), link: true}" v-if="data.isLogin == link.auth">
                <span class="material-icons">{{ link.icon }}</span>
                {{ link.name }}
            </router-link>
        </div>
    </div>
</div>
</template>

<script>
import store from '/src/assets/js/store'

export default {
    name: 'AppMenu',

    data () {
        return {
            data: store.getAll(),

            links: [
                {
                    name: 'Trang Chủ',
                    path: '/',
                    icon: 'home',
                    auth: true
                },
                {
                    name: 'Cá Nhân',
                    path: '/profile',
                    icon: 'person',
                    auth: true
                },
                {
                    name: 'Nhật Ký Thời Gian Học',
                    path: '/study-diary',
                    icon: 'assignment',
                    auth: true
                },
                {
                    name: 'Đăng Nhập',
                    path: '/login',
                    icon: 'login',
                    auth: false
                },
                {
                    name: 'Đăng Ký',
                    path: '/register',
                    icon: 'person',
                    auth: false
                },
                {
                    name: 'Đăng Xuất',
                    path: '/logout',
                    icon: 'logout',
                    auth: true
                }
            ]
        }
    },

    methods: {
        isActive(link) {
            return link.path == this.$route.path
        }
    }
}
</script>

<style scoped>
.link {
    padding: .75rem;
    cursor: pointer;
    display: block;
    text-decoration: none;
    margin-bottom: .5rem;
    border-radius: .5rem;
    transition: all .3s;
    display: flex;
    align-items: center;
    color: #ff907f;
    background-color: #ff907f11;
}

.link span {
    margin-right: .5rem;
}

.link:hover {
    background-color: #ff907f50;
}

.link:active {
    color: #ff907f;
}

.active {
    background-color: #ff907f !important;
    color: #fff !important;
}

#appmenu-top {
    padding: 1rem;
    margin-bottom: .5rem;
    border-radius: .5rem;
}
</style>