<template>
	<q-select
		outlined
		dense
		v-model="sortBy"
		emit-value
		map-options
		:options="options"
		label="Sort By"
		class="col q-ml-sm"
	/>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
	name: "Sort",
	data() {
		return {
			options: [
				{
					label: "Name",
					value: "name"
				},
				{
					label: "Date",
					value: "dueDate"
				}
			]
		};
	},
	computed: {
		...mapState("tasks", ["sort"]),
		sortBy: {
			get() {
				return this.sort;
			},
			set(value) {
				this.setSort(value);
			}
		}
	},
	methods: {
		...mapActions("tasks", ["setSort"])
	}
};
</script>

<style scoped lang="scss">
.q-select {
	flex: 0 0 200px;
}
.platform-ios {
	.q-select {
		flex: 0 0 120px;
	}
}
.platform-android {
	.q-select {
		flex: 0 0 120px;
	}
}
</style>