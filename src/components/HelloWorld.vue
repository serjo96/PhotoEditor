/* eslint-disable */
<script>
import imgComprare from './imgComprare/imgComrare';

export default {
  name: 'HelloWorld',
  data() {
    return {
      imgSRC: '',
      showCompare: false,
      imgLoad: false,
      x: 'no',
        img: '',
    };
  },
  components: {
      imgComprare,
  },
  methods: {
    processFile(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      let image = new Image();
      const reader = new FileReader();
      const vm = this;
      const editorImg = this.$refs.imgEditor;
      const canv = this.$refs.uniqueName;

      reader.onload = (e) => {
        this.imgLoad = true;
        vm.imgSRC = e.target.result;
        image = document.createElement('img');
        if (this.imgLoad) {

          image.className = 'BeforeImg';
          image.setAttribute('alt', 'script div');
          image.setAttribute('src', vm.imgSRC);
          this.img = image;
          // image.onload = () => {
          //   image.style.width = `${parseInt(getComputedStyle(editorImg).width, 10)}px`;
          //   const imgContext = canv.getContext('2d');
          //   canv.width = image.width;
          //   canv.height = image.height;
          //
          //
          //   imgContext.drawImage(image, 0, 0, image.width, image.height);
          // };
        }
      };

      reader.readAsDataURL(file);
    },
    removeImage() {
      this.imgSRC = '';
    },
    startDrag() {
      this.dragging = true;
      const delimiter = this.$refs.delimiter;
      // const startX = (delimiter.pageX) ? delimiter.pageX : delimiter.touches[0].pageX;
      // const offsetLeft = delimiter.getBoundingClientRect().left + document.body.scrollLeft;
      // this.x = (offsetLeft + parseInt(getComputedStyle(delimiter).width, 10)) - startX;
      this.x = 0;
    },
    stopDrag() {
      this.dragging = false;
      this.x = 'no';
    },
    doDrag(event) {
      const delimiter = this.$refs.delimiter;
      if (this.dragging) {
        this.x = event.clientX;

        const dragElementWidth = parseInt(getComputedStyle(delimiter).width, 10);
        const elementOffsetLeft = this.$refs.imgEditor.getBoundingClientRect().left + document.body.scrollLeft;
        const elementWidth = parseInt(getComputedStyle(delimiter).width, 10);
        let openRatio = (this.x + (dragElementWidth / 2)) - elementOffsetLeft;
        console.log(openRatio);
        openRatio /= elementWidth;
        const width = `${openRatio * 100}%`;
        this.$refs.delimiter.style.left = width;
        this.$refs.imgWrap.style.width = width;
      }
    },

  },
  mounted() {
    window.addEventListener('mouseup', this.stopDrag);
  },
};
</script>

<template src="./imgLoader.html"></template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../templates/editor.scss";
  img{
      max-width: none;
  }
</style>
