

<script>
export default {
    props: {
        movieName: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            required: true
        },
        releaseDate: {
            type: String,
            required: true
        },
        endDate: {
            type: String,
            required: true
        }
    }
}
</script>


<template>
    <div class="bar-component">
        <div class="data-item name">{{ movieName }}</div>
        <div class="data-item duration">{{ duration }}分钟</div>
        <div class="data-item releaseDate">{{ releaseDate }}</div>
        <div class="data-item endDate">{{ endDate }}</div>
    </div>
</template>



<style scoped>
.bar-component {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
    width: 100%;

    background-color: #f0f0f0;
}

.data-item {
    /* border: 3px solid black; */
    font-size: 1em;
    color: #999;
    margin: 0;
}
.data-item.name {
    color: orange;
    font-style: bolder;
    width: 30%;
    /* background-color: red; */
}
.data-item.duration {
    /* background-color: blue; */
    text-align: center;
    color: rgb(90,90,90);
    width: 20%;
}
.data-item.releaseDate, .data-item.endDate {
    /* background-color: purple; */
    width: 25%;
    text-align: right;
}

</style>