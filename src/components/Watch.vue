<template>
  <div class="container">
    <h2>Recorded shows</h2>
    <div class="row">
      <ul>
        <li v-for="(show, index) in recordedShows"
          v-bind:key="index"
          v-on:click="url = streamBaseUrl + index"
        >
          {{show}}
        </li>
      </ul>
    </div>
    <h2>Watch live</h2>
    <div v-if="url" class="flex-col flex-col-6 text-center">
      <div class="alert alert-info">
        Open your video player and open this link:<br/>
        <code>{{ url }}</code>
      </div>
    </div>
    <div class="row">
      <a v-for="(channel, index) in dvbChannels"
        v-bind:key="index"
        class="col-3 btn channel"
        v-on:click="url = streamBaseUrl + index"
      >
        {{channel.name}}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Watch',
  data() {
    return {
      url: null,
    };
  },
  computed: {
    recordedShows() {
      return this.$store.state.records;
    },
    dvbChannels() {
      return this.$store.state.dvb.channels;
    },
    streamBaseUrl() {
      return this.$store.state.links.stream;
    },
  },
  created() {
    this.$store.dispatch('updateDvbStatus');
    this.$store.dispatch('loadSchedule');
  },
};
</script>

<style>
.channel {
  border: 1px solid black;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}
</style>
