<template>
	<view>
		<u-tabbar
			:list="vuex_tabbar"
			:show="vuex_config.show"
			:height="vuex_config.height"
			:bg-color="vuex_config.bgColor"
			:icon-size="vuex_config.iconSize"
			:border-top="vuex_config.borderTop"
			:mid-button="vuex_config.midButton"
			:activeColor="vuex_config.activeColor"
			:hide-tab-bar="vuex_config.hideTabBar"
			:inactive-color="vuex_config.inactiveColor"
			:mid-button-size="vuex_config.midButtonSize"
		></u-tabbar>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	onLoad() {},
	onShow() {},
	onHide() {},
	onReady() {},
	onUnload() {},
	watch: {},
	methods: {}
};
</script>

<style lang="scss" scoped></style>
