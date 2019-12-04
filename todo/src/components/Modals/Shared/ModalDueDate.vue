<template>
	<div class="row q-mb-sm">
		<q-input
			outlined
			dense
			:value="dueDate"
			@input="$emit('update:dueDate', $event)"
			@clear="$emit('update:dueDate', '')"
			label="Due Date"
			mask="date"
			style="width: 100%;"
			clearable
			clear-icon="close"
			:rules="['date']"
		>
			<template v-slot:append>
				<q-icon name="event" class="cursor-pointer">
					<q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
						<q-date
							:value="dueDate"
							@input="$emit('update:dueDate', $event); () => $refs.qDateProxy.hide()"
						/>
					</q-popup-proxy>
				</q-icon>
			</template>
		</q-input>
	</div>
</template>

<script>
export default {
	name: "ModalDueDate",
	props: ["dueDate"]
};
</script>

<style lang="scss">
</style>