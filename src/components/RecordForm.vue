<template>
  <div class="col">
    <h2>Set record</h2>
    <form v-on:submit.prevent="addProgram" class="form-group">
      <div class="form-group">
        <label for="formRecordChannel">Channel</label>
        <p v-if="!guideLoaded">Guide is being loaded...</p>
        <select v-else class="form-control" id="formRecordChannel" required v-model="form.channel">
          <option value="" disabled selected>-- Select a channel --</option>
          <option v-for="(channel, index) in channels" v-bind:key="index" :value="channel.name">
            {{ channel.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="formRecordTimeStart">Start</label>
        <input v-model="form.from" required type="text" placeholder="13:37"
          id="formRecordTimeStart" class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="formRecordTimeEnd">End</label>
        <input v-model="form.to" type="text" placeholder="16:20"
          id="formRecordTimeEnd" class="form-control"
        />
      </div>
      <button class="btn btn-primary">Save</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Form',
  data() {
    return {
      form: {},
    };
  },
  computed: {
    ...mapState(['channels', 'guide', 'guideLoaded']),
  },

  methods: {
    addProgram() {
      this.$store.commit(
        'addProgram', {
          form: this.form,
        },
      );
    },
  },
  created() {
    this.$store.dispatch('loadGuide', {
      date: new Date().toISOString().slice(0, 10),
    });
  },
};
</script>

