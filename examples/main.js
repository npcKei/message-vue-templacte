import Vue from 'vue';
import App from './App.vue'
import Message from './message'


Vue.prototype.$message = Message

console.log(App)
new Vue({
    render: h => h(App)
  }).$mount('#app');