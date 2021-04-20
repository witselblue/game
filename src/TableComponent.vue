<template>
  <table>
    <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
      <td
        v-for="(cellData, cellIndex) in rowData" :key="cellIndex"
        :style="cellDataStyle(rowIndex, cellIndex)"
        @click="onClickTd(rowIndex, cellIndex)"
        @contextmenu.prevent="onRightClickTd(rowIndex, cellIndex)"
      >
        <!-- contextmenu : 브라우저 오른쪽 클릭 시 나타나는 창 -->
          {{ cellDataText(rowIndex, cellIndex) }}
      </td>
    </tr>
  </table>
</template>


<script>
import { mapState } from 'vuex';
import { CODE } from './store';
import { OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './store';

export default{
  computed: {
    ...mapState(['tableData', 'halted']),

    cellDataStyle() {
      return (row, cell) => {
        switch (this.$store.state.tableData[row][cell]) {
          case CODE.NORMAL:
          case CODE.MINE:
            return {
              background: '#666362'
            };
          case CODE.CLICK_MINE:
          case CODE.OPENED:
            return {
              background: '#726E6D'
            };
          case CODE.FLAG:
          case CODE.FLAG_MINE:
            return {
              color: '#BCC6CC',
            };
          case CODE.QUESTION:
          case CODE.QUESTION_MINE:
            return {
              color: '#FF9999',
            };
          default:
            // cell 데이터 갯수 (주변지뢰 개수)
            return {};
        }
      };
    },
    cellDataText() {
      return (row, cell) => {
        switch (this.$store.state.tableData[row][cell]) {
          case CODE.MINE:
            return '';
          case CODE.NORMAL:
            return '';
          case CODE.FLAG_MINE:
          case CODE.FLAG:
            return '⚑';
          case CODE.QUESTION_MINE:
          case CODE.QUESTION:
            return '⚑';
          case CODE.CLICKED_MINE:
            return '☢';
          default:
            return this.$store.state.tableData[row][cell] || '';
        }
      };
    },

  },
  methods: {
    // 칸 클릭 시 open cell
    onClickTd(row, cell){
      if (this.halted) { // 게임 중단됐을 때 칸 클릭 x
        return;
      }
      switch (this.tableData[row][cell]) {
        case CODE.NORMAL:
          return this.$store.commit(OPEN_CELL, { row, cell });
        case CODE.MINE:
          return this.$store.commit(CLICK_MINE, { row, cell });
        default:
          return;
      }

    },
    onRightClickTd(row, cell) {
      if (this.halted) {
        return;
      }
      switch (this.tableData[row][cell]) {
        case CODE.NORMAL:
        case CODE.MINE:
          this.$store.commit(FLAG_CELL, { row, cell });
          return;
        case CODE.FLAG_MINE:
        case CODE.FLAG:
          this.$store.commit(QUESTION_CELL, { row, cell });
          return;
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
          this.$store.commit(NORMALIZE_CELL, { row, cell });
          return;
        default:
          return;
      }
    }


  },

};
</script>


<style scoped>
</style>
