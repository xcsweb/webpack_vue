<template>
    <div>
        <div class="triangle"></div>
        <div class="father">
            <div class="child">bfc</div>
        </div>
        <div>
            <div class="square"></div>
        </div>
        <div>
            <div class="fangxing"></div>
        </div>
    </div>
</template>
<script>

export default {
};
</script>
<style lang="scss" scoped>
.triangle{
    width: 0;
    height: 0;
    border: 100px solid transparent;
    border-bottom: 200px solid red;
}
.father{
    background: #666;
    height: 200px;
    margin-top: 20px;
    overflow: hidden;
    .child{
        margin-top: 20px;
        height: 100px;
        background: #ccc;
    }
}
.square{
    width: 20%;
    background: #ccc;
    margin: 0 auto;
    padding-bottom:20%;
}
.fangxing{
    position:absolute;
    width: 200px;
    height: 200px;
    left: 50%;
	top: 50%;
    background: greenyellow;
    transform: translate(-50%,-50%);
}
</style>