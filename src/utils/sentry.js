import Vue from 'vue';
import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';

// https://sentry.io/organizations/lishuxue/issues/?project=1508750
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: 'https://0668ca599951485d95b38caf784f0ffe@sentry.io/1508750',
    environment: 'prod',
    release: process.env.SENTRY_RELEASE_VERSION,
    integrations: [
      new Integrations.Vue({
        Vue,
        attachProps: true
      })
    ],
    // don't show the click event in sentry console
    beforeBreadcrumb(breadcrumb) {
      return breadcrumb.category === 'ui.click' ? null : breadcrumb;
    }
  });
}

const setUserContext = context => {
  Sentry.configureScope(scope => {
    scope.setUser(context);
  });
};

const setTagContext = (key, value) => {
  Sentry.configureScope(scope => {
    scope.setTag(key, value);
  });
};

const setExtraContext = (key, obj) => {
  Sentry.configureScope(scope => {
    scope.setExtra(key, obj);
  });
};

const addBreadcrumb = (message, data, category, level) => {
  Sentry.addBreadcrumb({
    message,
    data,
    category: category || 'breadcrumb',
    level: level || 'info'
  });
};

const captureException = error => {
  error && Sentry.captureException(error);
};

const captureMessage = msg => {
  msg && Sentry.captureMessage(msg);
};

export default {
  setUserContext,
  setTagContext,
  setExtraContext,
  addBreadcrumb,
  captureException,
  captureMessage
};
