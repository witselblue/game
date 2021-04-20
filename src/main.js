import Vue from 'vue';
import Route from './Route.vue';

Vue.config.productionTip = false

new Vue({
  render: h => h(Route),
}).$mount('#app')
