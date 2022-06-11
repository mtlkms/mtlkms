<template>
<div class="container">
    <div class="d-flex justify-space-between align-items-center">
        <h3>Thẻ Lĩnh Vực</h3>

        <button
        class="btn btn-primary"
        @click="openCreateTagPopup">
            <span class="material-icons mr-2">add</span>
            Thêm
        </button>
    </div>

    <!-- List of tags -->
    <div class="grid-list">
        <div class="grid-item" style="background-color: #097721; color: #fff;">
            <div class="title">
                <div class="d-flex align-items-center">
                    <span class="material-icons mr-2">label</span>
                    <b>Thẻ Lĩnh Vực</b>
                </div>

                <button @click="editTagData.isDisplay = true">
                    <span class="material-icons">edit</span>
                </button>
            </div>
            
            <div class="body">
                <p>Hôm nay: 2 giờ</p>
                <p>Tuần này: 23 giờ</p>
                <p>Tháng này: 64 giờ</p>
                <p>Năm nay: 99 giờ</p>
                <p>Tổng thời gian học: 99 giờ</p>
            </div>
        </div>
    </div>

    <!-- Edit tag popup -->
    <Transition name="fade-in">
        <div class="popup" v-show="editTagData.isDisplay">
            <div class="popup-bg" @click="editTagData.isDisplay = false"></div>

            <div class="container container-sm">
                <!-- Header -->
                <div>
                    <div class="d-flex justify-content-center align-items-center">
                        <span class="material-icons mr-2">edit</span>
                        <h3>{{ editTagData.title }}</h3>
                    </div>

                    <span class="material-icons btn-close" @click="editTagData.isDisplay = false">close</span>
                </div>

                <!-- Body -->
                <div>
                    <!-- Preview -->
                    <p>Preview: </p>

                    <div class="grid-item"
                    :style="{
                        backgroundColor: editTagData.bgColor,
                        color: editTagData.textColor
                    }">
                        <div class="title">
                            <div class="d-flex align-items-center">
                                <span class="material-icons mr-2">{{ editTagData.icon }}</span>
                                <b>{{ editTagData.name }}</b>
                            </div>

                            <button>
                                <span class="material-icons">edit</span>
                            </button>
                        </div>
                        
                        <div class="body">
                            <p>Hôm nay: {{ editTagData.times.today }} giờ</p>
                            <p>Tuần này: {{ editTagData.times.week }} giờ</p>
                            <p>Tháng này: {{ editTagData.times.month }} giờ</p>
                            <p>Năm nay: {{ editTagData.times.year }} giờ</p>
                            <p>Tổng thời gian học: {{ editTagData.times.total }} giờ</p>
                        </div>
                    </div>
                    <br>
                    <hr>

                    <!-- Edit -->
                    <form action="" @submit.prevent="submitEditTag">
                        <div class="mb-3 mt-3">
                            <span class="mr-3">
                                <span class="mr-3">Màu nền</span>
                                <input type="color" v-model="editTagData.bgColor" required>
                            </span>

                            <span>
                                <span class="mr-3">Màu chữ</span>
                                <input type="color" v-model="editTagData.textColor" required>
                            </span>
                        </div>
                        <hr>

                        <div class="mt-3 mb-3">
                            <p>Icon: </p>

                            <span v-for="(icon, index) of icons" :key="index">
                                <span
                                class="material-icons btn-icon"
                                @click="editTagData.icon = icon"
                                >
                                    {{ icon }}
                                </span>
                            </span>
                        </div>
                        <hr>

                        <div class="mt-3 mb-4">
                            <p>Tên: </p>

                            <label class="input">
                                <span class="material-icons">tag</span>
                                <input type="text" v-model="editTagData.name" placeholder="Tên thẻ" required>
                                <p>Tên thẻ</p>
                            </label>
                        </div>

                        <button class="btn btn-primary">
                            <span class="material-icons mr-2">save</span>
                            Lưu
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </Transition>

    <MessagePopup
    :title="message.title"
    :message="message.message"
    :type="message.type"
    :is-display="message.isDisplay" />
</div>
</template>

<script>
import store from '@/assets/js/store'
import MessagePopup from '@/components/MessagePopup.vue'
import api from '@/assets/js/api'

export default {
    name: 'SDListView',

    components: {
        MessagePopup
    },

    data () {
        return {
            data: store.getAll(),

            editTagData: {
                title: 'Sửa thẻ',
                id: 0,
                icon: 'star',
                name: 'Test',
                textColor: '#000000',
                bgColor: '#ffa799',
                times: {
                    today: 12,
                    week: 23,
                    month: 44,
                    year: 99,
                    total: 99
                },
                isDisplay: false
            },

            icons: [
                'school', 'sports_esports', 'cake', 'self_improvement', 'water', 'nights_stay', 'sports_gymnastics', 'piano', 'music_note', 'movie', 'equalizer', 'shopping_cart', 'credit_card', 'receipt_long', 'attach_money', 'sell', 'work', 'calculate', 'edit_notifications', 'mail',
                'notifications', 'hub', 'smartphone', 'print', 'computer', 'desktop_windows', 'headphones', 'smart_toy', 'keyboard', 'memory', 'menu_book', 'star', 'library_books', 'auto_stories', 'local_library', 'import_contacts', 'sticky_note_2', 'note', 'laptop_chromebook', 'style',
                'edit', 'construction', 'draw', 'mic', 'palette', 'code', 'terminal', 'data_object', 'data_array'
            ],

            message: {
                title: '',
                message: '',
                type: '',
                isDisplay: false
            }
        }
    },

    methods: {
        openCreateTagPopup () {
            this.editTagData.title = 'Tạo thẻ'
            this.editTagData.id = 0
            this.editTagData.icon = 'star'
            this.editTagData.name = 'New Tag'
            this.editTagData.textColor = '#000000'
            this.editTagData.bgColor = '#ffa799'
            this.editTagData.times = {
                today: 0,
                week: 0,
                month: 0,
                year: 0,
                total: 0
            }
            this.editTagData.isDisplay = true
        },

        submitEditTag () {
            if (this.editTagData.id === 0) {
                this.createTag()
            } else {
                this.updateTag()
            }
        },

        createTag () {
            this.data.isLoading = true

            api.post('/study-diary', {
                name: this.editTagData.name,
                icon: this.editTagData.icon,
                bgColor: this.editTagData.bgColor,
                textColor: this.editTagData.textColor
            }).then(() => {
                this.data.isLoading = false

                this.showMessage(
                    'Thành công',
                    'Thêm thẻ thành công',
                    'success'
                )

                this.editTagData.isDisplay = false
            }).catch(err => {
                this.data.isLoading = false

                this.showMessage(
                    'Lỗi',
                    'Không thể kết nối đến máy chủ',
                    'error'
                )

                this.editTagData.isDisplay = false

                console.log(err)
            })
        },

        updateTag () {
            this.data.isLoading = true

            api.put('/study-diary/' + this.editTagData.id, {
                name: this.editTagData.name,
                icon: this.editTagData.icon,
                bgColor: this.editTagData.bgColor,
                textColor: this.editTagData.textColor
            }).then(() => {
                this.data.isLoading = false

                this.showMessage(
                    'Thành công',
                    'Cập nhật thẻ thành công',
                    'success'
                )

                this.editTagData.isDisplay = false
            }).catch(err => {
                this.data.isLoading = false

                this.showMessage(
                    'Lỗi',
                    'Không thể kết nối đến máy chủ',
                    'error'
                )

                this.editTagData.isDisplay = false

                console.log(err)
            })
        },

        showMessage (title, message, type) {
            this.message.title = title
            this.message.message = message
            this.message.type = type
            this.message.isDisplay = !this.message.isDisplay
        }
    }
}
</script>

<style scoped>
/* Grid list */
.grid-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    grid-gap: .5rem;
    margin-top: 20px;
}

.grid-item {
    background-color: rgb(181, 207, 87);
    border-radius: .5rem;
    padding: 1rem;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.grid-item .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.grid-item .title button {
    color: inherit;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    transition: text-shadow .5s;
}

.grid-item .title button:hover {
    text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.1);
}

/* Edit tag popup */

.btn-icon {
    cursor: pointer;
    border-radius: 50%;
    padding: .5rem;
    margin: .25rem;
}

.btn-color {
    display: inline-block;
    cursor: pointer;
    border-radius: 50%;
    padding: 1rem;
    margin: .25rem;
}
</style>