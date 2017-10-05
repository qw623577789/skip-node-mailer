<<template>
        <div class = "wrapper"> 
                <el-form label-width="120px" label-position = "left" class = "account-box form" >
                        <el-form-item label="邮箱地址">
                                <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="昵称">
                                <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="分组">
                                <el-form-item label="昵称">
                                        <el-input></el-input>
                                </el-form-item>
                        </el-form-item>
                        <div class = "btn-bar">
                                <el-button type="success"   :plain="true"  class = "btn next" @click.native = "save">保存</el-button>
                        </div>
                </el-form>
        </div>    
      </template>
      
      <script>
          export default {
              data() {
                  return {
                    value2: true,
                    radio: "1",
                  }
              },
              components : {
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