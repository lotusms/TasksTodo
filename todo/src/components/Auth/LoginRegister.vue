<template>
	<q-form @submit.prevent="submitForm">
		<div class="row q-mb-md">
			<q-banner class="bg-grey-3 col">
				<template v-slot:avatar>
					<q-icon name="account_circle" color="primary" />
				</template>
				{{tab | titleCase}} to access your todos anywhere
			</q-banner>
		</div>
		<div class="row q-mb-md">
			<q-input
				outlined
				v-model="formData.email"
				label="Email"
				stack-label
				dense
				class="col"
				lazy-rules
				:rules="[ val => isValidEmailAddress(val) || 'Please enter a valid email address']"
			/>
		</div>
		<div class="row q-mb-md">
			<q-input
				outlined
				v-model="formData.password"
				label="Password"
				stack-label
				dense
				class="col"
				type="password"
				lazy-rules
				:rules="[ val => val.length >= 6 || 'Please enter at least 3 characters']"
			/>
		</div>
		<div class="row q-mb-md">
			<q-space />
			<q-btn :label="tab" color="primary" type="submit" />
		</div>
	</q-form>
</template>

<script>
import { mapActions } from "vuex";

export default {
	name: "Register",
	props: ["tab"],
	data() {
		return {
			formData: {
				email: "test@test.com",
				password: "123456"
			}
		};
	},
	filters: {
		titleCase(value) {
			return value.charAt(0).toUpperCase() + value.slice(1);
		}
	},
	methods: {
		...mapActions("auth", ["registerUser", "loginUser"]),
		isValidEmailAddress(email) {
			var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(String(email).toLowerCase());
		},
		submitForm() {
			if (this.tab === "login") {
				this.loginUser(this.formData);
			} else {
				this.registerUser(this.formData);
			}
		}
	}
};
</script>

<style>
</style>