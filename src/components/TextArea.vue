<template>
<div>
    <div class="header">
        {{ value }}
    </div>

    <textarea
    :rows="rows"
    :placeholder="placeholder"
    v-model="value"
    ></textarea>
</div>
</template>

<script>
export default {
    name: 'TextArea',

    props: {
        modelValue: {
            type: String
        },
        placeholder: {
            type: String
        },
        rows: {
            type: Number,
            default: 30
        }
    },

    emits: ['update:modelValue'],

    computed: {
        value: {
            get () {
                return this.modelValue
            },
            set (value) {
                this.$emit('update:modelValue', value)
            }
        }
    }
}
</script>

<style scoped>

</style>