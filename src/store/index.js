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
  },
  mutations: {
    addProgram(state, payload) {
      state.schedule.push(payload.form);
    },
    deleteProgram(state, payload) {
      state.schedule.splice(payload.index, 1);
    },
  },
};
