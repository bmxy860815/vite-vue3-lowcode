import { createApp } from 'vue';
import axios from 'axios';
import App from './App.vue';

import { setupElementPlus } from './plugins/element-plus';
import { setupVant } from './plugins/vant';

import 'normalize.css';
import 'virtual:windi.css';
import 'virtual:windi-devtools';
import 'animate.css';

import router from './router/';
import { setupStore } from './store/';

import { localKey } from '@/visual-editor/hooks/useVisualData';

// const route = useRoute()
//
//
//
(async () => {
  console.log('env::', import.meta.env);
  const link = window.location.href.split('?');
  const params = new URLSearchParams(link[1]);

  let {
    ClassID = '',
    PID = '',
    token = '',
    MiniProgram = '',
  } = Object.fromEntries(params.entries());

  if (ClassID) {
    sessionStorage.setItem('ClassID', ClassID as string);
    sessionStorage.setItem('MiniProgram', MiniProgram as string);
    sessionStorage.setItem('PID', PID as string);
    sessionStorage.setItem('token', token as string);
    Object.fromEntries(params.entries());
  } else {
    ClassID = sessionStorage.getItem('ClassID') || '';
    PID = sessionStorage.getItem('PID') || '';
    MiniProgram = sessionStorage.getItem('MiniProgram') || '';
    token = sessionStorage.getItem('token') || '';
  }

  const res = await axios.request({
    url: `/api/classes/${ClassID}/wechat/shop?PID=${PID}`,
    baseURL: import.meta.env.VITE_API_URL || 'http://192.168.1.38:8000',
    method: 'get',
    timeout: 10 * 1000, // 请求超时时间
    headers: { 'Content-Type': 'application/json;charset=UTF-8', Authorization: `Bearer ${token}` },
  });

  console.log('xxx start', res.data);
  localStorage.setItem(localKey, res.data.Content);
  sessionStorage.setItem(localKey, res.data.Content);

  const app = createApp(App);
  // 配置store
  setupStore(app);
  // 使用element-plus插件
  setupElementPlus(app);
  // 使用vant插件
  setupVant(app);

  app.config.globalProperties.$$refs = {};
  window.$$refs = app.config.globalProperties.$$refs;

  app.use(router);
  // 路由准备完毕再挂载
  router.isReady().then(() => app.mount('#app'));
})();
