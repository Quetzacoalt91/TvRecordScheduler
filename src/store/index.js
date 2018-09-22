import Vue from 'vue';

export default {
  state: {
    schedule: [
      {
        channel: 'BBC One',
        from: '15:00',
        to: '16:30',
      },
      {
        channel: 'E4',
        from: '20:02',
        to: '17:00',
      },
    ],
    channels: {},
    guide: {},
    guideLoaded: false,
  },
  mutations: {
    addProgram(state, payload) {
      state.schedule.push(payload.form);
    },
    deleteProgram(state, payload) {
      state.schedule.splice(payload.index, 1);
    },
    setGuidePrograms(state, payload) {
      state.guide[payload.date] = payload.programs;
    },
    updateChannels(state, payload) {
      payload.channels.forEach((channel) => {
        state.channels = Object.assign(state.channels, { [channel.id]: channel });
      });
      state.guideLoaded = true;
    },
  },
  actions: {
    loadGuide({ commit }, payload) {
      const url = `http://localhost:3000/https://awsbrain.freeview.co.uk/programmes/london?date=${payload.date}`;
      Vue.http.get(url).then((response) => {
        commit('setGuidePrograms', {
          date: payload.date,
          programs: response.body.listings,
        });
        commit('updateChannels', {
          channels: response.body.listings,
        });
      }).catch((response) => {
        console.error(`Cannot retrieve data from ${url}`, response);
      });
    },
  },
};
