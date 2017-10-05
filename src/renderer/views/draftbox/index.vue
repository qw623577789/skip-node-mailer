<<template>
        <div class = 'wrapper'>
            <window-header></window-header>
            <div id = "content">
                <div id = "left">
                    <div class = "shadow" v-show = "false">
                        <transition name="loading" type="animation">
                            <img id = "loading" transition="loading" src = "../../assets/imgs/loading.png">
                        </transition>
                    </div>

                    <search-bar id = "search-box" @searchClick = "searchClick"></search-bar>
                    <email-list-box id = "email-list" @leftClick = "emailBlockSelect" @rightClick = "emailBlockMenuShow" @scrollBottom = "emailListScrollBottom"></email-list-box>

                    <div id = "system-bar">
                            <image-btn id = "email-order"></image-btn>
                            <image-btn id = "mailbox-manage" @click.native = "mailboxManageBtnClick"></image-btn>
                            <image-btn id = "system-config" @click.native = "systemConfigBtnClick"></image-btn>
                            <badge-image-btn id = "info" @click.native = "mailboxAddBtnClick"></badge-image-btn>
                    </div>
                </div>

                <div id = "middle">
                    <email-content-edit-box id = "email-content-box"></email-content-edit-box>
                </div>

                <div id = "right">
                    <address-list></address-list>
                </div>

            </div>

            <transition name="el-fade-in-linear">
                    <popup-window id = "test1" v-if = "systemConfigVisible" @close="systemConfigVisible = false">
                        <system-config-view></system-config-view>
                    </popup-window>
        
                    <popup-window v-if = "mailboxManageVisible" @close="mailboxManageVisible = false">
                        <mailbox-manage-view></mailbox-manage-view>
                    </popup-window>
        
                    <popup-window v-if = "mailboxAddVisible" @close="mailboxAddVisible = false">
                        <mailbox-add-view></mailbox-add-view>
                    </popup-window>
            </transition>

        </div>

</template>
      
      <script>
          import imageBtn from "@/components/ImageBtn";
          import badgeImageBtn from "@/components/BadgeImageBtn";

          import popupWindow from "@/components/PopupWindow";

          import systemConfigView from "@/modules/SystemConfig"
          import mailboxManageView from "@/modules/MailboxManage"
          import mailboxAddView from "@/modules/MailboxAdd"
          import searchBar from "@/modules/SearchBar"
          import windowHeader from "@/modules/Header"
          import emailListBox from "@/modules/EmailListBox"
          import emailContentDisplayBox from "@/modules/EmailContentDisplayBox"
          import emailContentEditBox from "@/modules/EmailContentEditBox"
          import addressList from "@/modules/AddressList"

          export default {
              data() {
                  return {
                      pic : "",

        value7: '',
        select: '',
        systemConfigVisible : false,
        mailboxManageVisible : false,
        mailboxAddVisible : false,
        testState: true,
        input5 : "",


                  }
              },
              components : {
                  imageBtn,
                  badgeImageBtn,
                  popupWindow,
                  systemConfigView,
                  mailboxManageView,
                  mailboxAddView,
                  searchBar,
                  windowHeader,
                  emailContentDisplayBox,
                  emailContentEditBox,
                  emailListBox,
                  addressList
              },
              methods : {
                  systemConfigBtnClick: function() {



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
                    this.mailboxAddVisible = false;
                  },
                  replyOnFocus : function(){
                    
                  },
                  replyLostFocus: function(){

                  },
                  emailListScrollBottom: function(){
                    console.log("scrollBottom")
                  },
                  emailBlockSelect: function(){
                    console.log("eeeeee")
                  },
                  emailBlockMenuShow: function(){
                    this.ipcSender.send('email_list_operate', 'showEmailBlockMenu');
                  },
                  searchClick : function() {
                      console.log("searchClick");
                  }
              },

              created () {
            },
          }
      </script>
      
      <style lang="scss" scoped>
          @import "./index.scss";
      </style>