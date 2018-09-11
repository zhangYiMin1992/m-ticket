<template>
    <div class="city-picker">
        <header id="dest-header">
            <span class="city-header-back" id="dest-back"></span>
            <h1>选择城市</h1>
        </header>
        <div class="city-wrapper">
            <div class="search-box">
                <div class="search-input-ctn">
                    <i class="icon-search5 search_btn"></i>
                    <form>
                        <input class="search-input" placeholder="请输入城市名称或拼音" autocomplete="false">
                    </form>                    
                </div>
                <span class="cancel">取消</span>
            </div>
            
            <div class="city-loading" v-show="cityLoading">
                <span>正在加载中···</span>
            </div>

            <div class="city-box">
                <div class="city-list">
                    <div class="nav-container">
                        <ul class="nav-tabs clearfix selected">
                            <li class="active">
                                <span>境内</span>
                            </li>
                            <li>
                                <span>境外</span>
                            </li>
                        </ul>
                    </div>
                    <div class="city-section">
                        <h2>定位城市</h2>
                        <ul class="text-container">
                            <li class="text-item">
                                <div class="item-title">上海</div>
                            </li>
                        </ul>
                    </div> 
                </div>
                
            </div>

               

        </div>
    </div>
</template>
<script>
export default {
    
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
.city-list .city-section h2{
    color: #222;
    background: #f5f5f5;
    padding-left: 40px;
    line-height: 60px;
    font-size: 28px;
}
</style>
