<template>
	<q-page>
		<div class="q-pa-md absolute full-width full-height column">
			<template v-if="tasksDownloaded">
				<div
					class="text-right q-mb-md"
					v-if="Object.keys(tasksTodo).length > 0 || Object.keys(tasksCompleted).length > 0"
				>
					<q-btn color="primary" @click="showAddTask = true">
						<q-icon left size="1.4em" name="add" />
						<div>Add Todo</div>
					</q-btn>
				</div>
				<div class="row q-mb-lg">
					<search />
					<sort />
				</div>

				<p
					v-if="search && !Object.keys(tasksTodo).length && !Object.keys(tasksCompleted).length"
				>Nothing found. Check your spelling</p>
				<q-scroll-area class="q-scroll-area-tasks">
					<no-tasks v-if="!Object.keys(tasksTodo).length && !search && !settings.showTasksInOneList"></no-tasks>

					<tasks-todo :tasksTodo="tasksTodo" v-if="Object.keys(tasksTodo).length" />

					<tasks-completed :tasksCompleted="tasksCompleted" v-if="Object.keys(tasksCompleted).length" />
				</q-scroll-area>
			</template>
			<template v-else>
				<span class="absolute-center">
					<q-spinner-hourglass color="grey-5" size="2em" />
				</span>
			</template>
		</div>

		<q-dialog v-model="showAddTask" persistent>
			<add-task @close="showAddTask = false"></add-task>
		</q-dialog>
	</q-page>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Task from "../components/Tasks/Task";
import TasksTodo from "../components/Tasks/TasksTodo";
import TasksCompleted from "../components/Tasks/TasksCompleted";
import NoTasks from "../components/Tasks/NoTasks";
import AddTask from "../components/Modals/AddTask";
import Search from "../components/Tools/Search";
import Sort from "../components/Tools/Sort";

export default {
	name: "PageIndex",
	data() {
		return {
			showAddTask: false
		};
	},
	components: {
		Task,
		AddTask,
		TasksTodo,
		TasksCompleted,
		NoTasks,
		Search,
		Sort
	},
	computed: {
		...mapGetters("tasks", ["tasksTodo", "tasksCompleted"]),
		...mapGetters("settings", ["settings"]),
		...mapState("tasks", ["search", "tasksDownloaded"])
	},
	mounted() {
		this.$root.$on("showAddTask", () => {
			this.showAddTask = true;
		});
	}
};
</script>

<style lang="scss">
.q-scroll-area-tasks {
	display: flex;
	flex-grow: 1;
}
.electron {
	.q-scroll-area-tasks {
		.scroll {
			height: auto !important;
		}
	}
}
</style>
