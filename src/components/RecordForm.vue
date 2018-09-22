<template>
  <div class="col">
    <h2>Set record</h2>
    <form v-on:submit.prevent="addProgram" class="form-group">
      <div class="form-group">
        <label for="formRecordChannel">Date</label>
        <select class="form-control" v-model="form.date" @change="getShows()">
          <option v-for="(date, index) in dates" v-bind:key="index"
            :value="date" :class="{ 'selected': index === 0 }"
          >
            {{ date }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="formRecordChannel">Channel</label>
        <p v-if="!guideLoaded">Guide is being loaded...</p>
        <select v-else class="form-control" id="formRecordChannel" required
          v-model="form.channel"
        >
          <option value="" disabled selected>-- Select a channel --</option>
          <option v-for="(channel, index) in channels" v-bind:key="index"
            :value="channel.number"
          >
            {{ channel.name }}
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="formRecordTimeStart">Manual configuration</label>
        <input type="checkbox" v-model="manualMode" />
      </div>
      <div v-if="!manualMode && guideLoaded" class="form-group">
        <label for="formRecordTimeStart">Program</label>
        <select class="form-control">
          <option v-for="(show, index) in shows" v-bind:key="index">
             {{ show.startTime }} - {{ show.title }}
          </option>
        </select>
      </div>
      <div v-if="manualMode" class="form-group">
        <label for="formRecordTimeStart">Start</label>
        <input v-model="form.from" required type="text" placeholder="13:37"
          id="formRecordTimeStart" class="form-control"
        />
      </div>
      <div v-if="manualMode" class="form-group">
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
      form: {
        date: new Date().toISOString().slice(0, 10),
        channel: 0,
      },
      manualMode: false,
      dates: [],
    };
  },
  computed: {
    shows() {
      console.log(`Finding shows for ${this.form.channel} at ${this.form.date}`);
      const channels = this.$store.state.guide[this.form.date] || [];
      const length = channels.length;
      let i;
      for (i = 0; i < length; i += 1) {
        const channel = channels[i];
        if (this.form.channel === channel.number) {
          console.log(channel.shows);
          return channel.shows;
        }
      }
      return [];
    },
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
    /**
     * Loads the next 7 dates from today
     */
    getWeekDays() {
      const addDays = (previousDate, days) => {
        const date = new Date(previousDate.valueOf());
        date.setDate(date.getDate() + days);
        return date;
      };

      const dateArray = [];
      const startDate = new Date();
      let currentDate = startDate;
      while (currentDate.getDate() <= startDate.getDate() + 7) {
        dateArray.push(new Date(currentDate).toISOString().substr(0, 10));
        currentDate = addDays(currentDate, 1);
      }
      this.dates = dateArray;
    },
    getShows() {
      this.$store.dispatch('loadGuide', {
        date: this.form.date,
      });
    },
  },
  created() {
    this.getShows();
    this.getWeekDays();
  },
};
</script>

