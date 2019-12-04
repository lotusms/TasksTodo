<template>
	<div class="row q-mb-sm">
		<q-input
			outlined
			dense
			:value="name"
			@input="$emit('update:name', $event)"
			@clear="$emit('update:name', '')"
			label="Task Name"
			class="col"
			autofocus
			v-select-all
			clearable
			clear-icon="close"
			:rules="[val => !!val || 'Field is required']"
		/>
	</div>
</template>

<script>
import { selectAll } from "../../../directives/directive-select-all";

export default {
	name: "ModalTaskName",
	props: ["name"],
	directives: {
		selectAll
	}
};
</script>

<style lang="scss">
</style>