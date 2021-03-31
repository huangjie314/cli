import Vue from 'vue';
import main from './index.vue';
import './index.less';

new Vue({
  render: (h) => h(main),
}).$mount('#root');
