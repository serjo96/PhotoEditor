<template>
    <figure class="image-compare"
            :class="{ full }"
            @mousemove.prevent="onMouseMove"
            @touchstart="onMouseMove($event, true)"
            @touchmove="onMouseMove($event, true)"
            @click="onMouseMove($event, true)">
        <div class="invisible-img">
            <img ref="img"
                :src="before"
                :alt="before"
                 v-show="!hidebefore"
                :style="dimensions"
            ></div>
        <div class="image-compare-wrapper"
             :style="{ width: !hidebefore  ? `${posX}px` : '100%' , height: `${this.cavh}px`}"
             v-show="!hidebefore"
        >
            <img ref="compareImg"
                 :src="before"
                 :alt="before"
                 :style="dimensions"

            >
        </div>
          <canvas ref="my-canvas" id="canv"></canvas>
            <!--<img :src="after" :alt="after" :style="dimensions">-->

        <div class="test-btns">
            <button class="test-btn" v-on:click="testCanvas()">TEST</button>
            <button class="test-btn" v-on:click="ClearCanvas()">REST</button>
        </div>

        <div class="image-compare-handle"
             :style="{ left: posX + 'px' }"
             @mousedown.prevent="onMouseDown"
             v-show="!hidebefore"
        >
            <div class="line"></div>

            <span class="image-compare-handle-icon left">
              <slot name="icon-left"></slot>
            </span>
            <span class="image-compare-handle-icon right">
              <slot name="icon-right"></slot>
            </span>

          </div>
    </figure>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'imgComprare',
  props: {
    before: {
      type: String,
      required: true,
    },
    after: {

      required: true,
    },
    full: {
      type: Boolean,
      default: false,
    },
    padding: {
      type: Object,
      default() {
        return {
          left: 0,
          right: 0,
        };
      },
      required: false,
    },
    hidebefore: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  data() {
    return {
      width: null,
      height: null,
      cavh: null,
      ctx: null,
      pageX: null,
      posX: null,
      isDragging: false,
      allowNextFrame: true,
      unwatch: null,
    };
  },
  computed: {
    ...mapGetters(['color']),

    dimensions() {
      return {
        width: `${this.width}px`,
        height: this.full ? `${this.height}px` : 'auto',
      };
    },
  },
  watch: {
    color: {
      deep: true,
      handler(newColor) {
          this.testCanvas();
        console.log('Oh, look, a new color!', newColor);
      },
    },
  },
  methods: {
    testCanvas() {
      const cavArrPx = this.ctx.getImageData(0, 0, this.$el.clientWidth, this.$el.offsetHeight);
      this.$nextTick(() => {
        console.log(cavArrPx);
        let arr = [];
        for (let i = 0; i < cavArrPx.data.length; i += 4) {
          cavArrPx.data[i] = cavArrPx.data[i] - this.$store.state.rgbColors.red; // red
          cavArrPx.data[i + 1] = cavArrPx.data[i + 1] - this.$store.state.rgbColors.green; // green
          cavArrPx.data[i + 2] = cavArrPx.data[i + 2]- this.$store.state.rgbColors.blue; // blue
            cavArrPx.data[i + 3] = 255;
        }
        this.ctx.putImageData(cavArrPx, 0, 0);
      });
    },
      ClearCanvas(){
          this.ctx.drawImage(this.$refs.img, 0, 0, this.$refs.img.clientWidth, this.$refs.img.offsetHeight);
      },
    onResize() {
      this.width = this.$el.clientWidth;
      this.height = this.$el.clientHeight;
      this.setInitialPosX(this.padding.left + this.padding.right);
    },
    onMouseDown() {
      this.isDragging = true;
    },
    onMouseUp(event) {
      event.preventDefault();
      this.isDragging = false;
    },
    onMouseMove(event, isDragging = this.isDragging) {
      if (isDragging && this.allowNextFrame) {
        this.allowNextFrame = false;
        this.pageX = event.pageX || event.targetTouches[0].pageX || event.originalEvent.targetTouches[0].pageX;
        window.requestAnimationFrame(this.updatePos);
      }
    },
    updatePos() {
      let posX = this.pageX - this.$el.getBoundingClientRect().left;
      if (posX < this.padding.left) {
        posX = this.padding.left;
      } else if (posX > this.width - this.padding.right) {
        posX = this.width - this.padding.right;
      }
      this.posX = posX;
      this.allowNextFrame = true;
    },
    setInitialPosX(padding) {
      if (padding >= this.width) {
        console.error('Sum of paddings is wider then parent element!');
        return;
      }
      this.posX = (this.width + this.padding.left - this.padding.right) / 2;
    },
  },
  created() {
    window.addEventListener('mouseup', this.onMouseUp);
    window.addEventListener('resize', this.onResize);
  },
  mounted() {
    this.ctx = this.$refs['my-canvas'].getContext('2d');
    this.onResize();

    this.unwatch = this.$watch(
      () => this.padding.left + this.padding.right,
      newValue => this.setInitialPosX(newValue),
    );
  },
  updated() {
    const canv = this.$refs['my-canvas'];

    const compareImg = this.$refs.compareImg;
    const img = this.$refs.img;
    let image = new Image();
    image = document.createElement('img');
    const _this = this;
    compareImg.onload = () => {
      image.className = 'BeforeImg';
      image.setAttribute('alt', 'script div');
      image.setAttribute('src', _this.before);

      _this.cavh = img.offsetHeight;
      canv.width = img.clientWidth;
      canv.height = img.offsetHeight;

      _this.ctx.drawImage(image, 0, 0, img.clientWidth, img.offsetHeight);
      this.onResize();
    };
  },

  beforeDestroy() {
    this.unwatch();
    window.removeEventListener('mouseup', this.onMouseUp);
    window.removeEventListener('resize', this.onResize);
  },
};
</script>

<style lang="scss" scoped>
  .test-btns{
    position: absolute;
    top: 0;
    right: 0;
    z-index: 90;
      background: rgba(000,000,000,0.4);
      padding: 10px;
  }

  .invisible-img{
      visibility: hidden;
      position: absolute;
  }
    .image-compare {
        position: relative;
        margin: 0;
        &.full {
            overflow: hidden;
            height: 100%;
            width: 100%;
            flex: 1;
            img {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
        }
        img {
            max-width: none;
            display: block;
        }
    }
    .image-compare-wrapper,
    .image-compare-handle {
        bottom: 0;
        position: absolute;
        top: 0;
    }
    .image-compare-wrapper {
        left: 0;
        overflow: hidden;
        width: 100%;
        z-index: 1;
        transform: translateZ(0);
        will-change: width;
    }
    .image-compare-handle {

        cursor: ew-resize;
        transform: translateX(-50%) translateZ(0);
        width: 2px;
        z-index: 2;
        will-change: left;
        padding: 0 5px;
        .line{
          color: #fff;
          background-color: currentColor;
          width: 2px;
          height: 100%;
        }
    }
    .image-compare-handle-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 2rem;
        color: currentColor;
        line-height: normal;
        &.left {
            padding-right: 10px;
            transform: translate(-100%, -50%);
        }
        &.right {
            padding-left: 10px;
            transform: translate(0, -50%);
        }
    }
</style>
