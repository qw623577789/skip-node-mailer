<template>
    <div class = "image-btn-box">
        <a class="image-box" ></a>
        <span class="badge">{{badgeCaption}}</span>
    </div>
</template>

<script>
    export default {
        props : ["badgeCaption"]
    }
</script>

<style lang="scss" scoped>
    @import "./index.scss";
</style>