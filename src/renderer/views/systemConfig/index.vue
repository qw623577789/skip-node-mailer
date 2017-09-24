<<template>
        <el-row id = "wrapper">
            <el-col :span="4">
                <ul id = "sidebar">
                    <li class = "group">
                        <label class = "group-title">常规设置</label>
                        <ul class = "group-items">
                            <li class = "item">启动</li>
                            <li class = "item">退出</li>
                        </ul>
                    </li>
                    <li class = "group">
                        <label class = "group-title">操作习惯</label>
                        <ul class = "group-items">
                            <li class = "item">写信设置</li>
                            <li class = "item">收信设置</li>
                        </ul>
                    </li>
                    <li class = "group">
                        <label class = "group-title">快捷键</label>
                        <ul class = "group-items">
                            <li class = "item">程序</li>
                        </ul>
                    </li>
                </ul>
              </el-col>
              <el-col :span="20">
                    <el-form  :model="form" label-width="120px" label-position = "left" id = "config-content">
                        <area-title class = "area-title" title = "启动"></area-title>
                        <el-form-item label="开机自启">
                            <el-switch v-model="value2" on-color="#f4ea2a"></el-switch>
                        </el-form-item>

                        <area-title class = "area-title" title = "退出"></area-title>
                        <el-form-item label="关闭主窗口">
                            <el-radio-group v-model = "radio">
                                <el-radio label="最小化到托盘"></el-radio>
                                <el-radio label="退出程序"></el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <area-title class = "area-title" title = "写信设置"></area-title>
                        <el-form-item label="自动保存(分钟)">
                            <el-input-number></el-input-number>
                        </el-form-item>

                        <area-title class = "area-title" title = "收信设置"></area-title>
                        <el-form-item label="桌面通知">
                            <el-switch v-model="value2" on-color="#f4ea2a"></el-switch>
                        </el-form-item>
                        <el-form-item label="声音通知" id = "test">
                            <div id = "sound-config-box">
                                <el-switch v-model="value2" on-color="#f4ea2a"></el-switch>
                                <el-input v-model="input" id = "sound-path"></el-input>
                                <image-btn id = "open-file"></image-btn>
                                <image-btn id = "play-sound"></image-btn>
                            </div>
                        </el-form-item>
                        <div></div>
                        
                        <area-title class = "area-title" title = "程序"></area-title>
                        <el-form-item label="显示主程序">
                            <el-input v-model="input" placeholder="请输入内容"></el-input>
                        </el-form-item>
                        <el-form-item label="最小化到托盘">
                            <el-input v-model="input" placeholder="请输入内容"></el-input>
                        </el-form-item>
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