<template>
	<transition
		appear
		enter-active-class="animated zoomIn"
		leave-active-class="animated zoomOut absolute-top"
	>
		<div>
			<list-header bgcolor="bg-orange-6" v-if="!settings.showTasksInOneList">Todo</list-header>
			<q-list bordered separator>
				<task v-for="(task, key) in tasksTodo" :key="key" :task="task" :id="key" />
			</q-list>
		</div>
	</transition>
</template>

<script>
import Task from "./Task";
import ListHeader from "../Shared/ListHeader";
import { mapGetters } from "vuex";

export default {
	name: "TasksTodo",
	props: ["tasksTodo"],
	components: { Task, ListHeader },
	computed: {
		...mapGetters("settings", ["settings"])
	}
};
</script>