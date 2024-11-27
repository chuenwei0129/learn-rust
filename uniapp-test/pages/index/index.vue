<template>
	<view>
		<swiper class="banner" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="item of list">
				<image @tap="onView(item.url)" :src="item.url" key="item.id"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello World',
				list: [
					{id: 1, url: `http://iph.href.lu/400x400?text=hello`},
					{id: 1, url: `http://iph.href.lu/400x400?text=vue`},
					{id: 1, url: `http://iph.href.lu/400x400?text=react`}
				]
				
			}
		},
		onLoad() {

		},
		methods: {
			onView(url) {
				uni.previewImage({
					urls: this.list.map(item => item.url),
					current: url		
				})
			}
		}
	}
</script>

<style>
	.banner, .banner image {
		width: 750rpx;
		height: 750rpx;
	}

</style>
