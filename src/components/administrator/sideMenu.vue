<script lang="ts">
export default {
    data: () => {
        return {
            buttons: [
                {
                    text: "电影管理",
                    des: "movieManage",
                    state: true
                },
                {
                    text: "影院管理",
                    des: "cinemaManage",
                    state: false
                },
                {
                    text: "影人管理",
                    des: "staffManage",
                    state: false
                },
                // {
                //     text: "用户管理",
                //     state: false
                // }
            ],
            currentSection: 0
        }
    },
}
</script>

<template>
    <aside class="sideBar">
        <div class="title">
            同济影业管理系统
        </div>
        <nav>
            <router-link v-for="button in buttons" :key="button.text" :class="{ active: button.state }" :to="button.des"
                exact>
                {{ button.text }}
            </router-link>
        </nav>

    </aside>
</template>

<style scoped>
.title {
    text-align: center;
    margin: 5%;
    font: 1.2em, sans-serif, bold;

    background: linear-gradient(to bottom, purple 50%, white);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
}

.sideBar {
    box-sizing: border-box;
    position: fixed;
    width: 16%;
    height: 100vh;
    margin-right: 5px;
    /* background: red; */
    font-size: 1.5em;
    border-right: 2px groove rgb(202, 106, 202);

    user-select: none;
}

nav {
    /* background-color: peru; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 50%;

    position: relative;
    margin: 0 20%;

    text-align: right;
    top: 45%;
    transform: translateY(-50%);
    text-align: center;
}

a {
    text-decoration: none;
    cursor: pointer;
    font-weight: bold;
    color: rgba(90, 90, 90, .6);
}

a:hover {
    border-bottom: 3px solid purple;
    font-size: 1.2em;
    font-weight: bold;
    color: rgba(128, 0, 128, 0.8);
}

a:active {
    color: rgb(147, 91, 230);
}

.router-link-active,
.router-link-active:hover {
    text-decoration: none;
    font-size: 1.2em;
    font-weight: bold;
    background-color: purple;
    color: white;
}
</style>