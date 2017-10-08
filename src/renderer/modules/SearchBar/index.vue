<template>
    <div>
        <el-input placeholder="请输入搜索内容" v-model="searchValue" class = "search-bar">
            <el-select v-model = "searchType" slot="prepend" placeholder="" class = "search-type" @change = "selectChange">
                <el-option label="发件人" value="1"></el-option>
                <el-option label="主题" value="2"></el-option>
                <el-option label="正文" value="3"></el-option>
                <el-option label="时间" value="4"></el-option>
            </el-select>
            <image-btn id = "search" slot="append" @click.native = "searchClick"></image-btn>
        </el-input>
        <el-date-picker v-show = "dateBoxVisiable" v-model="searchValue" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions" class = "date-box"> </el-date-picker>
    </div>      
</template>

<script>
    import imageBtn from "@/components/ImageBtn";

    export default {
        data() {
            return {
                dateBoxVisiable : false,
                searchType : "",
                searchValue : "",
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '最近一周',
                            onClick(picker) {
                                let end = new Date();
                                let start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                                picker.$emit('pick', [start, end]);
                            }
                        }, 
                        {
                            text: '最近一个月',
                            onClick(picker) {
                                let end = new Date();
                                let start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                                picker.$emit('pick', [start, end]);
                            }
                        }, 
                        {
                            text: '最近三个月',
                            onClick(picker) {
                                let end = new Date();
                                let start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                picker.$emit('pick', [start, end]);
                            }
                        }
                    ]
                },
            }
        },
        components: {
            imageBtn
        },
        methods: {
            selectChange : function(value) {
                switch(value) {
                    case "4" : 
                        this.dateBoxVisiable = true;
                        break;
                    default :
                        this.dateBoxVisiable = false;
                        break;
                }
            },
            searchClick : function() {
                this.$emit('searchClick', null);
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "./index.scss";
</style>