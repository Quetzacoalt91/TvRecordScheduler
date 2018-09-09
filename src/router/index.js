import Vue from 'vue';
import Router from 'vue-router';
import PlannedList from '@/components/PlannedList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PlannedList',
      component: PlannedList,
    },
  ],
});
