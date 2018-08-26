<template>
    <div id="banner" class="wap-banner" ref="swipe">
        <img alt="" src="//ssl4.tuniucdn.com/img/2016091314/index_v4/promote.png" style="position: absolute; left: 3px; bottom: 3px; z-index: 1; height: 9px;"> 
        <div class="wap-pic" ref="con">
            <a href="item.adAppLinkUrl" v-for="(item,index) in swipeBanner" :key="index">
                <img :src="item.adImgUrl">
            </a>            
        </div>
        <ul>
            <li v-for="(item,index) in adList" :key="index" :class="{on:index==0}"><a></a></li>
        </ul>
    </div>
</template>
<script>
  import {setStyle} from 'wind-dom/src/style';
  import {addClass, removeClass} from 'wind-dom/src/class';
export default {
  name: "SwipeLazy",
  componentName: "SwipeLazy",
  data() {
    return {
      length: 0,
      index: 1,
      items: [],
      interval:null,
      adList: [
        {
          adAppLinkUrl: "https://m.tuniu.com/menpiao/t_1994829",
          adEventFlag: 0,
          adGaTrack: null,
          adImgUrl:
            "https://m3.tuniucdn.com/fb2/t1/G5/M00/D6/DA/Cii-s1t2bv2IIaRRAACM_8ctklEAAMLWAO0uiQAAI0X92_w755_h0_c0_t0.jpeg",
          adLinkUrl: "",
          adMLinkUrl: "",
          adMainTitle: "开学错峰",
          adSubTitle: "",
          adTagType: 0
        },
        {
          adAppLinkUrl: "https://m.tuniu.com/menpiao/t_16734",
          adEventFlag: 0,
          adGaTrack: null,
          adImgUrl:
            "https://m2.tuniucdn.com/fb2/t1/G5/M00/77/0B/Cii-s1tEa7-IQlmBAAKQNLqwpfQAAJ9QAP7RYQAApBM09_w755_h0_c0_t0.jpeg",
          adLinkUrl: "",
          adMLinkUrl: "",
          adMainTitle: "长隆欢乐世界",
          adSubTitle: "",
          adTagType: 0
        },
        {
          adAppLinkUrl: "https://m.tuniu.com/menpiao/t_16934",
          adEventFlag: 0,
          adGaTrack: null,
          adImgUrl:
            "https://m.tuniucdn.com/fb2/t1/G5/M00/30/15/Cii-slpPTQmINr4zAADbkH_rARYAABtvQCTK6YAANuo20_w755_h0_c0_t0.jpeg",
          adLinkUrl: "",
          adMLinkUrl: "",
          adMainTitle: "深圳欢乐谷",
          adSubTitle: "",
          adTagType: 0
        },
        {
          adAppLinkUrl: "https://m.tuniu.com/menpiao/t_37794",
          adEventFlag: 0,
          adGaTrack: null,
          adImgUrl:
            "https://m4.tuniucdn.com/fb2/t1/G5/M00/30/15/Cii-s1pPTQmIAyDvAADqXiZXwfwAABtvQCUB04AAOp240_w755_h0_c0_t0.jpeg",
          adLinkUrl: "",
          adMLinkUrl: "",
          adMainTitle: "深圳世界之窗",
          adSubTitle: "",
          adTagType: 0
        },
        {
          adAppLinkUrl: "https://m.tuniu.com/menpiao/t_1994828",
          adEventFlag: 0,
          adGaTrack: null,
          adImgUrl:
            "https://m3.tuniucdn.com/fb2/t1/G5/M00/2C/0C/Cii-tFsaEZKILkx5AAJzT0mSfA0AAILAQH-2BAAAnNn857_w755_h0_c0_t0.png",
          adLinkUrl: "",
          adMLinkUrl: "",
          adMainTitle: "美女与野兽",
          adSubTitle: "",
          adTagType: 0
        }
      ]
    };
  },
  mounted() {
    let self = this;
    this.$nextTick(function() {
      self.init();
    });
  },
  computed: {
    swipeBanner: function() {
      if (this.adList.length <= 1) {
        return this.adList;
      }
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
  },
  methods: {
    css3: function() {
      var o = {};
      var prefix = ["-webkit-", "-moz-", "-ms-", "-o-"];
      if (typeof arguments[0] == "string") {
        o[arguments[0]] = arguments[1];
      } else {
        o = arguments[0];
      }
      for (var k in o) {
        for (var i = 0, len = prefix.length; i < len; i++) {
          o[prefix[i] + k] = o[k];
        }
      }
      return o;
    },
    init() {
      let that = this;
      that.initData();
      if (that.length == 1) {
        that.index = 0;
        that.stop();
        that.initPage();
        addClass(that.$refs.swipe, "disable-touch")
        return
      }
      that.initPage()
    },
    initData() {
      this.length = this.swipeBanner.length;
      this.items = this.$refs.con.getElementsByTagName("a");
      this.index = 1;
    },
    initPage() {
      for (let i = 0; i < this.length; i++) {
        setStyle(
          this.items[i],
          this.css3({ transform: "translate3d(" + 100 * i + "%,0,0)" })
        );
      }
      
    },
    setPos(){

    },
    loadImage(img,callback){

    },
    stop() {
      let that = this
      clearInterval(that.interval)
      that.interval = null
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
