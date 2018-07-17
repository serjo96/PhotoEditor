<template>
<div>
    <div class="editor-panel__slider slider">
        <div class="slider__title">Red</div>
        <vue-slider v-bind="options"
                    :bg-style="{'backgroundColor': 'red'}"
                    v-model="red"
                    @callback="changedValue($event, 'red')"
        ></vue-slider>
    </div>
    <div class="editor-panel__slider slider">
        <div class="slider__title">Blue</div>
        <vue-slider v-bind="options"
                    :bg-style="{'backgroundColor': 'blue'}"
                    v-model="blue"
                    @callback="changedValue($event, 'blue')"
        ></vue-slider>
    </div>

    <div class="editor-panel__slider slider">
        <div class="slider__title">Green</div>
        <vue-slider v-bind="options"
                    :bg-style="{'backgroundColor': 'green'}"
                    v-model="green"
                    @callback="changedValue($event, 'green')"
        ></vue-slider>
    </div>
    <div class="editor-panel__slider slider">
        <div class="slider__title">Alpha</div>
        <vue-slider v-bind="options"
                    :bg-style="{'backgroundColor': 'white'}"
                    v-model="alpha"
                    @callback="changedValue($event, 'alpha')"
        ></vue-slider>
    </div>

  <div class="editor-panel__slider slider">
        <div class="slider__title">Hue</div>
        <vue-slider v-bind="options"
                    :bg-style="{'backgroundColor': 'white'}"
                    v-model="Hue"
                    @callback="changedValue($event, 'Hue')"
        ></vue-slider>
    </div>

  <div class="editor-panel__slider slider">
        <div class="slider__title">Saturation</div>
        <vue-slider v-bind="options"
                    :bg-style="{'backgroundColor': 'white'}"
                    v-model="Saturation"
                    @callback="changedValue($event, 'Saturation')"
        ></vue-slider>
    </div>

  <div class="editor-panel__slider slider">
        <div class="slider__title">Lightness</div>
        <vue-slider v-bind="options"
                    :bg-style="{'backgroundColor': 'white'}"
                    v-model="Lightness"
                    @callback="changedValue($event, 'Lightness')"
        ></vue-slider>
    </div>
</div>
</template>

<script>
import vueSlider from 'vue-slider-component';
import { mapMutations } from 'vuex';

export default {
  name: 'rgbSliders',
  components: {
    vueSlider,
  },
  data() {
    return {
      red: 0,
      blue: 0,
      green: 0,
      alpha: 0,
      Hue: 0,
      Saturation: 0,
      Lightness: 0,
      options: {
        max: 255,
        tooltip: 'hover',
        tooltipDir: 'bottom',
      },
    };
  },
  methods: {
    changedValue(val, color) {
      const colorObj = {
        color,
        val,
      };
      this.$store.dispatch('ChangeRGBValue', colorObj);
    },
  },
};
</script>

<style lang="scss" scoped>
    .editor-panel__slider{
        margin-bottom: 15px;
    }

</style>
