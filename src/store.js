import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0,
}

// 지뢰 심기
const plantMine = (row, cell, mine) => {
  console.log(1, row, cell, mine);
  const candidate = Array(row * cell).fill().map((arr, i) => {
    return i;
  });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
console.log(2, row, cell, mine);

  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }
console.log(3, row, cell, mine);
  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data);
  return data;
};


export default new Vuex.Store({
  state: {
    tableData: [],
    data: {
      row: 0,
      cell: 0,
      mine: 0,
    },
    timer: 0,
    halted: true,
    result: '',
    openedCount: 0,
    showModal: false,
  },
  getters: {

  },
  mutations: {
    [START_GAME](state, { row, cell, mine } ){
      state.data = {
        row,
        cell,
        mine,
      };
      // state.data.row = row;
      // // Vue.set(objet, key, value) : 중첩된 객체(e.g. 배열)에 반응성 속성 추가 가능
      // Vue.set(state.data, 'row', row);

      // 게임 다시 시작 시 리셋
      state.tableData = plantMine(row, cell, mine);
      state.timer = 0;
      state.halted = false;
      state.openedCount = 0;
      state.result = '';
      state.showModal = false;
    },
    [OPEN_CELL](state, { row, cell }){
      let openedCount = 0; // 승리조건 검색
      const checked = [];

      // 주변 8칸 지뢰인지 검색
      function checkAround(row, cell){

        // 주변칸 undefined -> 검사 x
        const checkRowOrCellUndefined = row < 0 || row >= state.tableData.length || cell < 0 || cell >= state.tableData[0].length;
        if (checkRowOrCellUndefined) {
          return;
        }
        // 주변칸 지뢰, 이미 열었거나 -> 검사 x
        if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(state.tableData[row][cell])) {
          return;
        }
        // 한번 체크한 칸 다시 열지 않기 (stack overflow 막음)
        if (checked.includes(row + '/' + cell)) { // 한번 연 칸이면 -> 검사 x
          return;
        } else { // 열지 않은 칸이면 -> checked에서 검사
          checked.push(row + '/' + cell);
        }

        // 주변
        let around = [];
        if (state.tableData[row - 1]) {
          around = around.concat([
            state.tableData[row - 1][cell - 1], state.tableData[row - 1][cell], state.tableData[row - 1][cell + 1]
          ]);
        }

        around = around.concat([
          state.tableData[row][cell - 1], state.tableData[row][cell + 1]
        ]);

        if (state.tableData[row + 1]) {
          around = around.concat([
            state.tableData[row + 1][cell - 1], state.tableData[row + 1][cell], state.tableData[row + 1][cell + 1]
          ]);
        }

        // 주변에 지뢰가 있는지
        const counted = around.filter( function(v) {
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
        });

        // return counted.length;

        // 주변 칸 연쇄 열기
        if (counted.length === 0 && row > -1){
          const near = [];
          if (row - 1 > -1) {
            near.push([row - 1, cell -1]);
            near.push([row - 1, cell]);
            near.push([row - 1, cell + 1]);
          }
          near.push([row, cell - 1]);
          near.push([row, cell + 1]);
          if (row + 1 < state.tableData.length) {
            near.push([row + 1, cell - 1]);
            near.push([row + 1, cell]);
            near.push([row + 1, cell + 1]);
          }
          near.forEach((n) => { // 주변 8칸이 열려있지 않으면
            if (state.tableData[n[0]][n[1]] !== CODE.OPENED) {
              // 재귀함수 : 자기자신이 자기 자신을 호출하는 함수 (반복문같은 역할)
              checkAround(n[0], n[1]);
            }
          });
        }

        // 현재 칸이 빈칸이면
        if (state.tableData[row][cell] === CODE.NORMAL){
          openedCount += 1;
        }

        // 주변칸 지뢰 갯수 화면 표시
        Vue.set(state.tableData[row], cell, counted.length);
      }

      // const count = checkAround();
      // // 지뢰 갯수 화면 표시
      // Vue.set(state.tableData[row], cell, count);

      // checkAround가 재귀함수여서 처음에 불러주지 않으면 시작 x
      checkAround(row, cell);


      // 누적된 연 칸의 개수 + 마지막 클릭해서 연 칸의 개수가 같으면 승리
      let halted = false;
      let result = '';
      if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) {
        halted = true;
        result = `${state.timer}초만에 승리하셨습니다.`;
      }
      // 최종 데이터 vued store에 저장
      state.openedCount += openedCount;
      state.halted = halted;
      state.result = result;

    },
    [CLICK_MINE](state, { row, cell }) {
      state.halted = true;
      Vue.set(state.tableData[row], cell, CODE.CLICKED_MINE);
      // alert('꽝 ^____^');
      state.showModal = true;
    },
    [FLAG_CELL](state, { row, cell }) {
      if (state.tableData[row][cell] === CODE.MINE) { // 지뢰 -> 깃발
        Vue.set(state.tableData[row], cell, CODE.FLAG_MINE);
      } else { // 빈칸 -> 깃발
        Vue.set(state.tableData[row], cell, CODE.FLAG);
      }
    },
    [QUESTION_CELL](state, { row, cell }) {
      if (state.tableData[row][cell] === CODE.FLAG_MINE) { // 지뢰 -> 물음표
        Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE);
      } else { // 빈칸 -> 물음표
        Vue.set(state.tableData[row], cell, CODE.QUESTION);
      }
    },
    [NORMALIZE_CELL](state, { row, cell }) {
      if (state.tableData[row][cell] === CODE.QUESTION_MINE) { // 물음표 -> 지뢰
        Vue.set(state.tableData[row], cell, CODE.MINE);
      } else { // 물음표 -> 빈칸
        Vue.set(state.tableData[row], cell, CODE.NORMAL);
      }
    },
    [INCREMENT_TIMER](state) {
      state.timer += 1;
    },

  },
});
