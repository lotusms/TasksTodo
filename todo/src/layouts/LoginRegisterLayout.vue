<template>
	<q-layout view="hHh lpR fFf">
		<q-header elevated>
			<q-toolbar>
				<q-toolbar-title class="absolute-center">Tasks Todo</q-toolbar-title>

				<q-btn
					v-if="!loggedIn"
					to="/auth"
					flat
					icon-right="lock_open"
					label="Login"
					class="absolute-right"
				/>

				<q-btn v-else flat icon-right="lock" label="Logout" class="absolute-right" />
			</q-toolbar>
		</q-header>
		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
	name: "LoginRegisterLayout",
	data() {
		return {};
	},
	computed: {
		...mapState("auth", ["loggedIn"])
	}
};
</script>

<style lang="scss">
.q-layout__section--marginal {
	background: #6e48aa; /* fallback for old browsers */
	background: -webkit-linear-gradient(
		to right,
		#6e48aa,
		#9d50bb
	); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(to right, #6e48aa, #9d50bb);
}
</style>