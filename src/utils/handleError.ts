import { ElMessage } from 'element-plus';
import * as Sentry from '@sentry/vue';

export default function (err: any) {
  if (err) {
    Sentry.captureException(err);

    // 后台返回的异常
    if (err.data && err.data.errMsg) {
      ElMessage.error(err.data.errMsg);
      return;
    }

    // 先输出到控制台
    console.warn(err);
  }
}
