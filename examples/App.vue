<template>
    <div id="app">
    </div>
</template>

<script>
export default {
    mounted() {
        console.log(this)
        this.$message({
            msg: "111"
        })
    }
}
</script>

<style lang="scss">
    body, html, #app {
        margin: 0;
        width: 100%;
        height: 100%;
        background-color: red;
    }
</style>