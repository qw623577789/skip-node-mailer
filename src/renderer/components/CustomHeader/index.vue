<<template>
    <div class = "header" @mousemove="tin" @mouseout="out">
        <div class = "window-btns">
            <a class="window-btn minimize" @click = "btnClick('minimize')"></a>
            <a class="window-btn maximize" @click = "btnClick('maximize')"></a>
            <a class="window-btn close" @click = "btnClick('close')"></a>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visiable : false
        }
    },
    methods : {
        btnClick: function(method){
            this.$emit('window-btn-method', method);
        },
            tin: function(){
                console.log(this.styleObj);
                this.visiable = true
            },
            out: function(){
                console.log("out")
                // this.visiable = false
            }
    }
}
</script>

<style lang="scss" scoped>
    @import "./index.scss";
</style>
