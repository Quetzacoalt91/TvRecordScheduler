<template>
  <div class="container">
    <div class="flex-row">
      <div class="flex-col text-center">
        <p class="emoji">🍿</p>

        <p class="h2">
          Get Started!
        </p>

        <a class="btn btn-primary" href="http://raspberrytv.local:3001/playlist">Download playlist (.m3u)</a>
        <br/>
        or
        <br/>
        <a class="btn btn-primary" href="#/watch">Watch live</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style>
.emoji {
  font-size: 150px;
}
</style>
