<template>
  <div class="hello">
    <h2>Programmed recordings</h2>
    <ul>
      <li v-for="(program, index) in programs" v-bind:key="index">
        {{ program.channel }} - From {{ program.from }} to {{ program.to }}
        <button class="btn btn-sm btn-outline-danger" v-on:click="deleteProgram(index)">X</button>
      </li>
    </ul>
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

