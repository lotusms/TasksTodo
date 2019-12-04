<template>
	<q-card style="width: 300px">
		<modal-header>Edit Task</modal-header>
		<q-form @submit.prevent="submitForm">
			<q-card-section>
				<modal-task-name :name.sync="taskToSubmit.name" />
				<modal-due-date :dueDate.sync="taskToSubmit.dueDate" />
				<modal-due-time :dueTime.sync="taskToSubmit.dueTime" v-if="taskToSubmit.dueDate" />
			</q-card-section>

			<modal-buttons />
		</q-form>
	</q-card>
</template>

<script>
import { mapActions } from "vuex";
import ModalHeader from "./Shared/ModalHeader";
import ModalTaskName from "./Shared/ModalTaskName";
import ModalDueDate from "./Shared/ModalDueDate";
import ModalDueTime from "./Shared/ModalDueTime";
import ModalButtons from "./Shared/ModalButtons";
import MixinAddEditTask from "../../mixins/mixin-add-edit-task";

export default {
	name: "EditTask",
	mixins: [MixinAddEditTask],
	components: {
		ModalHeader,
		ModalTaskName,
		ModalDueDate,
		ModalDueTime,
		ModalButtons
	},
	props: ["task", "id"],
	data() {
		return {
			taskToSubmit: {}
		};
	},
	methods: {
		...mapActions("tasks", ["updateTask"]),
		submitTask() {
			this.updateTask({
				id: this.id,
				updates: this.taskToSubmit
			});
		}
	},
	mounted() {
		this.taskToSubmit = Object.assign({}, this.task);
	}
};
</script>
