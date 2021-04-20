import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

import Lottery from '../../6-lottery/src/Lottery';
import Minesweeper from '../../8-minesweeper/src/Minesweeper';
import RockScissorsPaper from '../../5-rockscissorspaper/src/RockScissorsPaper';

import GameMatcher from './GameMatcher'

Vue.use(VueRouter);
Vue.use(Vuex);


export default new VueRouter({
  mode: 'history', // 안 쓰면 hash router가 기본
  routes: [
    // path: 원하는 주소, 화면에 표시될 컴포넌트
    { path: '/lottery', component: Lottery },
    { path: '/minesweeper', component: Minesweeper },
    { path: '/rockscissorspaper', component: RockScissorsPaper },
    // 동적 라우트 매칭
    { path: '/game/:name', component: GameMatcher }
  ],

});
