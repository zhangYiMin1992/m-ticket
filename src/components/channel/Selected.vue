<template>
    <div class="select-scenic-con" id="wrapper">
        <div id="scroller">
            <ul>
                <li v-for="(scenic,index) in hotScenic" :key="index">
                    <a :href="scenic.prdId">
                        <div class="img-box"><img :src="scenic.prdImgUrl"/></div>
                        <div class="hot-des">
                            <div class="title">{{scenic.prdTitle}}</div>
                            <div class="price">
                                <i class="rmb-symbol">¥</i>
                                <span class="money">{{scenic.prdSalePrice}}</span>起
                            </div>
                        </div>
                    </a>
                    <img src="../../styles/images/v3icon/group0.png" class="icon" v-if="index==0">
                    <img src="../../styles/images/v3icon/group1.png" class="icon" v-if="index==1">
                    <img src="../../styles/images/v3icon/group2.png" class="icon" v-if="index==2">
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import IScroll from '../../util/iscroll-lite'
export default {
    name: 'Selected',
    props: {
        isApp: {
            type: Boolean,
            default: false
        },
        hotScenic: {
            type: Array,
            default: []
        }
    },
    data(){
        return {}
    },

    components: {},

    mounted(){
        this.$nextTick(()=> {
            this.scroll();
        });
    },
    watch: {
        'hotScenic'(){
            this.scroll();
        }
    },

    methods: {
        //imgAutoProtocolWebP: (routeImg) => imgAutoProtocolWebP(routeImg),
        scroll: function () {
            new IScroll('#wrapper', {scrollX: true, scrollY: false});
            var pos = {};
            var direction = "";
            document.querySelector("#wrapper").addEventListener("touchstart",
                function (e) {
                    direction = "";
                    pos.x1 = e.touches[0].pageX;
                    pos.y1 = e.touches[0].pageY;
                    return
                });
            document.querySelector("#wrapper").addEventListener('touchmove', function (e) {
                pos.x2 = e.touches[0].pageX;
                pos.y2 = e.touches[0].pageY;
                var x = pos.x2 - pos.x1;
                var y = pos.y2 - pos.y1;
                !direction && (direction = Math.abs(y) > Math.abs(x) ? "vertical" : "horizontal");
                if (direction == "vertical") {
                    return
                }
                e.preventDefault();
            }, false);
        }
    }   
}
</script>
<style lang="scss" scoped>
.select-scenic-con{
    width: 100%;
    position: relative;
    padding-bottom: 40%;
}
#scroller{
    position: absolute;
    z-index: 1;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    height: 100%;
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-text-size-adjust: none;
    -moz-text-size-adjust: none;
    -ms-text-size-adjust: none;
    -o-text-size-adjust: none;
    text-size-adjust: none;
    width: 100%;
    overflow: hidden;
    ul{
        padding:0 10px 20px 10px;
        white-space: nowrap;
        transform: translate3d(0, 0, 0);
        li{
            position: relative;
            padding:0 10px;
            display: inline-block;
            width: 300px;
            overflow: hidden;
            a{
                display: block;
            }
        }
    }
}
.img-box{
    width: 100%;
    overflow: hidden;
    height:160px;

    img{
        width: 100%;

    }
}
.icon{
    width: 70px;
    height: 28px;
    position: absolute;
    left:10px;
    top:0;
}
.hot-des{
    padding: 14px;
    text-align: center;
    position: relative;
    .title{
        font-size: 28px;
    }
    .price{
        font-size: 24px;
        .rmb-symbol{
            color: #f50;
        }
        .money{
            color: #f50;
            font-size: 36px;
        }
    }
    &:after{
        position: absolute;
        border: 1px solid #e5e5e5;
        border-top: none;
        border-bottom:none;
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
</style>
