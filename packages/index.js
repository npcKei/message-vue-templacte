import VueMessageTemplate from "../examples/message"

const components = [
    VueMessageTemplate
];

// 定义 install 方法
const install = function (Vue) {
    // 遍历组件列表并注册全局组件
    components.map(component => {
        Vue.component(component.name, component) //component.name 此处使用到组件vue文件中的 name 属性
    })

    Vue.prototype.$message = VueMessageTemplate
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install,
    ...components
}