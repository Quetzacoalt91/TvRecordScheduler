import Vue from 'vue';

const dvbUrl = 'http://raspberrytv.local:3001/records';

export default {
  state: {
    schedule: [],
    channels: {},
    guide: {},
    api: {
      guideLoaded: false,
      guideError: false,
      mumudvbError: false,
    },
  },
  mutations: {
    setGuidePrograms(state, payload) {
      state.guide[payload.date] = payload.programs;
    },
    setSchedule(state, payload) {
      state.schedule = payload.schedule;
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
    loadSchedule({ commit, state }) {
      Vue.http.get(dvbUrl).then((response) => {
        state.api.mumudvbError = false;
        commit('setSchedule', {
          schedule: response.body.current,
        });
      }).catch(() => {
        state.api.mumudvbError = true;
      });
    },
    addProgram({ commit, state }, payload) {
      Vue.http.post(dvbUrl, payload.form).then((response) => {
        if (response.error) {
          state.api.mumudvbError = true;
          return;
        }
        commit('setSchedule', {
          schedule: response.body.current,
        });
      }).catch(() => {
        state.api.mumudvbError = true;
      });
    },
    deleteProgram({ commit, state }, payload) {
      Vue.http.delete(`${dvbUrl}/${payload.index}`).then((response) => {
        if (response.error) {
          state.api.mumudvbError = true;
          return;
        }
        commit('setSchedule', {
          schedule: response.body.current,
        });
      }).catch(() => {
        state.api.mumudvbError = true;
      });
    },
  },
};
