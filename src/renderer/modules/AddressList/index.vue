<template>
    <div id = "address-list-box">
        <div id = "address-search-box">
            <div id = "address-search">
                <el-input placeholder="查找联系人">
                    <image-btn id = "search" slot="append"></image-btn>
                </el-input>                
            </div>

            <image-btn id = "add-btn"></image-btn>
        </div>


        <el-tree id = "address-list"
        class="filter-tree"
        :data="data2"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        ref="tree2"
        >
        </el-tree>
    </div>
</template>

<script>
    import imageBtn from "@/components/ImageBtn";

    export default {
        data() {
            return {
                data2: [
                    {
                        id: 1,
                        label: '一级 1',
                        children: [
                            {
                                id: 4,
                                label: '二级 1-1'
                            },
                            {
                                id: 4,
                                label: '二级 1-1'
                            },
                            {
                                id: 4,
                                label: '二级 1-1'
                            }
                        ]
                    }, 
                    {
                        id: 1,
                        label: '一级 1',
                        children: [
                            {
                                id: 4,
                                label: '二级 1-1'
                            },
                            {
                                id: 4,
                                label: '二级 1-1'
                            },
                            {
                                id: 4,
                                label: '二级 1-1'
                            }
                        ]
                    }
                ]
            }
        },
        components: {
            imageBtn
        }
    }
</script>

<style lang="scss" scoped>
    @import "./index.scss";
</style>