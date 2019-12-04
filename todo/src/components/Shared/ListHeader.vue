<template>
	<q-banner dense inline-actions :class="bgcolor" class="text-white text-center">
		<span class="text-bold text-h6">
			<slot />
		</span>
	</q-banner>
</template>

<script>
export default {
	name: "ListHeader",
	props: ["bgcolor"]
};
</script>