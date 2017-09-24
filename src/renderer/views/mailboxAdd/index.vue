<<template>
        <div class = "wrapper"> 
                <el-steps  :active="step" :center="true" finish-status="success">
                        <el-step title="填写账号密码"></el-step>
                        <el-step title="收信配置"></el-step>
                        <el-step title="发信配置"></el-step>
                        <el-step title="完成"></el-step>
                </el-steps>
                <div id = "fill-box":style = "fillBoxStyleObj">
                        <el-form label-width="120px" label-position = "left" class = "account-box form" >
                                <el-form-item label="账号">
                                        <el-input></el-input>
                                </el-form-item>
                                <el-form-item label="密码">
                                        <el-input></el-input>
                                </el-form-item>
                                <div class = "btn-bar">
                                        <el-button type="success" class = "btn next" @click.native = "nextStep">下一步</el-button>
                                </div>
                        </el-form>

                        <el-form
                                label-width="120px" 
                                label-position = "left" 
                                class = "form"
                                v-loading="loading2"
                                element-loading-text="检测中"
                        >
                                <el-form-item label="协议">
                                        <el-radio-group>
                                                <el-radio :label="3">IMAP(推荐)</el-radio>
                                                <el-radio :label="6">POP3</el-radio>
                                        </el-radio-group>
                                </el-form-item>
                                <el-form-item label="SSL安全协议">
                                        <el-switch v-model="value2" on-color="#f4ea2a"></el-switch>
                                </el-form-item>
                                <el-form-item label="地址">
                                        <el-input></el-input>
                                </el-form-item>
                                <el-form-item label="端口">
                                        <el-input></el-input>
                                </el-form-item>
                                <label class="info-box">邮箱被禁哟</label>
                                <div class = "btn-bar">
                                        <el-button type="success" class = "btn">上一步</el-button>
                                        <el-button type="success" class = "btn">检测</el-button>
                                        <el-button type="success" class = "btn" @click.native = "nextStep">下一步</el-button>
                                        <el-button type="success" class = "btn">跳过</el-button>
                                </div>
                        </el-form>

                        <el-form
                                label-width="120px" 
                                label-position = "left" 
                                class = "form"   
                                v-loading="loading2"
                                element-loading-text="检测中"
                        >
                                <el-form-item label="SSL安全协议">
                                        <el-switch v-model="value2" on-color="#f4ea2a"></el-switch>
                                </el-form-item>
                                <el-form-item label="地址">
                                        <el-input></el-input>
                                </el-form-item>
                                <el-form-item label="端口">
                                        <el-input></el-input>
                                </el-form-item>
                                <label class="info-box">邮箱被禁哟</label>
                                
                                <div class = "btn-bar">
                                        <el-button type="success" class = "btn">上一步</el-button>
                                        <el-button type="success" class = "btn">检测</el-button>
                                        <el-button type="success" class = "btn" @click.native = "nextStep">保存</el-button>
                                        <el-button type="success" class = "btn">跳过</el-button>
                                </div>

                        </el-form>

                        <el-form
                                label-width="120px" 
                                label-position = "left" 
                                class = "form finish-box"
                        >
                                <image-btn class = "finish"></image-btn>
                                <div class = "btn-bar">
                                        <el-button type="success" class = "btn">管理邮箱</el-button>
                                        <el-button type="success" class = "btn">关闭</el-button>
                                </div>


                        </el-form>
                </div>
        </div>    
      </template>
      
      <script>
           import areaTitle from "@/components/AreaTitle";
           import imageBtn from "@/components/ImageBtn";

          export default {
              data() {
                  return {
                    value2: true,
                    radio: "1",
                    loading2:false,
                    step : 0,
                    fillBoxStyleObj : {
                            marginLeft : '0px'
                    }
                  }
              },
              components : {
                areaTitle,
                imageBtn
              },
              methods : {
                nextStep : function(){
                        this.step++;
                        this.fillBoxStyleObj.marginLeft = -this.step * 545 + 'px';
                        console.log(this.fillBoxStyleObj.marginLeft)
                }
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