<template>
	<q-input
		outlined
		dense
		v-model="searchField"
		v-select-all
		label="Search"
		class="col"
		@keyup.esc="searchField = ''"
	>
		<template v-slot:append>
			<q-icon v-if="searchField !== ''" name="close" @click="searchField = ''" class="cursor-pointer" />
			<q-icon name="search" />
		</template>
	</q-input>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { selectAll } from "../../directives/directive-select-all";

export default {
	name: "Search",
	data() {
		return {};
	},
	directives: {
		selectAll
	},
	computed: {
		...mapState("tasks", ["search"]),
		searchField: {
			get() {
				return this.search;
			},
			set(value) {
				this.setSearch(value);
			}
		}
	},
	methods: {
		...mapActions("tasks", ["setSearch"])
	}
};
</script>