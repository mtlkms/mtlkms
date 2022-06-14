<template>
<div>
    <table>
        <tr>
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wed</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
        </tr>
        <tr v-for="(row, i) in diaries" :key="i">
            <td v-for="(col, j) in row" :key="j">
                <p
                :title="'Ngày ' + col.day"
                v-if="col.day != ''"
                @click="setShowDay(i, j, col.day)"
                :style="{ backgroundColor: dayBackground(col.diary.length) }">
                    {{ col.day }}
                </p>
            </td>
        </tr>
    </table>
    <hr>

    <div>
        <h3 class="mb-4">{{ showDay.title }}</h3>

        <div v-if="!showDay.isInit">
            Hôm nay bạn chưa học gì
        </div>
        <div v-else-if="diaries[showDay.row][showDay.cols].diary.length == 0">
            Bạn không học gì vào ngày này
            <br><br>
        </div>
        <div
        v-else
        v-for="(diary, index) in diaries[showDay.row][showDay.cols].diary"
        :key="index">
            <div class="ml-3">
                <p>Bắt đầu: <b>{{ new Date(diary.start_at).toLocaleString('vi-VN') }}</b></p>
                <p>Kết thúc: <b>{{ new Date(diary.stop_at).toLocaleString('vi-VN') }}</b></p>
                <p>Đã học: <b>{{ caculateTime(diary.start_at, diary.stop_at) }}</b></p>
                <p class="quote" v-html="parseMarkdown(diary.log)"></p>
            </div>
            <br>
            <hr>
            <br>
        </div>
    </div>
</div>
</template>

<script>
import api from '@/assets/js/api'
import store from '@/assets/js/store'
import { marked } from 'marked'

export default {
    name: 'ContributionDiary',

    props: {
        propsDiaries: {
            type: Array,
            default: () => []
        },

        tag: {
            type: Number,
            required: true
        },

        refeshToogle: {
            type: Boolean,
            default: false
        }
    },

    created () {
        if (this.propsDiaries.length != 0) {
            this.putDiary(this.propsDiaries)
        }
        else {
            this.getDiaries()
        }
    },

    data () {
        return {
            data: store.getAll(),
            diaries: [],
            showDay: {
                row: 0,
                cols: 0,
                isInit: false,
                title: 'Hôm nay',
                month: 0,
                day: 0,
                year: 0
            },
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear()
        }
    },

    methods: {
        async getDiaries () {
            if (this.tag == 0) {
                throw new Error('tag is required')
            }

            let result = await api.get(`/study-diary/diary/${this.data.user.id}/${this.year}/${this.month}/${this.tag}`)
            let data = await result.json()

            if (result.status != 200) {
                throw new Error(data.error)
            }

            if (data.data.length > 0) this.putDiary(data.data)
        },

        putDiary (diaries) {
            let cols = [
                [], // Sun
                [], // Mon
                [], // Tue
                [], // Wed
                [], // Thu
                [], // Fri
                [] // Sat
            ]

            let rows = [
                [[],[0],[],[],[],[],[]],
                [[],[],[],[],[],[],[]],
                [[],[],[],[],[],[],[]],
                [[],[],[],[],[],[],[]],
                [[],[],[],[],[],[],[]],
                cols
            ]

            let date = new Date(diaries[0].start_at)
            let startDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()
            let endDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
            let count = 1

            for (let i = 0; i < rows.length; i++) {
                for (let j = 0; j < rows[i].length; j++) {
                    let day = count - startDay

                    if (day > 0 && day <= endDay) {
                        rows[i][j] = {
                            day: day,
                            diary: []
                        }
                    }
                    else {
                        rows[i][j] = {
                            day: '',
                            diary: []
                        }
                    }

                    count++
                }
            }

            diaries.forEach(diary => {
                let date = new Date(diary.start_at)
                let day = date.getDate()
                let weekday = date.getDay()

                let startDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay()

                let row = Math.ceil((day + startDay) / 7) - 1

                rows[row][weekday].diary.push(diary)

                if (date.toDateString() == new Date().toDateString()) {
                    this.showDay.row = row
                    this.showDay.cols = weekday
                    this.showDay.isInit = true
                }
            })

            this.diaries = rows
        },

        parseMarkdown (text) {
            return marked.parse(text)
        },

        caculateTime (start, end) {
            let startTime = new Date(start)
            let stopTime = new Date(end)
            let timeDiff = stopTime.getTime() - startTime.getTime()
            let minutes = Math.round(timeDiff / 60000)
            let hours = (minutes / 60).toFixed(2)

            return `${minutes} phút (${hours} giờ)`
        },

        setShowDay (row, cols, day) {
            this.showDay.row = row
            this.showDay.cols = cols
            this.showDay.day = day
            this.showDay.title = `${day}/${this.month}/${this.year}`
        },

        dayBackground (length) {
            switch (length) {
                case 0: return '#ffffff'
                case 1: return '#ff907f30'
                case 2: return '#ff907f50'
                case 3: return '#ff907f70'
                case 4: return '#ff907f90'
                case 5: return '#ff907fa0'
                case 6: return '#ff907fc0'
                case 7: return '#ff907fe0'
                default: return '#ff907f'
            }
        }
    },

    watch: {
        refeshToogle: {
            handler () {
                this.getDiaries()
            },
            deep: true
        }
    }
}
</script>

<style scoped>
table {
    width: 100%;
    text-align: center;
    padding-top: 1rem;
    border-radius: .5rem;
}

table p {
    display: inline-block;
    cursor: pointer;
    border-radius: 50%;
    padding: .5rem .85rem;
    transition: box-shadow .5s;
}

table p:hover {
    box-shadow: .25rem .25rem .25rem #ff907f50;
}
</style>