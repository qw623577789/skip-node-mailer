<template>
        <div id = "#email-content-display-box">
                <div id = "email-header">
                        <strong id = "subject">dd多多多多多多多多add多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多多</strong>
                        <label id = "sender-info">12306@rails.com.cn 于 09月11日 10:19 发给 qw623577789@163.com</label>
                        <label id = "cc">抄送给:我是一个粉刷匠qw623577789@163.com;我是一个粉刷匠qw623577789@163.com;我是一个粉刷匠qw623577789@163.com;我是一个粉刷匠qw623577789@163.com</label>
                </div>
                <div id = "email-content">
                        <div id = "body">222222222222<br><br></div>
                        <ul id = "attachment">
                        <li class = "attachment-item" v-for = "item in emailList">rrrrrrrr</li>
                        </ul>
                </div>
        </div>
</template>

<style lang="scss" scoped>
    @import "./index.scss";
</style>