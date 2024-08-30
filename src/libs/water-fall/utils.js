// 获取所有img标签
export const getImgElement = (itemElements) => {
  const imgElements = []
  itemElements.forEach((el) => {
    imgElements.push(...el.getElementsByTagName('img'))
  })
  return imgElements
}
// 生成所有图片链接的数组
export const getAllImg = (imgElements) => {
  return imgElements.map((item) => item.src)
}
// 监听图片数组加载完成
export const onComplateImgs = (imgs) => {
  // promise集合
  const promiseAll = []
  // 循环构建promise
  imgs.forEach((item, index) => {
    promiseAll[index] = new Promise((resolve, reject) => {
      const imageObj = new Image()
      imageObj.src = item
      imageObj.onload = () => {
        resolve({
          item,
          index
        })
      }
    })
  })
  return Promise.all(promiseAll)
}

/**
 * 返回列高对象中的最小高度所在的列
 */
export const getMinHeightColumn = (columnHeightObj) => {
  const minHeight = getMinHeight(columnHeightObj)
  return Object.keys(columnHeightObj).find((key) => {
    return columnHeightObj[key] === minHeight
  })
}
export const getMinHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.min(...columnHeightArr)
}
/**
 * 返回列高对象中的最大的高度
 */
export const getMaxHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.max(...columnHeightArr)
}
