<template>
	<transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
		<div :class="{'q-mt-lg' : !settings.showTasksInOneList}">
			<list-header bgcolor="bg-green-6" v-if="!settings.showTasksInOneList">Completed</list-header>
			<q-list bordered separator>
				<task v-for="(task, key) in tasksCompleted" :key="key" :task="task" :id="key" />
			</q-list>
		</div>
	</transition>
</template>

<script>
import Task from "./Task";
import ListHeader from "../Shared/ListHeader";
import { mapGetters } from "vuex";

export default {
	name: "TasksCompleted",
	props: ["tasksCompleted"],
	components: { Task, ListHeader },
	computed: {
		...mapGetters("settings", ["settings"])
	}
};
</script>