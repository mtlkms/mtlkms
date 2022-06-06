<template>
<div class="container container-sm">
    <form action="" @submit.prevent="updateAvatar()">
        <img :src="avatarPreview" :alt="data.user.username" class="d-block mx-auto avatar-xl" />
        <br>

        <p>Cập nhật ảnh đại diện</p>

        <label class="input">
            <input type="file" @change="onchangeAvatar">
        </label>

        <button class="btn btn-primary">
            <span class="material-icons mr-2">file_upload</span>
            Upload
        </button>
    </form>
    <hr>

    <form action="" @submit.prevent="updateProfile()">
        <p>Cập nhật thông tin cá nhân</p>

        <label class="input">
            <span class="material-icons">label</span>
            <input type="text" v-model="form.name" placeholder="Tên hiển thị" />
            <p>Tên hiển thị</p>
        </label>

        <label class="input">
            <span class="material-icons">favorite</span>
            <input type="text" v-model="form.slogan" placeholder="Châm ngôn" />
            <p>Châm ngôn</p>
        </label>

        <button class="btn btn-primary">
            <span class="material-icons mr-2">save</span>
            Save
        </button>
    </form>
</div>
</template>

<script>
import store from '@/assets/js/store'
import api from '@/assets/js/api'

export default {
    name: 'EditProfileView',

    data () {
        return {
            data: store.getAll(),
            
            form: {
                name: store.get('user').name,
                slogan: store.get('user').slogan
            },

            avatarPreview: api.getAvatarURL(store.get('user').username),
            avatarFile: null
        }
    },

    methods : {
        updateAvatar () {
            let data = new FormData()
            data.append('avatar', this.avatarFile)

            api.updateAvatar(data)
            .then(() => {
                location.reload()
            })
            .catch(err => {
                console.log(err)
            })
        },

        updateProfile () {
            api.put('/user', this.form)
            .then(res => {
                if (res.status == 200) {
                    res.json().then(data => {
                        store.set('user', data.user)
                    })
                }
                else {
                    res.json().then(data => {
                        console.log(data.error)
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
        },

        onchangeAvatar (e) {
            let files = e.target.files || e.dataTransfer.files

            if (!files.length) return

            this.convertAvatar(files[0])
        },

        // Convert avatar to 256x256 png file
        convertAvatar (avatar) {
            let canvas = document.createElement('canvas')
            let ctx = canvas.getContext('2d')
            let img = document.createElement('img')
            let scale = 256
            
            canvas.width = scale
            canvas.height = scale
            
            img.src = URL.createObjectURL(avatar)

            img.onload = () => {
                URL.revokeObjectURL(img.src)
                
                if (img.width > img.height) {
                    let s = img.height / scale
                    let w = img.width / s
                    
                    ctx.drawImage(img, 0, 0, w, scale)
                }
                else {
                    let s = img.width / scale
                    let h = img.height / s
                    
                    ctx.drawImage(img, 0, 0, scale, h)
                }
                
                this.avatarPreview = canvas.toDataURL()

                fetch(this.avatarPreview).then(res => {
                    res.arrayBuffer().then(buf => {
                        this.avatarFile = new File([buf], 'avatar', {type: 'image/png'})
                    })
                })
            }
        }
    }
}
</script>

<style scoped>

</style>