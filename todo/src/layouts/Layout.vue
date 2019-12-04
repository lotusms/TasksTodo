<template>
	<q-layout view="hHh lpR fFf">
		<q-header elevated>
			<q-toolbar>
				<q-toolbar-title class="absolute-center">Tasks Todo</q-toolbar-title>
				<q-btn
					to="/auth"
					flat
					icon-right="lock"
					label="Logout"
					class="absolute-right"
					@click="logoutUser"
				/>
			</q-toolbar>
		</q-header>

		<q-footer>
			<q-tabs>
				<q-route-tab
					v-for="nav in navs"
					:key="nav.label"
					:to="nav.to"
					:icon="nav.icon"
					:label="nav.label"
					exact
				/>
			</q-tabs>
		</q-footer>

		<q-drawer
			v-model="leftDrawerOpen"
			:breakpoint="767"
			:width="250"
			content-class="bg-secondary shadow-9"
		>
			<q-list>
				<q-item-label header>
					<h6 class="text-uppercase q-mt-sm q-mb-none">Navigation</h6>
				</q-item-label>
				<q-item v-for="nav in navs" :key="nav.label" :to="nav.to" class="text-grey-9" clickable exact>
					<q-item-section avatar>
						<q-icon :name="nav.icon" color="primary" />
					</q-item-section>
					<q-item-section>
						<q-item-label>{{nav.label}}</q-item-label>
					</q-item-section>
				</q-item>

				<q-item
					v-if="$q.platform.is.electron"
					@click="quitApp"
					class="text-grey-9 absolute-bottom"
					clickable
				>
					<q-item-section avatar>
						<q-icon name="power_settings_new" color="primary" />
					</q-item-section>
					<q-item-section>
						<q-item-label>Quit</q-item-label>
					</q-item-section>
				</q-item>
			</q-list>
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
	name: "Layout",
	data() {
		return {
			leftDrawerOpen: true,
			navs: [
				{
					label: "Todos",
					icon: "list",
					to: "/todos"
				},
				{
					label: "Settings",
					icon: "settings",
					to: "/settings"
				}
			]
		};
	},
	computed: {
		// ...mapState("auth", ["logoutUser"])
	},
	methods: {
		...mapActions("auth", ["logoutUser"]),
		quitApp() {
			this.$q
				.dialog({
					title: "Confirm",
					message: "Really quit TasksTodo?",
					cancel: true,
					persistent: true
				})
				.onOk(() => {
					if (this.$q.platform.is.electron) {
						require("electron").ipcRenderer.send("quit-app");
					}
				})
				.onCancel(() => {
					// console.log('>>>> Cancel')
				})
				.onDismiss(() => {
					// console.log('I am triggered on both OK and Cancel')
				});
		}
	}
};
</script>

<style lang="scss">
@media screen and (min-width: 768px) {
	.q-footer {
		display: none;
	}
}
.q-drawer {
	.q-router-link--active {
		color: #000000 !important;
		background: #d2d2d2 !important;
	}
}
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