import Vue from 'vue';

export default {
  state: {
    schedule: [
      {
        channel: 'BBC One',
        from: 1538820000000,
        duration: '60',
      },
      {
        channel: 'E4',
        from: 1539165600000,
        duration: '85',
      },
    ],
    channels: {},
    guide: {},
    api: {
      guideLoaded: false,
      guideError: false,
    },
  },
  mutations: {
    addProgram(state, payload) {
      state.schedule.push(Object.assign({}, payload.form));
    },
    deleteProgram(state, payload) {
      state.schedule.splice(payload.index, 1);
    },
    setGuidePrograms(state, payload) {
      state.guide[payload.date] = payload.programs;
    },
    updateChannels(state, payload) {
      payload.channels.forEach((channel) => {
        state.channels = Object.assign(state.channels, { [channel.number]: channel });
      });
      state.api.guideLoaded = true;
    },
  },
  actions: {
    loadGuide({ commit, state }, payload) {
      // If guide existing, no need to go further
      if (state.guide[payload.date] !== undefined) {
        state.api.guideLoaded = true;
        return;
      }
      state.api.guideLoaded = false;
      const url = `http://localhost:3000/https://awsbrain.freeview.co.uk/programmes/london?date=${payload.date}`;
      Vue.http.get(url).then((response) => {
        commit('setGuidePrograms', {
          date: payload.date,
          programs: response.body.listings,
        });
        commit('updateChannels', {
          channels: response.body.listings,
        });
      }).catch(() => {
        state.api.guideError = true;
      });
    },
  },
};
