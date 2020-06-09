import Vue from 'vue/dist/vue.esm';
import actions from "../src/shared/actions.ts";

function vueRender({ appContent, loading }) {
  return new Vue({
    template: `
      <div id="subapp-container" style="padding-bottom:100px">
        <h4 v-if="loading" class="subapp-loading">Loading...</h4>
        <div v-html="appContent" />
        <button @click="goLogin">登录</button>
      </div>
    `,
    el: '#subapp-container',
    data() {
      return {
        appContent,
        loading,
      };
    },

    mounted () {
      // 注册一个观察者函数
      console.log('da')
      console.log('actions', actions)
      actions.onGlobalStateChange((state, prevState) => {
        // state: 变更后的状态; prevState: 变更前的状态
        console.log("主应用观察者：token 改变前的值为 ", prevState);
        console.log("主应用观察者：登录状态发生改变，改变后的 token 的值为 ", state);
      });
    },

    methods: {
      goLogin () {
        const token = 'd0CvZsiX4uzZGqqcXoV3HNWeLmzJuoEbd5A8cDS7w9veauIwqadZqcIkEIWAdNnEcnzYdFQFy/nrhVC/ARu8eBJJCTUEs3+5DWy26xolVB40ZgDSrYdhq4kCdlIIXeOv0N1XarIduXain8FHQlBUHIPk1Hm4oHfZJbv/bcbsp1tBMMiaG9Hm5ql/dSIER0J6JiAuBzW7mCNlMxT4+OmzFvRg/vCzA/H0Ea6Tyaxv9VXuj5S1lCrAE48ZaELFCFS9v5Zn1bHdomf6LrKGhszcvWXAUNo1xgWp8OLSgUffM0XjhuX7v5avgrnGaT8134oaVQ21ZSn5+XupMDBUTjcSQJzmEz8Tub+0TPltU2ooSOjFxE5xmZ2osho5VYVexetA'
        actions.setGlobalState({token:token})
      } 
    }
  });
}

let app = null;

export default function render({ appContent, loading }) {
  if (!app) {
    app = vueRender({ appContent, loading });
  } else {
    app.appContent = appContent;
    app.loading = loading;
  }
}
