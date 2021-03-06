import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let lifeData = {};

try {
	// 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
	lifeData = uni.getStorageSync('lifeData');
} catch (e) {

}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['vuex_user', 'vuex_token', 'app_version'];

// 保存变量到本地存储中
const saveLifeData = function(key, value) {
	// 判断变量名是否在需要存储的数组中
	if (saveStateKeys.indexOf(key) != -1) {
		// 获取本地存储的lifeData对象，将变量添加到对象中
		let tmp = uni.getStorageSync('lifeData');
		// 第一次打开APP，不存在lifeData变量，故放一个{}空对象
		tmp = tmp ? tmp : {};
		tmp[key] = value;
		// 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
		uni.setStorageSync('lifeData', tmp);
	}
}
const store = new Vuex.Store({
	state: {
		vuex_user: lifeData.vuex_user ? lifeData.vuex_user : {
			id: 1,
			name: '小小只',
			mobile: 13116460080,
		},
		vuex_token: lifeData.vuex_token ? lifeData.vuex_token : '',
		app_version: lifeData.vuex_token ? lifeData.vuex_token : '1.0.0',
		// tabbar数据
		vuex_tabbar: [{
				iconPath: "/static/home.png",
				selectedIconPath: "/static/home_selected.png",
				text: '首页',
				pagePath: '/pages/main/index/index'
			},
			{
				iconPath: "/static/function.png",
				selectedIconPath: "/static/function_selected.png",
				text: '功能',
				pagePath: '/pages/main/function/index'
			},
			{
				iconPath: "/static/center.png",
				selectedIconPath: "/static/center_selected.png",
				text: '我的',
				pagePath: '/pages/main/center/index'
			}
		],
		vuex_config: {
			show: true,
			height: '50px',
			bgColor: '#ffffff',
			iconSize: 40,
			borderTop: true,
			midButton: false,
			hideTabBar: true,
			activeColor: '#1296db',
			inactiveColor: '#707070',
			midButtonSize: 90,
		}
	},
	mutations: {
		$uStore(state, payload) {
			// 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
			let nameArr = payload.key.split('.');
			let saveKey = '';
			let len = nameArr.length;
			if (len >= 2) {
				let obj = state[nameArr[0]];
				for (let i = 1; i < len - 1; i++) {
					obj = obj[nameArr[i]];
				}
				obj[nameArr[len - 1]] = payload.value;
				saveKey = nameArr[0];
			} else {
				// 单层级变量，在state就是一个普通变量的情况
				state[payload.key] = payload.value;
				saveKey = payload.key;
			}
			// 保存变量到本地，见顶部函数定义
			saveLifeData(saveKey, state[saveKey])
		}
	}
})

export default store
