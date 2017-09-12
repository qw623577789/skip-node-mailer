<<template>
        <div id = 'wrapper'>
            <div id="header">
                  <custom-header @window-btn-method="windowBtnClick"></custom-header>
                  <div id="toolbar">
                          <badge-image-btn id = "in-box" :badgeCaption = "unSeenAmount"></badge-image-btn>
                          <image-btn id = "out-box"></image-btn>
                          <image-btn id = "draft-box"></image-btn>
                          <image-btn id = "deleted-box"></image-btn>
                  </div>
            </div>
        </div>    
      </template>
      
      <script>
          import customHeader from "@/components/CustomHeader";
          import imageBtn from "@/components/ImageBtn";
          import badgeImageBtn from "@/components/BadgeImageBtn";
      
          export default {
              data() {
                  return {
                      "unSeenAmount" : "2"
                  }
              },
              components : {
                  customHeader,
                  imageBtn,
                  badgeImageBtn
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
                  }
              }
          }
      </script>
      
      <style lang="scss" scoped>
          @import "./index.scss";
      </style>