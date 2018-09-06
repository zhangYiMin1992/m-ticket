<template>
    <div class="activity-new">
        <a v-if="isShowTop" v-for="item in top" :key="item.adAppLinkUrl" class="banner-img">
            <img :src="item.adImgUrl">
        </a>
        <ul class="small-banner clearfix" v-if="isShowBottom">
            <li v-for="(act,index) in bottom" :key="index">
                <a :href="act.adAppLinkUrl">
                    <p>{{act.adMainTitle}}</p>
                    <span>{{act.adSubTitle}}</span>
                    <div class="img-box">
                        <img :src="act.adImgUrl">
                    </div>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props:{
        activityList:{
            type:Object,
            default:null
        }
    },
    data(){
        return{
            top:[],
            bottom:[]
        }
    },
    computed:{
        isShowTop(){
            return this.activityList && Object.prototype.toString.call(this.activityList.top) === '[object Array]' && this.activityList.top.length == 1;
        },
        isShowBottom(){
            return this.activityList && Object.prototype.toString.call(this.activityList.bottom) === '[object Array]' && this.activityList.bottom.length == 3;
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.showAct(this.activityList)
        })
    },
    watch:{
        'activityList'(){
            this.showAct(this.activityList)
        }
    },
    methods:{
        showAct({top,bottom}){
            if(this.isShowTop){
                this.top = top
            }
            if(this.isShowBottom){
                this.bottom = bottom
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.activity-new{   
    background: #fff;
    margin:20px 0;
    .banner-img{
        width: 100%;
        padding: 10px 30px;
        box-sizing: border-box;
        margin: auto;
        display: block;
        border-bottom: 1px solid #E9E9E9;
        img{
            width: 100%;
            height: auto;
        }
    }
}
.small-banner{
    li{
        position: relative;
        width: 33.3%;
        float: left;
        padding: 20px;
        box-sizing: border-box;
        text-align: center;
        a{
            display: block;
            p{
                font-size: 28px;
            }
            span{
                color: #a5a5a5;
                font-size: 28px;
                line-height: 40px;
            }
            .img-box{
                width: 120px;
                height: 120px;
                border-radius: 100%;
                overflow: hidden;
                margin:20px auto;
                img{
                    width: 100%;
                    height: auto;
                }
            }
        }
        &:after{
            position: absolute;
            border-right: 1px solid #e5e5e5;
            -webkit-transform: scale(.5);
            -ms-transform: scale(.5);
            transform: scale(.5);
            top: -50%;
            right: -50%;
            bottom: -50%;
            left: -50%;
            content: "";
        }
    }
}
</style>
