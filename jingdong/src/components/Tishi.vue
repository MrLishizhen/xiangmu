<template>
    <div class="wrap" v-if="show" :class="showContent ?'fadein':'fadeout'">{{text}}</div>
</template>
<style scoped>
    .wrap{
        position: fixed;
        left: 50%;
        bottom:50%;
        background: rgba(0,0,0,0.5);
        padding:0 20px;
        border-radius: 5px;
        height:30px;
        line-height:30px;
        transform: translate(-55%,-50%);
        color:#fff;
        font-size:16px;
    }
    .fadein {
        animation: animate_in 0.35s;
    }
    .fadeout {
        animation: animate_out 0.35s;
        opacity: 0;
    }
    @keyframes animate_in {
        0% {
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
    @keyframes animate_out {
        0% {
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
</style>
