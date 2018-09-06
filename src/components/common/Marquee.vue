<template>
    <div class="zzui-broascast-window" :style="{height:height + 'px'}">
        <ul class="zzui-broadcast-container" ref="container">
            <slot></slot>
        </ul>
    </div>    
</template>
<script>
import pageVisibility from '../../util/pageVisibility'
export default {
  data() {
    return {
      height: "",
      length: 0,
      currentIndex: 0,
      timer: null
    };
  },
  props: {
    interval: {
      type: Number,
      default: 3000
    },
    duration: {
      type: Number,
      default: 600
    },
    direction: {
      validator(val) {
        return val === "up" || val === "down";
      },
      default: "up"
    }
  },
  mounted() {
      let self = this
      this.$nextTick(function(){
          self.fixList();
          self.start();
      })
      pageVisibility.visibilitychange(function() {
        if(this.visibilityState=='hidden') {
            self.destroyed();
        }else{
            self.start();
        }
    })
  },
  methods: {
    setTransform(ele, val) {
      ele.style.transform = val;
      ele.style.WebkitTransform = val;
      ele.style.MozTransform = val;
      ele.style.OTransform = val;
    },
    setTransition(ele, val) {
      ele.style.transition = val;
      ele.style.WebkitTransition = "-webkit-" + val;
      ele.style.MozTransition = "-moz-" + val;
      ele.style.OTransition = "-o-" + val;
    },
    destroyed(){
        if(this.timer){
            clearInterval(this.timer);
            this.timer = null
        }
    },
    fixList(){
        let cloneNode, firstItem = this.$refs.container.firstElementChild;
        this.length = this.$refs.container.children.length;
        if(!this.length) return;
        if(this.direction === 'up'){
            cloneNode = firstItem.cloneNode(true);
            this.$refs.container.appendChild(cloneNode)
        }else{
            cloneNode = this.$refs.container.lastElementChild.cloneNode(true);
            this.$refs.container.insertBefore(cloneNode,firstItem);
        }
        this.$nextTick(()=>{
            this.height = this.$refs.container.offsetHeight / (this.length + 1)
        
        })
    },
    start(){
        let currentTransitionTime, currentTranslateY, self =this;
        if(this.direction === 'down'){
            this.quickjump(false);
        }
        this.destroyed();
        this.timer = setInterval(()=>{
            if(self.direction === 'up'){
                self.currentIndex += 1
            }else{
                self.currentIndex -= 1
            }
            currentTransitionTime = 'transform ' + self.duration + 'ms ease-in-out';
            self.setTransition(self.$refs.container,currentTransitionTime);
            if(self.direction === 'up'){
                currentTranslateY = -self.currentIndex * self.height +'px'
            }else{
                currentTranslateY = -(self.currentIndex + 1) * self.height + 'px'
            }
            self.setTransform(self.$refs.container,'translate3d(0,'+ currentTranslateY +', 0')
            if(self.currentIndex == self.length){
                setTimeout(()=>{
                    self.quickjump(true)
                },self.duration)
            }else if(self.currentIndex == -1){
                setTimeout(()=>{
                    self.quickjump(false)
                },self.duration)
            }
        },self.interval + self.duration)
        
    },
    quickjump(toFirst){
        let currentTranslateY,
            currentTransitionTime = 'transform 0ms ease-in-out';
        this.setTransition(this.$refs.container,currentTransitionTime);
        if(toFirst){
            this.currentIndex = 0;
            currentTranslateY ='0px';
        }else{
            this.currentIndex = this.length;
            currentTranslateY = -(this.currentIndex) * this.height+'px';
        }
        this.setTransform(this.$refs.container,'translate3d(0,'+ currentTranslateY +', 0')
    }
  }
};
</script>

<style lang="scss" scoped>
.zzui-broascast-window {
  width: 100%;
  position: relative;
  line-height: 80px;
  &:before {
    content: "";
    background: #a5a5a5;
    position: absolute;
    display: block;
    width: 6px;
    height: 60px;
    left: 0;
    top: 10px;
    transform-origin: center;
    transform: scale(0.5);
  }
  .zzui-broadcast-container{
      width: 100%;
  }
}
</style>
