import { ElMessage } from 'element-plus';
import * as Sentry from '@sentry/vue';

export default function (err: any) {
  if (err) {
    if (process.env.NODE_ENV === 'production') {
      Sentry.captureException(err);
    }

    // 后台返回的异常
    if (err.message) {
      ElMessage.error(err.message);
    }

    // 先输出到控制台
    console.warn(err);
  }
}
