<template>
  <div class="col">
    <h2>Programmed recordings</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Channel</th>
          <th scope="col">Start Time</th>
          <th scope="col">Duration (min)</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tr v-for="(program, index) in schedule" v-bind:key="index">
        <td>{{ program.channel }}</td>
        <td>{{ new Date(program.from).toLocaleString() }}</td>
        <td>{{ program.duration }}</td>
        <td>
          <button class="btn btn-sm btn-danger" v-on:click="deleteProgram(index)">X</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: 'PlannedList',
  computed: {
    schedule() {
      return this.$store.state.schedule;
    },
  },
  methods: {
    deleteProgram(index) {
      this.$store.dispatch(
        'deleteProgram', {
          index,
        },
      );
    },
  },
  created() {
    this.$store.dispatch('loadSchedule');
  },
};
</script>

