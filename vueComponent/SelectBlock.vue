<template>
  <el-autocomplete
    v-model="state"
    :fetch-suggestions="querySearchAsync"
    :placeholder="'输入查询，选择确认'"
    :teleported="teleported === undefined ? true : teleported"
    @select="handleSelect"
    popper-class="protyle-hint b3-list b3-list--background block-autocomplete"
    :disabled="selected"
    value-key="contentCleared"
  >
    <template #default="{ item }">
      <SearchRefBlockItem :item="item" />
    </template>
  </el-autocomplete>
  <el-button
    :icon="RefreshLeft"
    type="info"
    circle
    @click="
      () => {
        selected = false;
        state = '';
      }
    "
  />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { RefreshLeft } from "@element-plus/icons-vue";

import SearchRefBlockItem from "./SearchRefBlockItem.vue";
import {
  fullTextSearchBlock,
  ESearchMethod,
  ISearchTypes,
  ESearchGroupBy,
  ESearchOrderBy,
} from "../siyuan-api/search";
import { requestQuerySQL } from "../siyuan-api/query";
import { Block, BlockTree } from "../types/siyuan-api";
import { BlockTypes, block2blockTree } from "../siyuan-api/common";
const props = defineProps<{
  searchTypes?: ISearchTypes;
  teleported?: boolean; //是否将 popover 的下拉列表插入至 body 元素
  width?: string;
}>();

/**
 * 可以在父组件中显示的文本
 */
const state = defineModel("state");
const selected = ref(false);
const emit = defineEmits<{
  (e: "update", block: BlockAC): void;
}>();
//const tagsRef = ref([]);
let blocks: BlockAC[] = [];

export type BlockAC = BlockTree & {
  value: string;
  contentCleared: string;
};

/**
 * @description 由于autocomplete组件的原因，返回值必须含有value字段
 */
const querySearchAsync = async (
  queryString: string,
  cb: (arg: any) => void
) => {
  blocks = []; //清空返回结果
  let types: ISearchTypes = Object.assign(
    {
      blockquote: false,
      codeBlock: false,
      document: true,
      embedBlock: false,
      heading: true,
      htmlBlock: false,
      list: false,
      listItem: false,
      mathBlock: false,
      paragraph: true,
      superBlock: false,
      table: false,
    },
    props.searchTypes
  );
  //处理直接粘贴的标题
  let headReg = /#{1,6} /;
  if (queryString.search(headReg) === 0) {
    queryString = queryString.replace(headReg, "");
    for (let key of Object.keys(types)) {
      types[key] = false;
    }
    types.heading = true;
  }
  if (!queryString) {
    //空查询返回最近更新的块
    let typeLimit = Object.keys(types).reduce((pre, cur) => {
      let obj = BlockTypes.find((obj) => {
        return obj.search === cur;
      });
      if (types[cur]) {
        return pre + `${pre ? "OR" : ""} type = '${obj.sql}'`;
      } else {
        return pre;
      }
    }, "");

    const res = (await requestQuerySQL(
      `SELECT * FROM blocks WHERE ${typeLimit} 
      ORDER BY updated DESC LIMIT 10`
    )) as Block[];
    blocks = res.map((e) => {
      return { ...block2blockTree(e), contentCleared: e.content, value: e.id };
    });
  } else {
    const res = await fullTextSearchBlock(
      queryString,
      ESearchMethod.keyword,
      types,
      [],
      ESearchOrderBy.类型,
      ESearchGroupBy.不分组
    );
    const sortSubTypeList = ["h1", "h2", "h3", "h4", "h5", "h6"];
    const sortFun = (e: string) => {
      return sortSubTypeList.indexOf(e) < 0
        ? sortSubTypeList.length + 1
        : sortSubTypeList.indexOf(e);
    };
    res.blocks.sort((a, b) => {
      return sortFun(a.subType) - sortFun(b.subType);
    });
    blocks = res.blocks.map((block) => {
      return {
        ...block,
        value: block.id,
        contentCleared: block.content.replace(/<mark>(.*?)<\/mark>/, "$1"),
      };
    });
  }
  cb(blocks);
};

const handleSelect = (item: BlockAC) => {
  emit("update", item);
  selected.value = true;
};
</script>

<style>
.block-autocomplete.b3-list.protyle-hint.el-popper {
  width: 50% !important; /**todo 计算方式 */
}
</style>
