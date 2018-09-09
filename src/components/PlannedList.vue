<template>
  <div class="col">
    <h2>Programmed recordings</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Channel</th>
          <th scope="col">Time</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tr v-for="(program, index) in programs" v-bind:key="index">
        <td>{{ program.channel }}</td>
        <td>{{ program.from }} - {{ program.to }}</td>
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
    programs() {
      return this.$store.state.programs;
    },
  },
  methods: {
    deleteProgram(index) {
      this.$store.commit(
        'deleteProgram', {
          index,
        },
      );
    },
  },
};
</script>

