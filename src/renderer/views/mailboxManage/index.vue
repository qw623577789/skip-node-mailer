<<template>
        <el-row id = "wrapper">
            <el-col :span="6">
                <ul id = "sidebar">
                    <li>qw6235777896666666@163.com</li>
                    <li>qw623577789@163.com</li>
                    <li>qw623577789@163.com</li>
                    <li>qw623577789@163.com</li>
                    <li>qw623577789@163.com</li>
                    <li>qw623577789@163.com</li>
                </ul>
              </el-col>
              <el-col :span="18" id = "config-content">
                    <el-form  :model="form" label-width="120px" label-position = "left">
                        <area-title class = "area-title" title = "账号设置"></area-title>
                        <el-form-item label="账号">
                                <el-input v-model="input"></el-input>
                        </el-form-item>
                        <el-form-item label="密码">
                                <el-input v-model="input"></el-input>
                        </el-form-item>

                        <area-title class = "area-title" title = "收信设置"></area-title>
                        <el-form-item label="状态">
                                <el-switch v-model="value2" on-color="#f4ea2a"></el-switch>
                        </el-form-item>
                        <el-form-item label="协议">
                                <el-radio-group v-model="radio2">
                                        <el-radio :label="3">IMAP(推荐)</el-radio>
                                        <el-radio :label="6">POP3</el-radio>
                                </el-radio-group>
                        </el-form-item>
                        <el-form-item label="SSL安全协议">
                                <el-switch v-model="value2" on-color="#f4ea2a"></el-switch>
                        </el-form-item>
                        <el-form-item label="地址">
                                <el-input v-model="input"></el-input>
                        </el-form-item>
                        <el-form-item label="端口">
                                <el-input v-model="input"></el-input>
                        </el-form-item>


                        <area-title class = "area-title" title = "写信设置"></area-title>
                        <el-form-item label="状态">
                                <el-switch v-model="value2" on-color="#f4ea2a"></el-switch>
                        </el-form-item>
                        <el-form-item label="SSL安全协议">
                                <el-switch v-model="value2" on-color="#f4ea2a"></el-switch>
                        </el-form-item>
                        <el-form-item label="地址">
                                <el-input v-model="input"></el-input>
                        </el-form-item>
                        <el-form-item label="端口">
                                <el-input v-model="input"></el-input>
                        </el-form-item>

                        <el-button type="danger">危险按钮</el-button>
                        <el-button type="info">信息按钮</el-button>
                    </el-form>

              </el-col>

        </el-row>    
      </template>
      
      <script>
           import areaTitle from "@/components/AreaTitle";
           import imageBtn from "@/components/ImageBtn";

          export default {
              data() {
                  return {
                    value2: true,
                    radio: "1"
                  }
              },
              components : {
                areaTitle,
                imageBtn
              },
              methods : {

              },
              mounted() {

              },
              created () {

            },
          }
      </script>
      
      <style lang="scss" scoped>
          @import "./index.scss";
      </style>