import Vue from 'vue'
import App from './App.vue'
import './public-path';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router';
import routes from './router';
import store from './store';
import actions from './shared/actions.js'

Vue.use(ElementUI);

Vue.config.productionTip = false



let router = null;
let instance = null;

function render(props) {
  console.log('props', props)
  if (props) {
    // 注入 actions 实例
    actions.setActions(props);
  }
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/vue' : '/',
    mode: 'history',
    routes,
  });

  instance = new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap(props) {
  console.log('--------[vue] vue app bootstraped', props);
}

export async function mount(props) {
  console.log('---------[vue] props from main framework', props);
  render();
}

export async function unmount() {
  instance.$destroy();
  instance = null;
  router = null;
}
