<<template>
        <div class = 'wrapper'>
            <div id = "header">
                  <custom-header @window-btn-method="windowBtnClick"></custom-header>
                  <div id="toolbar">
                          <badge-image-btn id = "in-box" :badgeCaption = "unSeenAmount"></badge-image-btn>
                          <image-btn id = "out-box"></image-btn>
                          <image-btn id = "draft-box"></image-btn>
                          <image-btn id = "deleted-box" @click.native="test"></image-btn>
                  </div>
            </div>

            <div id = "content">
                <div id = "left">
                    <div class = "shadow" v-show = "false">
                        <transition name="loading" type="animation">
                            <img id = "loading" transition="loading" src = "../../assets/imgs/loading.png">
                        </transition>
                    </div>

                    <div id = "search-box">
                            <el-input placeholder="请输入搜索内容" v-model="input5" id = "search-bar">
                                <el-select v-model="select" slot="prepend" placeholder="请选择" id = "search-type">
                                    <el-option label="发件人" value="1"></el-option>
                                    <el-option label="主题" value="2"></el-option>
                                    <el-option label="正文" value="3"></el-option>
                                    <el-option label="时间" value="4"></el-option>
                                </el-select>
                                <el-button slot="append" icon="search" id = "search-btn"></el-button>
                            </el-input>
                            <el-date-picker v-model="value7" type="daterange" align="right" placeholder="选择日期范围" :picker-options="pickerOptions2" id = "date-box"> </el-date-picker>
                    </div>

                    <ul id = "email-list" ref="emailList">
                            <li class = "email-block" v-for = "item in emailList" @click = "emailBlockSelect" @contextmenu.prevent = "emailBlockMenuShow">
                                <email-block :emailInfo = "item" ></email-block>
                                <hr>
                            </li>
                    </ul>

                    <div id = "system-bar">
                            <image-btn id = "email-order"></image-btn>
                            <image-btn id = "mailbox-manage" @click.native = "mailboxManageBtnClick"></image-btn>
                            <image-btn id = "system-config" @click.native = "systemConfigBtnClick"></image-btn>
                            <badge-image-btn id = "info" @click.native = "mailboxAddBtnClick"></badge-image-btn>
                    </div>
                </div>

                <div id = "right">
                    <div id = "email-content-box">
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

                    <div id = "reply-quickly-box">
                        <div id = "reply-quickly-tool-box">
                            <label id = "full-style">切换到完整模式</label>
                        </div>
                        <div id = "reply-box" >
                            <textarea id = "reply" @focus = "replyOnFocus" @blur =  "replyLostFocus"></textarea>
                            <image-btn id = "reply-send">发送</image-btn>
                        </div>
                    </div>
                </div>

            </div>

            <!-- <popup-window :show = "systemConfigVisible">
                <system-config-view></system-config-view>
            </popup-window> -->

            <popup-window :show = "mailboxManageVisible">
                <mailbox-manage-view></mailbox-manage-view>
            </popup-window>

            <!-- <popup-window :show = "testState">
                <mailbox-add-view></mailbox-add-view>
            </popup-window> -->
        </div>

</template>
      
      <script>
          import customHeader from "@/components/CustomHeader";
          import imageBtn from "@/components/ImageBtn";
          import badgeImageBtn from "@/components/BadgeImageBtn";
          import emailBlock from "@/components/EmailBlock";
          import popupWindow from "@/components/PopupWindow";

          import systemConfigView from "@/views/systemConfig"
          import mailboxManageView from "@/views/mailboxManage"
          import mailboxAddView from "@/views/mailboxAdd"
          export default {
              data() {
                  return {
                    pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value7: '',
        select: '',
        systemConfigVisible : false,
        mailboxManageVisible : false,
        mailboxAddVisible : true,
        testState: true,
        input5 : "",
                    unSeenAmount :  "22",
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
              components : {
                  customHeader,
                  imageBtn,
                  badgeImageBtn,
                  emailBlock,
                  popupWindow,
                  systemConfigView,
                  mailboxManageView,
                  mailboxAddView
              },
              methods : {
                  windowBtnClick: function(method) {
                      switch(method){
                          case 'minimize':
                            this.ipcSender.send('main_window_operate', 'minimize');
                            break;
                          case 'maximize':
                            this.ipcSender.send('main_window_operate', 'maximize');
                            break;
                          case 'close':
                            this.ipcSender.send('main_swindow_operate', 'close');
                            break;           
                      }
                  },
                  systemConfigBtnClick: function() {
                    this.systemConfigVisible = true;
                    //this.ipcSender.send('system_config_window_operate', 'show');
                  },
                  mailboxManageBtnClick: function() {
                    this.mailboxManageVisible = true;
                    //this.ipcSender.send('system_config_window_operate', 'show');
                  },
                  mailboxAddBtnClick: function() {
                    this.mailboxAddVisible = true;
                    //this.ipcSender.send('system_config_window_operate', 'show');
                  },
                  test : function(){
                    this.emailList.push({"senderName": "aaaa", "receiveTime": "2017-10-10 12:52", "isUnseen": true, "hasAttachment": true, "subject": "萨达大大大大大大大大大大大大大大大多", "content": "宣传册错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错错"})
                  },
                  replyOnFocus : function(){
                    
                  },
                  replyLostFocus: function(){

                  },
                  emailBlockSelect: function(){
                    console.log("eeeeee")
                  },
                  emailBlockMenuShow: function(){
                    this.ipcSender.send('email_list_operate', 'showEmailBlockMenu');
                  }
              },
              mounted() {
                  let emailListControl = this.$refs.emailList;
                  let that = this;
                  emailListControl.addEventListener('scroll', () => {
                    if(emailListControl.scrollTop + emailListControl.clientHeight >= emailListControl.scrollHeight) {
                        // 触发加载数据        
                        that.test()
                    }
                });

              },
              created () {
                // var self = this
                // $("#email-list").scroll(function () {
                //     let scrollTop = $(this).scrollTop()
                //     let scrollHeight = $(document).height()
                //     let windowHeight = $(this).height()
                //     if (scrollTop + windowHeight === scrollHeight) {
                //     console.log("eeeee")
                //     }
                // })
            },
          }
      </script>
      
      <style lang="scss" scoped>
          @import "./index.scss";
      </style>