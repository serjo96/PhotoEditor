<template>
<div class="editor-panel editor-panel--left">
    <rgbSliders/>
</div>
</template>

<script>
import rgbSliders from './rgbSliders';

export default {
  name: 'LeftEditorPanel',
  components: {
    rgbSliders,
  },
};
</script>

<style lang="scss" scoped>
    .editor-panel{
        &--left{
             left: 0;
         }
    }
</style>
