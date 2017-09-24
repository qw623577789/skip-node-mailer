<template>
        <div class = "wrapper">
                <div class = "content">
                    <div id = "window-bar"><image-btn id = "close"></image-btn></div>
                    <slot></slot>
                </div>
                <div class = "shadow"></div>
        </div>
</template>
      
      <script>
           import imageBtn from "@/components/ImageBtn";

          export default {
              data() {
                  return {
                  }
              },
              components : {
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