<<template>
    <div class = "header">
        <div class = "window-btns">
            <a class="window-btn minimize" @click = "btnClick('minimize')"></a>
            <a class="window-btn maximize" @click = "btnClick('maximize')"></a>
            <a class="window-btn close" @click = "btnClick('close')"></a>
        </div>
    </div>
</template>

<script>
export default {
    methods : {
        btnClick: function(method){
            this.$emit('window-btn-method', method);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "./index.scss";
</style>
