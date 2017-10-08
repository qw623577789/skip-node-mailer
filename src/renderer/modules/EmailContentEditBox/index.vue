<template>
    <div id = "email-content-display-box">
        <el-form label-width="80px" label-position = "left" id = "email-form">
                <el-form-item label="发件人">
                        <el-select placeholder="请选择" class = "select" v-model="valueTest" >
                        </el-select>
                </el-form-item>
                <el-form-item label="收件人" v-model="value10">
                    <el-select  multiple filterable allow-create placeholder="请选择文章标签" class = "select" v-model="valueTest">
                            <el-option
                            class = "select-option"
                            v-for="item in options5"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="抄送">
                    <el-select  multiple filterable allow-create placeholder="请选择文章标签" class = "select" v-model="valueTest">
                    </el-select>
                </el-form-item>
                <el-form-item label="密送">
                        <el-select  multiple filterable allow-create placeholder="请选择文章标签" class = "select" v-model="valueTest">

                        </el-select>
                    </el-form-item>                
                <el-form-item label="主题">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="附件">
                        <el-input></el-input>
                </el-form-item>
                
                <vueditor id = "content"></vueditor>
                
                <el-form-item label="其他选项">
                    <el-checkbox-group id = "otherConfig">
                        <el-checkbox label="需要回执"></el-checkbox>
                        <el-checkbox label="紧急"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <div id = "btn-bar">
                        <el-button  class = "btn" :plain="true" type="success">发送</el-button>
                        <el-button  class = "btn":plain="true" type="success">存入草稿</el-button>
                </div>

            </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                valueTest: "",
                options5: [{
                    value: 'qw623577789@163.com',
                    label: 'zxs<qw623577789@163.com>'
                    }, {
                    value: 'qw623577789@126.com',
                    label: 'qw623577789@126.com'
                    }, {
                    value: '623577789@163.com',
                    label: '623577789@163.com'
                    }],
                    value10: []
                }
            
        }
    }
</script>

<style lang="scss" scoped>
    @import "./index.scss";
</style>