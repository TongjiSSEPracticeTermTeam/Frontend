<!-- 使用方式，父组件中动态绑定两个数组，如下： -->
<!-- <my-dialog v-model:choosed-actor-names="choosedActorNames" -->
<!-- v-model:unchoosed-actor-names="unchoosedActorNames"></my-dialog> -->
<!-- 点击弹框中的确定按钮后会同步修改传入的数组内容 -->

<template>
    <text class="mytext" @click="showDialog">{{ firstNames[0] }}/{{ firstNames[1] }}/{{ firstNames[2] }}/……</text>
    <div class="dialog-overlay" v-show="dialogVisible">
        <text>已选择演员</text>

        <div class="vertical-spacing"></div>

        <div class="scrollable-row">
            <div class="first-row-item" v-for="(name, index) in firstNames" :key="name">
                <el-tag disable-transitions @click="firstToSecond(index)">{{ name }}</el-tag>
            </div>
        </div>

        <div class="vertical-spacing"></div>

        <text>可选择演员</text>

        <div class="vertical-spacing"></div>

        <div class="fixed-container">
            <div class="second-row-item">
                <el-tag class="fixed-item" disable-transitions type="info" @click="secondToFirst(index)"
                    v-for="(name, index) in secondNames" :key="name">
                    {{ name }}
                </el-tag>
            </div>
        </div>

        <div class="vertical-spacing"></div>

        <div>
            <el-button type="primary" @click="returnData" class="yes-button">确定</el-button>
            <el-button type="info" @click="closeDialog" class="no-button">取消</el-button>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        choosedActorNames: {
            type: Array,
            required: true,
        },
        unchoosedActorNames: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            firstNames: [],
            secondNames: [],
            array1: [],
            array2: [],
            dialogVisible: false,
        };
    },
    emits: ['update:choosedActorNames', 'update:unchoosedActorNames'],
    mounted() {
        this.firstNames = this.choosedActorNames.slice().sort();
        this.secondNames = this.unchoosedActorNames.slice().sort();
        this.array1 = this.firstNames.slice();
        this.array2 = this.secondNames.slice();
    },
    methods: {
        firstToSecond(index) {
            const name = this.firstNames[index];
            this.firstNames.splice(index, 1);
            this.secondNames.push(name);
            this.secondNames = this.secondNames.sort();
        },
        secondToFirst(index) {
            const name = this.secondNames[index];
            this.secondNames.splice(index, 1);
            this.firstNames.push(name);
            this.firstNames = this.firstNames.sort();
        },
        // 点击按钮后显示对话框
        showDialog() {
            this.dialogVisible = true;
        },
        // 对话框中点击取消按钮后关闭对话框，并恢复数据
        closeDialog() {
            this.dialogVisible = false;
            this.firstNames = this.array1.slice();
            this.secondNames = this.array2.slice();
        },
        // 对话框中点击确定按钮后关闭对话框，并返回数据
        returnData() {
            this.dialogVisible = false;
            this.array1 = this.firstNames.slice();
            this.array2 = this.secondNames.slice();
            this.$emit('update:choosedActorNames', this.firstNames.slice());
            this.$emit('update:unchoosedActorNames', this.secondNames.slice());
        },
    }
};
</script>
  
<style scoped>
.mytext {
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.mytext:hover {
    background-color: lightgray;
}

.dialog-overlay {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 25%;
    left: 25%;
    right: 25%;
    bottom: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(190, 222, 212);
}

.scrollable-row {
    display: flex;
    padding: 10px;
    width: 100%;
    overflow-x: auto;
}

.first-row-item {
    cursor: pointer;
    padding: 5px;
    white-space: nowrap;
    flex-basis: 10%;
}

.fixed-container {
    overflow: auto;
    padding: 10px;
    max-height: 150px;
    overflow-y: auto;
}

.second-row-item {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
}

.fixed-item {
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 10px;
    width: 100px;
    /* 固定元素长度 */
}

.yes-button {
    padding: 10px 20px;
    background-color: blue;
}

.no-button {
    padding: 10px 20px;
    background-color: grey;
}

.vertical-spacing {
    margin-top: 20px;
}
</style>
  