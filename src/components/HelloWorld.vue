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
