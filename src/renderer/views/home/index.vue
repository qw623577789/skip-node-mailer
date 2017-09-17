<<template>
        <div id = 'wrapper'>
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
                    <div id = "search-box"></div>
                    <ul id = "email-list" ref="emailList">
                            <li class = "email-block" v-for = "item in emailList" @click = "emailBlockSelect" @contextmenu.prevent = "emailBlockMenuShow">
                                <email-block :emailInfo = "item" ></email-block>
                                <hr>
                            </li>
                    </ul>
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
        </div>    
      </template>
      
      <script>
          import customHeader from "@/components/CustomHeader";
          import imageBtn from "@/components/ImageBtn";
          import badgeImageBtn from "@/components/BadgeImageBtn";
          import emailBlock from "@/components/EmailBlock";

          export default {
              data() {
                  return {
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
                  emailBlock
              },
              methods : {
                  windowBtnClick: function(method){
                      switch(method){
                          case 'minimize':
                            this.ipcSender.send('window_operate', 'minimize');
                            break;
                          case 'maximize':

                            this.ipcSender.send('window_operate', 'maximize');
                            break;
                          case 'close':
                            this.ipcSender.send('window_operate', 'close');
                            break;           
                      }
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