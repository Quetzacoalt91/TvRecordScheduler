<template>
  <div class="container">
    <div class="flex-row">
      <div class="flex-col text-center">
        <video width="640" height="400" controls>
          <source src="http://raspberrytv.local:3001/stream/8448"
            type="video/mp4"
          >
           Your browser does not support the video tag.
        </video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Watch',
};
</script>
