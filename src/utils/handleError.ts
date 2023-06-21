import { ElMessage } from 'element-plus'

export default function (err: any) {
  if (err) {
    // 后台返回的异常
    if (err.data && err.data.errMsg) {
      ElMessage.error(err.data.errMsg)
      return
    }

    // 先输出到控制台
    console.warn(err)
  }
}
