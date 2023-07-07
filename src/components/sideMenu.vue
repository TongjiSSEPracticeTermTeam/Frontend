<script>


export default {
    data: () => {
        return {
            buttons: [
                {
                    text: "电影管理",
                    state: false
                },
                {
                    text: "影院管理",
                    state: false
                },
                {
                    text: "影人管理",
                    state: false
                },
                {
                    text: "用户管理",
                    state: false
                }
            ],
        }
    },
    methods: {
        sectionChange(button) {
            // console.log(button.text)
            const text = button.text
            if (button.state)
                return;
            else {
                for (let i = 0; i < this.buttons.length; i++) {
                    if (this.buttons[i].text != text)
                        this.buttons[i].state = false;
                    else
                        this.buttons[i].state = true;
                }
            }
        }
    }
}
</script>

<template>
    <aside class="sideBar">
        <div class="title">
            同济影业管理系统
        </div>
        <nav>
            <div v-for="(button, index) in buttons" :key="button.text" :class="{ active: button.state }"
                @click="sectionChange(button)">
                {{ button.text }}
            </div>
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

nav div {
    /* background-color: blue; */
    cursor: pointer;
    font-weight: bold;
    color: rgba(90, 90, 90, .6);
}

nav div:hover {
    border-bottom: 3px solid purple;
    font-size: 1.2em;
    font-weight: bold;
    color: rgba(128, 0, 128, 0.8);
}

nav div.active {
    font-size: 1.2em;
    font-weight: bold;
    background-color: purple;
    color: white;
}
</style>