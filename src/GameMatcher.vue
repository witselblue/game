<template>
  <div v-if="currentGame === 'lottery' ">
    <Lottery></Lottery>
  </div>
  <div v-else-if="currentGame === 'minesweeper' ">
    <Minesweeper></Minesweeper>
  </div>
  <div v-else-if="currentGame === 'rockscissorspaper' ">
    <RockScissorsPaper></RockScissorsPaper>
  </div>
</template>

<script>
import Lottery from '../../6-lottery/src/Lottery';
import Minesweeper from './Minesweeper';
import RockScissorsPaper from '../../5-rockscissorspaper/src/RockScissorsPaper';

export default {
  components: {
    Lottery,
    Minesweeper,
    RockScissorsPaper,
  },
  mounted() {
    // router 설정 //options>routes
    console.log(this.$router);
    // 현재 주소 설정 //matched: 현재 일치하는 주소 / params: 주소 가져올 수 있음 / query: 다른 정보 지정 가능(게시판에서 많이 쓰임)
    console.log(this.$route);
  },
  computed: {
    currentGame() {
      return this.$route.params.name;
    }
  }
};
</script>

<style>

</style>
