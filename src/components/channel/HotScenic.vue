<template>
    <div class="search-list-inner">
        <ul v-show="!!list.length" class="search-list-box">
            <template v-for="page in list">
                <li class="search-block clearfix" v-for="(item,index) in page" v-bind:key="index">
                    <a class="search-scenic-link" :href="item.productId | scenicLink(isApp)">
                        <div class="img-container lazy-img-box fl"><img class="img" :src="item.image">
                            <!--<div class="order-today-icon"><span>今日订</span></div>-->
                        </div>
                        <div class="search-scenic-content clearfix">
                            <h3 class="search-scenic-title ellips ft-color-deepgrey">{{item.name}}</h3>
                            <div class="search-scenic-wrapper">
                                <div class="search-scenic-detail">
                                    <ul class="sale-type clearfix">
                                        <li class="fl" v-if="item.isPromotion">
                                            <span class="sale-lable sale-lable-0">优惠</span>
                                        </li>
                                        <li class="fl" v-for="(sale,index) in item.labelImgListNew" :key="index">
                                            <span class="sale-lable sale-lable-0">{{sale.labelText=="返"?"返现":sale.labelText}}</span>
                                        </li>
                                        <li class="fl" v-if="item.canBookNow">
                                            <span class="sale-lable sale-lable-1">今日可订</span>
                                        </li>
                                    </ul>
                                    <!--<p class="travel-count" v-show="item.travelCount">{{item.travelCount > 10000 ? (item.travelCount/10000).toFixed(2) + '万' : item.travelCount}}人出游</p>-->
                                    <p class="scenic-comments">{{item.countDesc}} | {{item.satisfaction}}%满意</p>
                                </div>
                                <div class="search-scenic-price">
                                    <i class="rmb-symbol">&yen;</i>
                                    <span class="money">{{item.lowestPromoPrice}}</span>起
                                </div>
                            </div>
                            <div class="search-scenic-footer">
                                <div class="search-scenic-city ft-color-grey">
                                    {{item.poiCityName}}{{item.rankName=="2A级以下"?"":'/'+item.rankName}}
                                </div>
                                <div class="search-scenic-distance ft-color-grey">
                                    {{item.distance | formatDistance}}
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
            </template>            
        </ul>
        <p v-show="listLoading && !list.length" class="page-infinite-loading">
            正在加载中...
        </p>
    </div>
</template>
<script>
export default {
    props:{
        isApp:{
            type: Boolean,
            default:false
        },
        listLoading:{
            type:Boolean,
            default:false
        },
        noResult:{
            type:Boolean,
            default: false
        },
        list:{
            type:Array,
            default () {
                return []
            }
        }
    } ,
    methods:{
        //imgAutoProtocolWebP: (routeImg) => imgAutoProtocolWebP(routeImg)
    }      
}
</script>
<style lang="scss" scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .search-select {
        font-size: 32px; /*px*/
        max-width: 150px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    /*end*/
  

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    .search-list-box {
        width: 100%;
        .search-block {
            border-bottom: 1px solid #edf0f5; /*no*/
            width: 100%;
            padding: 24px;
            box-sizing: border-box;
            .search-scenic-link {
                width: 100%;
                padding-bottom: 22.5%;
                height: 0;
                .search-scenic-content {
                    flex-direction: column;
                    justify-content: space-between;
                    font-size: 24px; /*px*/
                    color: #909090;
                    height: 160px;
                    display: flex;
                    .search-scenic-title {
                        font-size: 32px; /*px*/
                        overflow: hidden;
                    }
                    .scenic-comments{
                        font-size: 24px;
                        line-height: 30px;
                        color: #666666;
                    }
                     .travel-count {
                        line-height: 24px;
                        color: #666666;
                    }
                    .search-scenic-wrapper {
                        display: flex;
                        flex: 1;
                        .search-scenic-detail {
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-around;
                            ul {
                                width: 100%;
                            }
                            ul li {
                                margin-right: 6px;
                            }
                        }
                    }
                    .search-scenic-footer {
                        display: flex;
                        justify-content: space-between;
                        line-height: 14px;
                       
                        .search-scenic-distance {
                            text-align: right;
                        }
                    }
                }
                .search-scenic-price {
                    text-align: center;
                    font-size: 20px; /*px*/
                    color: #f9743a;
                    .rmb-symbol, .money {
                        color: #f9743a;
                        font-style: normal;
                    }
                    .money {
                        font-size: 40px; /*px*/
                        padding-right: 1px; /*no*/
                    }
                }
            }
            .img-container {
                width: 160px;
                height: 160px;
                margin-right:30px;
            }
            .img {
                width: 100%;
                height: 100%;
            }
            .img[lazy=loaded] {
                animation-duration: 1s;
                animation-fill-mode: both;
                animation-name: fadeIn;
            }
        }
    }

    .sale-outline {
        border: 1px solid #FF8800; /*no*/
        box-sizing: border-box;
        font-size: 24px; /*px*/
        padding-left: 6px;
        padding-right: 6px;
        color: #FF5500;
    }

    .sale-lable {
        font-size: 24px; /*px*/
        border-radius: 1px; /*no*/
        box-sizing: border-box;
        padding-left: 4px;
        padding-right: 4px;
    }

    .sale-lable-0 {
        border: 1px solid #FF5500; /*no*/
        color: #FF5500;
    }

    .sale-lable-1 {
        border: 1px solid #2dbb55; /*no*/
        color: #2dbb55;
    }

    .sale-lable-2 {
        border: 1px solid #cdcdcd; /*no*/
        color: #666;
    }

    .order-today-icon {
        height: 0;
        width: 200px;
        border-top: 30px solid #2dbb55;
        border-right: 16px solid transparent;
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 24px; /*px*/
        color: #fff;
        span {
            transform: scale(0.8);
            display: inline-block;
            position: absolute;
            top: -14px;
            left: 8px;
        }
    }

    .no-search-result {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translateX(-50%);
        color: #aaaaaa;
        text-align: center;
        i {
            display: block;
            font-size: 140px; /*px*/
        }
        span {
            display: block;
            font-size: 32px; /*px*/
            margin-top: 10px;
        }
    }

    .search-loading {
        span {
            font-size: 28px; /*px*/
            color: #999;
        }
    }

    .page-infinite-loading {
        text-align: center;
        height: 100px;
        line-height: 100px;
        font-size: 28px; /*px*/
        color: #999;
    }

</style>
