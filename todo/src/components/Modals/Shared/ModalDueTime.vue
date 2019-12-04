<template>
	<div class="row q-mb-sm">
		<q-input
			outlined
			dense
			:value="dueTime"
			@input="$emit('update:dueTime', $event)"
			@clear="$emit('update:dueTime', '')"
			label="Due Time"
			mask="time"
			style="width: 100%;"
			clearable
			clear-icon="close"
			:rules="['time']"
		>
			<template v-slot:append>
				<q-icon name="access_time" class="cursor-pointer">
					<q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
						<q-time :value="dueTime" @input="$emit('update:dueTime', $event)" />
					</q-popup-proxy>
				</q-icon>
			</template>
		</q-input>
	</div>
</template>

<script>
export default {
	name: "ModalDueTime",
	props: ["dueTime"]
};
</script>

<style lang="scss">
</style>