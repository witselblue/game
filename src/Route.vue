<template>
  <div id="app">

    <div id="nav">
      <!-- router-link: a tag로 바뀜 -->
      <router-link to="/game/lottery"> Lottery </router-link>
      <router-link to="/game/minesweeper"> Minesweeper </router-link>
      <router-link to="/game/rockscissorspaper"> RockScissorsPaper </router-link>
    </div>

    <!-- router-view: 주소에 따라 바뀐 화면이 나올 부분 -->
    <router-view></router-view>

  </div>
</template>

<script>
import router from './Routes';

export default {
  router,

};
</script>

<style>
body{
  background-color:#837E7C;
}
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}
</style>

<style scoped>
#nav{
  height:60px;
  width:100%;
  display:flex;
  align-items: center;
  justify-content: center;
  background-color: #837E7C;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.5);
  position:fixed;
  top:0;
}
a{
  text-decoration:none;
  margin:4px;
  color:#222;
}

#app{
  margin-top:90px;
}
</style>
