<template>
    <div class="loading">
        <div class="loading-container">
            <div class="loading-box">
                <div class="spinner">
                    <div class="spinner-inner"></div>
                    <div class="cutout"></div>
                </div>
                <div class="loading-logo">
                    <span class="icon-logo"></span>
                </div>
            </div>
            <span>{{loadingText}}</span>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        loadingText:{
            type:String,
            default(){
                return '小牛努力加载中...';
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .loading{
        background-color: #fff;
        width:100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        text-align: center;
        color: #999;
        z-index:9999;
        .loading-container{
            z-index: 1001;
            width: 100%;
            height: 200px;
            position: fixed;
            left: 50%;
            top: 30%;
            transform: translate(-50%);
            text-align: center;
            .loading-box{
                position: relative;
                width: 100%;
                height: 120px;
            }
            span{
                display: block;
                margin-top: 20px;
            }
        }
        .spinner{
            position: absolute;
            width: 136px;
            height: 136px;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            border-radius: 100%;
            z-index:1001;
            animation: rotate 1s linear 0s  infinite;
            .spinner-inner{
                position: relative;
                top: 6px;
                left: 6px;
                width: 124px;
                height: 124px;
                border-radius: 100%;
            }
            .cutout{
                position: absolute;
                top: 35px;
                left: 35px;
                width: 110px;
                height: 110px;
                background-image: radial-gradient(55px circle, rgba(255,255,255, 0.8), rgba(255,255,255, 0));
            }
        }
        .loading-logo{
            z-index: 1000;
            color: #1dbd8d;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            .icon-logo{
                font-size: 75px;
            }
        }
    }
    @keyframes rotate {
        0%{
            transform: translate(-50%, -50%) rotate(0deg);
        }
        100%{
            transform: translate(-50%, -50%) rotate(360deg);
        }
    }
</style>

