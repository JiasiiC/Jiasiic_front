<template>
  <div
    class="relative"
    ref="containerTarget"
    :style="{ height: containerHeight + 'px' }"
  >
    <!-- 数据渲染 -->
    <template v-if="columnWidth && data.length">
      <div
        v-for="(item, index) in data"
        :key="nodeKey ? item[nodeKey] : index"
        class="m-waterfall-item absolute duration-300"
        :style="{
          width: columnWidth + 'px',
          left: item._style?.left + 'px',
          top: item._style?.top + 'px'
        }"
      >
        <slot :item="item" :width="columnWidth" :index="index"></slot>
      </div>
    </template>
  </div>
</template>
<script setup>
const props = defineProps({
  // 数据源
  data: {
    type: Object,
    required: true
  },
  // 唯一标识
  nodeKey: {
    type: String
  },
  // 列数
  column: {
    type: Number,
    default: 2
  },
  // 列间距
  columuSpacing: {
    default: 20,
    type: Number
  },
  // 行间距
  rowSpacing: {
    default: 20,
    type: Number
  },
  // 预加载
  picturePreReading: {
    type: Boolean,
    default: true
  }
})
import { ref, onMounted, computed, nextTick, watch, onUnmounted } from 'vue'
import {
  getImgElement,
  getAllImg,
  onComplateImgs,
  getMinHeightColumn,
  getMinHeight,
  getMaxHeight
} from './utils'
// 容器总高度
const containerHeight = ref(0)
// 记录每列高度的容器 key所在列 val高度
const columnHeightObj = ref({})
// 记录各列高度
const useColumnHeightObj = () => {
  columnHeightObj.value = {}
  for (let i = 0; i < props.column; i++) {
    columnHeightObj.value[i] = 0
  }
}
// 容器实例
const containerTarget = ref(null)
// 容器总宽（不包含padding,margin,border）
const containerWidth = ref(0)
// 容器左边距
const containerLeft = ref(0)
/**
 * 计算容器宽度
 */
const useContainerWidth = () => {
  // 获取左右内边距
  const { paddingLeft, paddingRight } = getComputedStyle(
    containerTarget.value,
    null
  )
  containerLeft.value = containerLeft.value
  // 总宽度需要减去内边距
  containerWidth.value =
    containerTarget.value.clientWidth -
    parseFloat(paddingLeft) -
    parseFloat(paddingRight)
}
// 列宽
const columnWidth = ref(0)
// 列间距合计
const columnSpacingTotal = computed(() => {
  return (props.column - 1) * props.columuSpacing
})
/**
 * 计算列宽
 */
const useColumnWidth = () => {
  useContainerWidth()
  columnWidth.value =
    (containerWidth.value - columnSpacingTotal.value) / props.column
}
onMounted(() => {
  useColumnWidth()
})

// item高度集合
let itemHeights = []
/**
 * 需要预加载，监听图片加载完成
 */
const waitImgComplate = () => {
  itemHeights = []
  // 拿到所有元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]
  //  获取所有元素的img标签
  const imgElements = getImgElement(itemElements)
  //  获取所有img标签的图片
  const allImgs = getAllImg(imgElements)
  onComplateImgs(allImgs).then(() => {
    // 图片加载完成，获取高度
    itemElements.forEach((item) => {
      itemHeights.push(item.offsetHeight)
    })
    // 渲染位置
    useItemLocation()
  })
}

/**
 * 图片不需要预加载，计算item高度
 */
const useItemHeight = () => {
  itemHeights = []
  // 拿到所有元素
  let itemElements = [...document.getElementsByClassName('m-waterfall-item')]

  // 计算item高度
  itemElements.forEach((item) => {
    itemHeights.push(item.offsetHeight)
  })
  useItemLocation()
}
watch(
  () => props.data,
  (val) => {
    //第一次获取数据时，构建高度记录容器

    const resetColumnHeight = val.every((item) => !item._style)
    if (resetColumnHeight) {
      useColumnHeightObj()
    }
    nextTick(() => {
      if (props.picturePreReading) {
        waitImgComplate()
      } else {
        useItemHeight()
      }
    })
  },
  {
    deep: true,
    immediate: true
  }
)
/**
 * 为每个item生成位置属性
 */
const useItemLocation = () => {
  // 遍历数据源
  props.data.forEach((item, index) => {
    // 避免重复计算
    if (item._style) {
      return
    }
    // 生成——style属性
    item._style = {}
    // left
    item._style.left = getItemLeft()
    // top
    item._style.top = getItemTop()
    // 指定列高度自增
    increasingHeight(index)
  })
  // 指定容器高度
  containerHeight.value = getMaxHeight(columnHeightObj.value)
}
/**
 * 下一个item的left
 */
const getItemLeft = () => {
  const column = getMinHeightColumn(columnHeightObj.value)
  return (
    column * (columnWidth.value + props.columuSpacing) + containerLeft.value
  )
}
/**
 * 下一个item的top
 */
const getItemTop = () => {
  return getMinHeight(columnHeightObj.value)
}
/**
 * 指定列自增
 */
const increasingHeight = (index) => {
  // 最小高度所在列
  const minHeightColumn = getMinHeightColumn(columnHeightObj.value)
  // 该列高度自增
  columnHeightObj.value[minHeightColumn] +=
    itemHeights[index] + props.rowSpacing
}
onUnmounted(() => {
  props.data.forEach((item) => {
    delete item._style
  })
})
//监听列数变化
watch(
  () => props.column,
  () => {
    columnWidth.value = 0
    reset()
  }
)
// 重新构建瀑布流
const reset = () => {
  // 需要延迟构建，因为可能会获取到在缩放过程中的宽度，不准确
  setTimeout(() => {
    useColumnWidth()
    props.data.forEach((item) => {
      item._style = null
    })
  }, 400)
}
</script>
<style lang="scss" scoped></style>
