<template>
        <div class = "wrapper">
                <div class = "content">
                    <div id = "window-bar"><image-btn id = "close" @click.native="close"></image-btn></div>
                    <slot></slot>
                </div>
                <div class = "shadow" v-bind:style = "styleObj"></div>
        </div>
</template>
      
<script>
    import imageBtn from "@/components/ImageBtn";

    export default {
        data() {
            return {
            }

        },
        components : {
        imageBtn
        },
        methods : {
            close : function(){
                this.$emit('close', null);
            }
        },
        mounted() {
        },
        created () {
        }
    }
</script>

<style lang="scss" scoped>
    @import "./index.scss";
</style>