<template>
  <div id="app">
    <div class="header">
      <MineForm></MineForm>
      <div class="timer-box"> {{ timer }} </div>
    </div>
    <TableComponent></TableComponent>
    <div class="result-box"> {{ result }} </div>

    <Modal v-if="this.$store.state.showModal" @close="showModal = false"></Modal>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import store from './store';
import { INCREMENT_TIMER } from './store';
import MineForm from './MineForm';
import TableComponent from './TableComponent';
import Modal from './Modal';

let interval;

export default {
  store,
  components: {
    MineForm,
    TableComponent,
    Modal,
  },
  computed: {
    ...mapState(['timer', 'result', 'halted']),
  },
  methods: {

  },
  watch: {
    // 타이머
    halted(value) {

      if (value === false) {
        interval = setInterval(() => {
          this.$store.commit(INCREMENT_TIMER);
        },1000);
      } else {
        clearInterval(interval);
      }

    },

  }

};
</script>

<style>
*{
  margin:0;
  padding:0;
  box-sizing: border-box;
}
  body{
    background-color:#837E7C;
    font-family: 'Share Tech Mono', monospace;
  }
  .header{
    width:210px;
    display:flex;
    justify-content: space-between;
    align-items: center;
    background-color:#726E6D;
    padding:12px;
    margin:20px auto;
  }
  .mine-form{
    display:inline-block;
    display:flex;
    align-items: center;
  }
  .timer-box{
    width:50px;
    height:30px;
    background-color:#222;
    color:#8C001A;
    font-family: 'Share Tech Mono', monospace;
    line-height:30px;
    font-size:16px;
    text-align:right;

  }
  table{
    margin:auto;
    background-color:#726E6D;
    border-collapse: collapse;
  }
  td{
    width:30px;
    height:30px;
    border:1px solid #837E7C;
    color:#222;
    text-align:center;
    line-height:30px;
    font-size:16px;
  }

  .result-box{
    display:block;
    margin-top:20px;
    text-align:center;
    color:#222;
  }
</style>
