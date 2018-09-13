<template>
    <div class="city-picker">
        <header id="dest-header" v-if="!isApp">
            <span class="city-header-back" id="dest-back"></span>
            <h1>选择城市</h1>
        </header>
        <div :class="isApp ? 'no-header city-wrapper' : 'city-wrapper'">
            <div class="search-box">
                <div class="search-input-ctn">
                    <i class="icon-search5 search_btn"></i>
                    <form>
                        <input class="search-input" placeholder="请输入城市名称或拼音" autocomplete="false">
                    </form>                    
                </div>
                <span class="cancel" v-show="isMaskShow">取消</span>
            </div>
            
            <div class="city-loading" v-show="cityLoading">
                <span>正在加载中···</span>
            </div>

            <div class="city-box">
                <div class="city-list">
                    <div class="nav-container">
                        <ul :class="['nav-tabs  clearfix',(secondSelected ? selected:'')]">
                            <li :class="!secondSelected ? 'active' : ''" @click="selectDomestic" >
                                <span>境内</span>
                            </li>
                            <li :class="secondSelected ? 'active' : ''" @click="selectOverseas">
                                <span>境外</span>
                            </li>
                        </ul>
                    </div>
                    <div class="city-section">
                        <h2>定位城市</h2>
                        <ul class="text-container">
                            <li class="text-item">
                                <div class="item-title">{{geoCity.name}}</div>
                            </li>
                        </ul>
                    </div> 
                    <div class="city-section" v-show="historyCities.length">
                        <h2>选择历史</h2>
                        <ul class="text-container">
                            <li :class="index == 0 ? 'selected' : ''" class="text-item" v-for="(city,index) in historyCities" :key="index">
                                <div class="item-title">{{city.name}}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="tab-panel1" v-show="!secondSelected">
                        <div class="city-section">
                            <h2>热门推荐</h2>
                            <ul class="text-container">
                                <li class="text-item"
                                v-for="(city,index) in popularCity" :key="index">
                                    <div class="item-title">{{city.name}}</div>
                                </li>
                            </ul>
                        </div>
                        <div class="location-title letter-list" v-for="item in citiesByLetters" :key="item.name">
                            <h2>{{item.letter.toUpperCase()}}</h2>
                            <ul class="text-container">
                                <li class="text-item" v-for="(city,index) in item.cities" :key="index">
                                    <div class="item-title">{{city.name}}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="tab-panel2">
                        <div class="city-section">
                            <h2>热门推荐</h2>
                            <ul class="text-container">
                                <li class="text-item" v-for="city in popularCityOversea" :key="city.name">
                                    <div class="item-title">{{city.name}}</div>
                                </li>
                            </ul>
                        </div>
                        <div class="location-title letter-list" v-for="item in citiesByLettersOversea" :key="item.letter">
                            <h2>{{item.letter.toUpperCase()}}</h2>
                            <ul class="text-container">
                                <li class="text-item" v-for="city in item.cities" :key="city.name">
                                    <div class="item-title">{{city.name}}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> 
                <div>
                    <ul class="indexer" v-show="!secondSelected" id="letterIndexer">
                        <li v-for="item in indexer" :key="item">{{item}}</li>
                    </ul>
                    <ul class="indexer" v-show="secondSelected" id="letterIndexer">
                        <li v-for="item in indexer" :key="item">{{item}}</li>
                    </ul>
                </div>
                <div class="indexer-show" id="J-big-show-letter" v-show="isLetterShow">{{currentLetter}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import {searchCity} from './search';
import emitter from '../../../mixins/emitter';
const letters = 'abcdefghijklmnopqrstuvwxyz'.split('');
export default {
    props:{
        domesticCities:{
            type:Object,
            default(){
                return null;
            }
        },
        geoCity:{
            type:Object,
            default(){
                return{
                    code:2500,
                    name:'上海'
                }
            }
        },
        overseaCities:{
            type:Object,
            default(){
                return null
            }
        },
        historyCities:{
            type:Array,
            default(){
                return []
            }
        },
        hideCityBox:{
            type:Function,
            default(){
                return null
            }
        },
        isApp:{
            type:Boolean,
            defaule:false
        },
        isShowCityPicker:{
            type:Boolean,
            defaule:false
        },
        cityPickerInit:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            cityLoading:false,
            popularCity: [],
            popularCityOversea: [],
            indexer:[],
            indexerOversea:[],
            citiesByLetters:[],
            allCities:[],
            isMaskShow: false,
            isLetterShow:false,
            isSearchListShow:false,
            citiesByLettersOversea:[],
            filteredCities:[],
            currentLetter:'',
            secondSelected:false,
            cityName:'',
            poo:'',
            listHeight:0
        }
    },
    mounted(){
        let self = this;
        this.$nextTick(function(){
            self.normalizeData()
        })
    },
    methods:{
        normalizeData(){
            if(!this.domesticCities || !this.overseaCities) return
            this.cityLoading = false
            this.indexer.push('定位')
            this.indexerOversea.push('定位')

            if(this.domesticCities.popularCity){
                this.popularCity = this.domesticCities.popularCity
                this.indexer.push('热门')
            }
            for(let i=0, len=letters.length; i<len; i++){
                let letter = letters[i], citiesOnLetter;
                if(citiesOnLetter = this.domesticCities[letter]){
                    this.indexer.push(letter.toUpperCase());
                    this.citiesByLetters.push({
                        letter:letter.toUpperCase(),
                        cities:citiesOnLetter
                    })
                    this.allCities.push({
                        letter:letter.toUpperCase(),
                        cities:citiesOnLetter
                    })
                    console.log(this.allCities.cities)
                }
            }

            if(this.overseaCities.popularCity){
                this.popularCityOversea = this.overseaCities.popularCity
                this.indexerOversea.push('热门')
            }
            for (let i = 0, len = letters.length; i < len; i++) {
                let letter = letters[i], citiesOnLetter;
                if (citiesOnLetter = this.overseaCities[letter]) {
                    this.indexerOversea.push(letter.toUpperCase());
                    this.citiesByLettersOversea.push({
                        letter: letter.toUpperCase(),
                        cities: citiesOnLetter
                    });

                    this.allCities.push({
                        letter: letter.toUpperCase(),
                        cities: citiesOnLetter
                    });
                }
            }
        },
        selectDomestic(){
            this.secondSelected = false
        },
        selectOverseas(){
            this.secondSelected = true
        }
    }
}
</script>
<style lang="scss" scoped>
.city-picker{
    display: flex;
    position: absolute;
    flex-direction: column;
    width: 100%;
    height: 100%;
    z-index: 200;
    top: 0;
    bottom: 0;
    overflow-y: hidden;
    #dest-header{
        width: 100%;
        position: fixed;
        background: #f4f4f4;
        height: 88px;
        z-index: 1001;
        border-bottom: #d4d4d4 1px solid;
        line-height: 88px;
        span{
            width: 20px;
            height: 20px;
            border-left: 4px solid #33bd61;
            border-bottom: 4px solid #33bd61;
            position: absolute;
            top: 50%;
            transform: translateY(-50%) rotate(45deg);
            left: 40px;
            display: block;
        }
        h1{
            font-size: 32px;
            text-align: center;
            line-height: 88px;
        }
    }
}
.city-wrapper{
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    margin-top: 88px;
    flex-direction: column;
    flex: 1;
}
.search-box{
    width: 100%;
    background: #edf0f5;
    box-sizing: border-box;
    padding:20px;
    display: flex;
    flex-direction: row;
    position: fixed;
    top: 88px;
    left: 0;
    z-index: 200;
}
.search-input-ctn{
    position: relative;
    flex: 1;    
    i{
        font-size: 30px;
        color: #999;
        flex: 1;
        position: absolute;
        left: 20px;
        top: 16px;
    }
}
.search-input{
    background: #fff;
    box-sizing: border-box;
    width: 100%;
    padding: 20px 20px 20px 60px;
    height: 68px;
}
.cancel{
    color: #666;
    line-height: 68px;
    font-size: 26px;
    margin-left: 30px;
}
.city-loading {
    position: relative;
    width: 100%;
    flex: 1;
    background-color: #fff;
    z-index: 201;

    span {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%);
        font-size: 28px; /*px*/
        color: #999;
    }
}
.nav-container{
    height: 80px;
    position: relative;
    .nav-tabs{
        width: 100%;
        font-size: 0;
        height: 80px;       
        li{
            float: left;
            width: 50%;
            color:#666;
            font-size: 28px;
            line-height: 80px;
            text-align: center;
            border-bottom: 1px solid #e5e5e5;
            &.active{
                span{
                    color: #33bd61;
                }
                
            }
        }
    }
    &:after{
        display: block;
        content:"";
        position: absolute;
        bottom: 0;
        height: 6px;
        background: #33bd62;
        left: 0;
        transform: translate3d(0, 0, 0);
        transition: -webkit-transform .15s ease-in-out 0s;
        width: 50%;
    }
    &.selected:after{
        transform: translate3d(100%,0,0)
    }
}
.city-box{
    position: relative;
    margin-top: 110px;
}
.city-list .city-section h2{
    color: #222;
    background: #f5f5f5;
    padding-left: 40px;
    line-height: 60px;
    font-size: 28px;
}
.text-container{
    overflow: hidden;
    margin: 20px 30px 0;
    .text-item{
        width: 25%;
        padding-right: 20px;
        padding-bottom: 30px;
        box-sizing: border-box;
        float: left;
        .item-title{
            line-height: 60px;
            padding: 0 10px;
            color: #222;
            text-align: center;
            border: 1px solid #ddd;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            border-radius: 10px;
            font-size: 26px;
        }
    }
}
.tab-panel2{
    display: none
}
.letter-list h2{
    color: #222;
    background: #f5f5f5;
    padding-left: 40px;
    line-height: 60px;
    font-size: 28px;    
}
.indexer{
    box-sizing: border-box;
    position: absolute;
    width: 60px;
    top: 80px;
    right: 0;
    color: #2dbb55;
    font-size: 26px;
    font-weight: bold;
    li{
        width: 100%;
        text-align: center;
        line-height: 30px;
    }
}
.indexer-show {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 100px;
        line-height: 100px;
        margin-left: -50px;
        text-align: center;
        color: #fff;
        font-size: 60px; /*px*/
        background: #2dbb55;
        border-radius: 50%;
        z-index: 2;
    }
</style>
