<template>
  <div
    class="flex flex-col items-center bg-white dark:bg-zinc-900 h-[78vh] rounded-lg"
  >
    <m-svg-icon
      v-if="isMobileTerminal"
      name="close"
      class="w-4 h-4 ml-auto mb-1 pt-2"
      @click="close"
      fillClass="fill-zinc-900 dark:fill-zinc-200"
    ></m-svg-icon>
    <img :src="blob" class="mt-2" ref="imageTarget" />
    <m-button
      type="main"
      class="mt-4 mb-2 w-[80%] xl:w-1/2 dark:bg-zinc-800 dark:hover:bg-zinc-600"
      @click="onConfirmClick"
      :loading="loading"
      >确定</m-button
    >
  </div>
</template>
<script>
// 移动端配置对象
const mobileOptions = {
  // 将裁剪框限制在画布的大小
  viewMode: 1,
  // 移动画布，裁剪框不动
  dragMode: 'move',
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1,
  // 裁剪框不可移动
  cropBoxMovable: false,
  // 不可调整裁剪框大小
  cropBoxResizable: false
}

// PC 端配置对象
const pcOptions = {
  // 裁剪框固定纵横比：1:1
  aspectRatio: 1
}
</script>
<script setup>
// 图片裁剪
import { getOSSClient } from '@/utils/sts'
import { message } from '@/libs'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { ref, onMounted } from 'vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useStore } from 'vuex'
import { changeProfile } from '@/api/sys'
const props = defineProps({
  blob: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['close'])
const close = () => {
  emits('close')
}
// 图片实例
const imageTarget = ref()
let cropper
onMounted(() => {
  cropper = new Cropper(
    imageTarget.value,
    isMobileTerminal.value ? mobileOptions : pcOptions
  )
})
const loading = ref(false)
// 确定按钮点击事件
const onConfirmClick = (avatar) => {
  loading.value = true
  cropper.getCroppedCanvas().toBlob((blob) => {
    // 裁剪后的图片
    putObjectToOSS(blob)
  })
}
/**
 * 进行 OSS 上传
 */
let ossClient = null
let store = useStore()
const putObjectToOSS = async (file) => {
  if (!ossClient) {
    ossClient = await getOSSClient()
  }
  try {
    // 因为当前凭证只具备 images 文件夹下的访问权限，所以图片需要上传到 images/xxx.xx 。否则你将得到一个 《AccessDeniedError: You have no right to access this object because of bucket acl.》 的错误
    const fileTypeArr = file.type.split('/')
    const fileName = `${store.getters.userInfo.username}/${Date.now()}.${
      fileTypeArr[fileTypeArr.length - 1]
    }`
    // 文件存放路径，文件
    const res = await ossClient.put(`images/${fileName}`, file)
    onChangeProfile(res.url)
    // TODO：图片上传成功
  } catch (e) {
    message('error', e)
  }
}
// 上传头像到服务器
const onChangeProfile = async (avatar) => {
  // 更新本地数据
  store.commit('user/setUserInfo', {
    ...store.getters.userInfo,
    avatar
  })
  // 更新服务器
  await changeProfile(store.getters.userInfo)
  message('success', '头像修改成功')
  loading.value = false
  close()
}
</script>
<style lang="scss" scoped></style>
