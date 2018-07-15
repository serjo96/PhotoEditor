<template>
  <div id="app">
    <div class="logo">Editor</div>
    <LeftEditor/>
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld';
import LeftEditor from './components/EditorPanel/LeftPanel/LeftEditorPanel';

export default {
  name: 'App',
  components: {
    HelloWorld,
    LeftEditor,
  },
};
</script>

<style lang="scss">

@import "templates/styles.scss";


</style>
