import Vue from 'vue';
import Vuex from 'vuex';
import { mutations, STORAGE_KEY } from './mutations';
import actions from './actions';
import getters from './getters';
import utilits from './utilits';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    value: 0,
    rgbColors: {
      red: 0,
        green: 0,
        blue: 0,
        alpha: 255,
      Hue: 0,
      Saturation: 100,
      Lightness: 100,
    },
  },
  mutations,
  getters,
  actions,
});
