import { Message } from 'element-ui';

export default function(err) {
  if (err) {
    // 后台返回的异常
    if (err.data && err.data.errMsg) {
      Message.error(err.data.errMsg);
      return;
    }

    // 先输出到控制台
    console.warn(err);
  }
}
