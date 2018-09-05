<template>
    <div id="banner" class="wap-banner" ref="swipe">
        <img alt="" src="//ssl4.tuniucdn.com/img/2016091314/index_v4/promote.png" style="position: absolute; left: 3px; bottom: 3px; z-index: 1; height: 9px;"> 
        <div class="wap-pic" ref="con">
            <a href="item.adAppLinkUrl" v-for="(item,index) in banner" :key="index">
                <img :src="item.adImgUrl" v-if="index == 0">
                <img :data-src="item.adImgUrl" v-else>
            </a>            
        </div>
        <ul ref="nav">
            <li v-for="(item,index) in adList" :key="index" :class="{on:index==0}"><a></a></li>
        </ul>
    </div>
</template>
<script>
import bus from '../../../../bus';
import { setStyle } from "wind-dom/src/style";
import { addClass, removeClass } from "wind-dom/src/class";
export default {
  name: "SwipeLazy",
  componentName: "SwipeLazy",
  props:{
      adList:{
          type: Array,
          default :[]
      }
  },
  data() {
    return {
      length: 0,
      index: 1,
      items: [],
      interval: null,
      touchLock: false
    };
  },

  beforeDestroy(){
      //bus.$off('swipeLazy')
  },
  computed: {
    banner() {
      if (this.adList.length <= 1) {
        return this.adList;
      }else{
        let first = this.adList[0];
        let last = this.adList[this.adList.length - 1];
        let tempList = [];
        tempList.push(last);
        this.adList.forEach((v, k) => {
            tempList.push(v);
        });
        tempList.push(first);
        return tempList;
      }
      
    }
  },
    mounted() {
      let self = this;
      this.$nextTick(function(){
          bus.$on('swipeLazy',()=>{
            self.init()
            })
      })
  },
    methods: {
    css3: function () {
        var o = {};
        var prefix = ["-webkit-", "-moz-", "-ms-", "-o-"];
        if (typeof arguments[0] == "string") {
            o[arguments[0]] = arguments[1]
        } else {
            o = arguments[0]
        }
        for (var k in o) {
            for (var i = 0, len = prefix.length; i < len; i++) {
                o[prefix[i] + k] = o[k]
            }
        }
        return o
    },
    initData: function () {
        this.length = this.banner.length;
        this.items = this.$refs.con.getElementsByTagName('a');
        this.index=1;
    },
    initPage: function () {
        
        for (var i = 0; i < this.length; i++) {
            setStyle(this.items[i], this.css3({"transform": "translate3d(" + 100 * i + "%, 0, 0)"}));
        }
        this.setPos(-100 * this.index + "%", false);
    },
    setPos: function (pos, needTransition) {
        var that = this;
        that.index - 1 >= 0 && that.loadImage(that.items[that.index - 1].getElementsByTagName('img')[0]);
        that.index + 1 < that.length && that.loadImage(that.items[that.index + 1].getElementsByTagName('img')[0]);
        var ani = {};
        ani.transition = needTransition ? "all 0.4s ease" : "all 0s ease";
        ani.transform = "translate3d(" + pos + ", 0, 0)";
        setStyle(this.$refs.con, this.css3(ani));
        if(that.length==1) {
            addClass(this.$refs.nav.getElementsByTagName('li')[0], "on");
            return;
        }
        for (let i = 0; i < this.length; i++) {
            removeClass(this.$refs.nav.getElementsByTagName('li')[i], "on");
        }
        addClass(this.$refs.nav.getElementsByTagName('li')[this.index - 1], "on");
        setTimeout(function () {
                    if (that.index <= 0) {
                        that.index = that.length - 2;
                        that.setPos(-100 * that.index + "%", false);
                        return false
                    }
                    if (that.index >= that.length - 1) {
                        that.index = 1;
                        that.setPos(-100 * that.index + "%", false);
                        return false
                    }
                },
                400)
    },
    bindEvent(){
        var that = this;
        var el = that.$refs.swipe;
        var pos = {};
        var direction = '';
        el.addEventListener('touchstart',function(ev){
            direction = '';
            that.stop();
            pos.x1 = ev.touches[0].pageX;
            pos.y1 = ev.touches[0].pageY;
            return
        },false);

        el.addEventListener('touchmove',function(ev){
            pos.x2 = ev.touches[0].pageX;
            pos.y2 = ev.touches[0].pageY;
            var x = pos.x2 - pos.x1;
            var y = pos.y2 - pos.y1;
            !direction && (direction = Math.abs(y) > Math.abs(x) ? 'vertical' : 'horizontal');
            if(direction == 'vertical'){
                return
            }
            var width = window.innerWidth;
            that.setPos(x-that.index * width + 'px', false);
            ev.preventDefault();
            return false
        },false);

        el.addEventListener('touchend',function(ev){
            pos.x2 = ev.touches[0].pageX;
            pos.y2 = ev.touches[0].pageY;
            var x = pos.x2 - pos.x1;
            var y = pos.y2 - pos.y1;
            if(direction == 'vertical'){
                return
            } 
            if(Math.abs(x) >= 30){
                if(x>0){
                    that.index--
                } else {
                    that.index++
                }
            } 
            that.setPos(-100 * that.indx + '%', true);
            that.play();
            if(Math.abs(x) < 30){
                return
            } 
            ev.preventDefault();
            return false         
        },false);
    },
    play: function () {
        var that = this;
        that.stop();
        that.interval = setInterval(function () {
                    that.index++;
                    that.setPos(-100 * that.index + "%", true)
                },
                4000)
    },
    stop: function () {
        var that = this;
        clearInterval(that.interval)
        that.interval=null;
    },
    loadImage: function (img, callback) {
        if (!(img)) return;
        var src = img.getAttribute("data-src");
        if (!src) return;
        img.setAttribute('src', src);
        img.removeAttribute("data-src");
        callback && (img.onload = function () {
            callback();
            img.onload = null
        })
    },
    init: function () {
        var that = this;
        that.initData();
        if(that.length==1) {
            that.index=0;
            that.stop();
            that.initPage();
            addClass(that.$refs.swipe,'disable-touch');
            return;
        }else{
            removeClass(that.$refs.swipe,'disable-touch');
        }
        that.initPage();
        that.loadImage(that.items[that.index].getElementsByTagName('img')[0],
        function () {
            !that.touchLock && that.bindEvent();
            that.touchLock=true;
            that.play();
        })
    }
}
};
</script>
<style lang="scss" scoped>
.wap-banner {
  width: 100%;
  height: 0;
  padding-bottom: 20%;
  position: relative;
  overflow: hidden;
  .wap-pic {
    a {
      position: absolute;
      width: 100%;
      z-index: 1;
      img {
        width: 100%;
      }
    }
    a:nth-child(1) {
      z-index: 2;
    }
  }
  ul {
    position: absolute;
    z-index: 2;
    bottom: 4px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    li {
      display: inline-block;
      margin-left: 6px;
      a {
        display: block;
        width: 22px;
        height: 4px;
        background-color: #fff;
      }
    }
    li.on {
      a {
        background: #32bd60;
      }
    }
  }
}
</style>
