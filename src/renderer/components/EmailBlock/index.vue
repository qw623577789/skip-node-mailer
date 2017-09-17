<template>
    <div class = "email-block-frame">
        <div class = "unseen" v-show = "emailInfo.isUnseen"></div>
        <div class = "email-block-first-line">
            <nobr class = "email-block-sender-name">{{emailInfo.senderName}}</nobr>
            <img class = "email-block-attachment-sign" src = "../../assets/imgs/attachment.png"  v-show = "emailInfo.hasAttachment"></img>
            <nobr class = "email-block-receive-time">{{emailInfo.receiveTime}}</nobr>
        </div>
        <nobr class = "email-block-subject">{{emailInfo.subject}}</nobr>
        <nobr class = "email-block-content">{{emailInfo.content}}</nobr>
    </div>
</template>

<script>
    export default {
        props : [
            "emailInfo"
        ]
    }
</script>

<style lang="scss" scoped>
    @import "./index.scss";
</style>