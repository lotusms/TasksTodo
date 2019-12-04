
export default {
  methods:{
    submitForm() {
      this.submitTask();
			this.$emit("close");
    },
  }
}