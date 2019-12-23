import sentry from '@/utils/sentry'
import { Message } from 'element-ui'

export default function(err, vm, info) {
  if (err) {
    sentry.captureException(err)
    
    // 后台返回的异常
    if (err.data && err.data.errMsg) {
      Message.error(err.data.errMsg)
      return;
    } 
    
    // 其他异常，暂时先输出到控制台
    console.log(err)
  }
}
