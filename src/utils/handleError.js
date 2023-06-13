import sentry from '@/utils/sentry';

export default function(err) {
  if (err) {
    sentry.captureException(err);

    // 先输出到控制台
    console.log(err);
  }
}
