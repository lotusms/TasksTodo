<template>
	<q-page padding style="display: flex; align-items: center;">
		<q-card class="auth-card">
			<q-tabs
				v-model="tab"
				dense
				class="text-grey"
				active-color="primary"
				indicator-color="primary"
				align="justify"
				narrow-indicator
			>
				<q-tab name="login" label="Login" />
				<q-tab name="register" label="Register" />
			</q-tabs>

			<q-separator />

			<q-tab-panels v-model="tab" animated>
				<q-tab-panel name="login">
					<login-register :tab="tab" />
				</q-tab-panel>

				<q-tab-panel name="register">
					<login-register :tab="tab" />
				</q-tab-panel>
			</q-tab-panels>
		</q-card>
	</q-page>
</template>

<script>
import LoginRegister from "../components/Auth/LoginRegister";
export default {
	name: "PageAuth",
	components: { LoginRegister },
	data() {
		return {
			tab: "login"
		};
	}
};
</script>

<style>
.auth-card {
	max-width: 500px;
	margin: 0 auto;
}
</style>