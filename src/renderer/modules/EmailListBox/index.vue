<template>
    <ul id = "email-list" ref="emailList">
        <li class = "email-block" v-for = "item in emailList" @click = "leftClick" @contextmenu.prevent = "rightClick">
            <email-block :emailInfo = "item" ></email-block>
            <hr>
        </li>
    </ul>
</template>

<script>
    import emailBlock from "@/components/EmailBlock";

    export default {
        data() {
            return {
                emailList : [
                        {"senderName": "aaaa", "receiveTime": "2017-10-10 12:52", "isUnseen": true, "hasAttachment": true, "subject": "萨达大大大大大大大大大大大大大大大多", "content": "宣传册错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错"},
                        {"senderName": "aaaa", "receiveTime": "2017-10-10 12:52", "isUnseen": true, "hasAttachment": true, "subject": "萨达大大大大大大大大大大大大大大大多", "content": "宣传册错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错"},
                        {"senderName": "aaaa", "receiveTime": "2017-10-10 12:52", "isUnseen": true, "hasAttachment": true, "subject": "萨达大大大大大大大大大大大大大大大多", "content": "宣传册错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错"},
                        {"senderName": "aaaa", "receiveTime": "2017-10-10 12:52", "isUnseen": true, "hasAttachment": true, "subject": "萨达大大大大大大大大大大大大大大大多", "content": "宣传册错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错"},
                        //{"senderName": "aaaa", "receiveTime": "2017-10-10 12:52", "isUnseen": true, "hasAttachment": true, "subject": "萨达大大大大大大大大大大大大大大大多", "content": "宣传册错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错"},
                        //{"senderName": "aaaa", "receiveTime": "2017-10-10 12:52", "isUnseen": true, "hasAttachment": true, "subject": "萨达大大大大大大大大大大大大大大大多", "content": "宣传册错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错"},
                        //{"senderName": "aaaa", "receiveTime": "2017-10-10 12:52", "isUnseen": true, "hasAttachment": true, "subject": "萨达大大大大大大大大大大大大大大大多", "content": "宣传册错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错"}
                        // {"title": "aaaa"},
                        // {"title": "aaaa"},
                        // {"title": "aaaa"},
                        // {"title": "aaaa"},
                        // {"title": "aaaa"},
                        // {"title": "aaaa"},
                        // {"title": "aaaa"},
                        // {"title": "aaaa"},
                        // {"title": "aaaa"},
                        // {"title": "aaaa"},
                        // {"title": "aaaa"},
                        // {"title": "aaaa"},
                        // {"title": "aaaa"},
                        // {"title": "aaaa"},
                        // {"title": "aaaa"},
                        // {"title": "aaaa"},
                        // {"title": "aaaa"},
                    ]
            }
        },
        methods: {
          leftClick : function() {
            this.$emit('leftClick', null)
          },
          rightClick: function() {
            this.$emit('rightClick', null)
          }
        },
        mounted() {
            let emailListControl = this.$refs.emailList;
            let that = this;
            emailListControl.addEventListener('scroll', () => {
                if(emailListControl.scrollTop + emailListControl.clientHeight >= emailListControl.scrollHeight) {
                    // 触发加载数据        
                    this.$emit('scrollBottom', null)
                }
            });
        },
        created () {
        },
        components : {
            emailBlock
        }
    }
</script>

<style lang="scss" scoped>
    @import "./index.scss";
</style>