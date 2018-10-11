<template>
  <div class="container">
    <div class="row">
      <PlannedList />
      <RecordForm />
    </div>
  </div>
</template>

<script>
import PlannedList from './PlannedList';
import RecordForm from './RecordForm';

export default {
  name: 'Schedule',
  components: {
    PlannedList,
    RecordForm,
  },
};
</script>
