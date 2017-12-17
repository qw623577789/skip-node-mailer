<template>
    <div id = "header">
        <el-dropdown @command="handleCommand" id ="email-current" menu-align = "start" trigger = "click">
            <span class="el-dropdown-link">
                qw623577789@163.com<i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">qw623577789@163.com</el-dropdown-item>
                <el-dropdown-item command="b">qw623577789@163.com</el-dropdown-item>
                <el-dropdown-item command="c">qw623577789@163.com</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        <custom-header @window-btn-method="windowBtnClick"></custom-header>


        <div id="toolbar">
                <badge-image-btn id = "in-box" :badgeCaption = "unSeenAmount" @click.native = "inboxClick"></badge-image-btn>
                <image-btn id = "out-box" @click.native = "outboxClick"></image-btn>
                <image-btn id = "draft-box" @click.native = "draftBoxClick"></image-btn>
                <image-btn id = "deleted-box" @click.native="deleteBoxClick"></image-btn>
        </div>
    </div>
</template>

<script>
    import customHeader from "@/components/CustomHeader";
    import imageBtn from "@/components/ImageBtn";
    import badgeImageBtn from "@/components/BadgeImageBtn";

    export  default {
        data() {
            return {
                unSeenAmount :  "22",
                emailCurrent : ""
            }
        },
        components : {
            customHeader,
            imageBtn,
            badgeImageBtn
        },
        methods : {
            windowBtnClick: function(method) {
                switch(method){
                    case 'minimize':
                    this.ipcSender.send('window_operate', 'minimize');
                    break;
                    case 'maximize':
                    this.ipcSender.send('window_operate', 'maximize');
                    break;
                    case 'close':
                    this.ipcSender.send('window_operate', 'close');
                    break;           
                }
            },
            inboxClick: function() {
                this.$router.push('/inbox');
            },
            outboxClick: function() {
                this.$router.push('/outbox');
            },
            draftBoxClick: function() {
                this.$router.push('/draftbox');
            },
            deleteBoxClick: function() {
                this.$router.push('/deletebox');
            }
        }
    }
</script>
this.$router.push('/home/first')
<style lang="scss" scoped>
    @import "./index.scss";
</style>