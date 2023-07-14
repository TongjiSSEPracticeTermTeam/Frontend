<template>
    <button @click="dialogVisible=true">点我</button>
    <div class="dialog-overlay" v-show="dialogVisible" @close="closeDialog" :names="names">
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
            <el-button type="info" @click="close" class="no-button">取消</el-button>
        </div>
    </div>
</template>
  
<script lang="ts">
import { PropType } from "vue"

export default {
    props: {
        names: {
            type: Array as PropType<string[]>,
            required: true,
        },
    },
    data() {
        return {
            firstNames: ['1'],
            secondNames: ['1'],
            dialogVisible: false,
        };
    },
    mounted() {
        this.firstNames = this.names.slice(0, 11).sort();
        this.secondNames = this.names.slice(11).sort();
    },
    methods: {
        close() {
            this.$emit('close');
        },
        returnData() {
            alert(this.firstNames);
            this.$emit('close', this.secondNames);
        },
        firstToSecond(index: number) {
            const name = this.firstNames[index];
            this.firstNames.splice(index, 1);
            this.secondNames.push(name);
            this.secondNames = this.secondNames.slice().sort();
        },
        secondToFirst(index: number) {
            const name = this.secondNames[index];
            this.secondNames.splice(index, 1);
            this.firstNames.push(name);
            this.firstNames = this.firstNames.slice().sort();
        },
        showDialog() {
            this.dialogVisible = true;
        },
        closeDialog() {
            this.dialogVisible = false;
        },
    }
};
</script>
  
<style scoped>
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
  