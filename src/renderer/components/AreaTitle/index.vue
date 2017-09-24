<template>
    <div class = "wrapper">
        <label class = "title">{{title}}</label>
        <hr class = "line">
    </div>
</template>

<script>
    export default {
        props : ["title"]
    }
</script>

<style lang="scss" scoped>
    @import "./index.scss";
</style>