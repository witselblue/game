<template>
  <div class="mine-form">
    <input class="mine-input" type="number" placeholder="세로" :value="row" @change="onChangeRow">
    <input class="mine-input" type="number" placeholder="가로" :value="cell" @change="onChangeCell">
    <input class="mine-input" type="number" placeholder="지뢰" :value="mine" @change="onChangeMine">
    <button class="mine-btn" @click="onClickBtn"> start </button>
  </div>
</template>


<script>
import { START_GAME } from './store';

export default{
  // 이 컴포넌트에서만 쓰는 지역적 데이터
  data(){
    return {
      row: '7',
      cell: '7',
      mine: '5',
    }
  },
  methods: {
    onChangeRow(e){
      this.row = e.target.value;
    },
    onChangeCell(e){
      this.cell = e.target.value;
    },
    onChangeMine(e){
      this.mine = e.target.value;
    },
    // vuex로 보내기
    onClickBtn(){
      this.$store.commit(START_GAME, { row:this.row, cell:this.cell, mine:this.mine });
    }
  },
}
</script>


<style>
.mine-input{
  width:30px;
  height:30px;
  margin-right:2px;
  /* background-color:#666362; */
  background-color:#222;
  color:green;
  font-size:16px;
  font-family: 'Share Tech Mono', monospace;
  text-align:right;
  border:none;
}
.mine-btn{
  width:35px;
  height:35px;
  border-radius:50%;
  border:none;
  background-color:#ffcc66;
  border:2px solid #222;
  color:#222;
  margin-left:2px;
  cursor:pointer;
}
.mine-btn:hover{
  background-color:	#CC9933;
}
</style>
