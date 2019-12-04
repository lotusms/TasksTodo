<template>
	<q-item
		v-touch-hold:1000.mouse="showEditTaskModal"
		@click="updateTask({id: id, updates:{ completed: !task.completed }})"
		:class="!task.completed ? 'bg-orange-1' : 'bg-green-1'"
		clickable
		v-ripple
	>
		<!-- <q-item-section side top>
			<q-checkbox :value="task.completed" class="no-pointer-events" />
		</q-item-section>-->

		<q-item-section>
			<q-item-label
				:class="{ 'text-strike' : task.completed }"
				v-html="$options.filters.searchHighlight(task.name, search)"
			></q-item-label>
		</q-item-section>

		<q-item-section side>
			<div class="row">
				<div class="column justify-center">
					<q-icon name="event" size="13px" class="q-pr-sm" />
				</div>
				<div class="column justify-center">
					<q-item-label caption>{{task.dueDate | niceDate}}</q-item-label>
				</div>
			</div>
			<div class="row">
				<div class="column justify-center">
					<q-icon name="access_time" size="10px" class="q-pr-sm" />
				</div>
				<div class="column justify-center">
					<q-item-label caption>
						<small>{{taskDueTime}}</small>
					</q-item-label>
				</div>
			</div>
		</q-item-section>

		<q-item-section side>
			<div class="row">
				<q-btn flat round dense color="dark" icon="edit" @click.stop="showEditTaskModal" />
				<q-btn
					flat
					round
					dense
					color="negative"
					icon="delete_forever"
					@click.stop="promptToDelete(id)"
				/>
			</div>
		</q-item-section>

		<q-dialog v-model="showEditTask" persistent>
			<edit-task @close="showEditTask = false" :task="task" :id="id" />
		</q-dialog>
	</q-item>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import EditTask from "../Modals/EditTask";
import { date } from "quasar";
const { addToDate } = date;

export default {
	name: "Task",
	data() {
		return {
			showEditTask: false
		};
	},
	components: { EditTask },
	props: ["task", "id"],
	filters: {
		niceDate(value) {
			return date.formatDate(value, "MMM Do, YYYY");
		},
		searchHighlight(value, search) {
			if (search) {
				let searchRegExp = new RegExp(search, "ig");
				return value.replace(searchRegExp, match => {
					return "<span class='bg-yellow-6'>" + match + "</span>";
				});
			}

			return value;
		}
	},
	computed: {
		...mapState("tasks", ["search"]),
		...mapGetters("settings", ["settings"]),
		taskDueTime() {
			if (this.settings.show12HourTimeFormat) {
				return date.formatDate(
					this.task.dueDate + " " + this.task.dueTime,
					"h:mm A"
				);
			}
			return this.task.dueTime;
		}
	},
	methods: {
		...mapActions("tasks", ["updateTask", "deleteTask"]),
		promptToDelete(id) {
			this.$q
				.dialog({
					title: "Confirm",
					message: "Really, delete?",
					ok: {
						color: "primary",
						raised: true
					},
					cancel: {
						color: "negative",
						flat: true
					},
					persistent: true
				})
				.onOk(() => {
					this.deleteTask(id);
				});
		},
		showEditTaskModal() {
			this.showEditTask = true;
		}
	}
};
</script>

<style scoped>
</style>