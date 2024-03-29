import { useCallback, useSyncExternalStore } from 'react';
import type Service from '@ember/service';
import { useEmberService } from './use-ember-service.ts';
import type { PolymorphicIntl } from '../contexts/polymorphic-intl-context';

interface IntlServiceBase extends PolymorphicIntl, Service {
  _ee: {
    on: (eventName: string, callback: unknown, context: unknown) => void;
    off: (eventName: string, callback: unknown, context: unknown) => void;
  };
}

export function useEmberIntl(): PolymorphicIntl {
  const intlService = useEmberService('intl') as unknown as IntlServiceBase;
  const localeManager = useEmberService('locale-manager'); // locale-manager handles importing translations on locale change so have to use it here

  const subscribeToLocaleChange = useCallback(
    (callback: () => void) => {
      // This is an internal property, but we need it to subscribe to locale changes
      intlService._ee.on('localChanged', callback, null);
      return () => {
        // This is an internal property, but we need it to unsubscribe to locale changes
        intlService._ee.off('localChanged', callback, null);
      };
    },
    [intlService],
  );

  const locale = useSyncExternalStore(
    subscribeToLocaleChange,
    () => intlService?.primaryLocale,
  );

  if (!locale) {
    throw new Error('Intl service not available');
  }

  return {
    formatMoney(amount, opts) {
      return intlService.formatMoney(amount, opts);
    },
    primaryLocale: locale,
    locale,
    setLocale(key: string) {
      // @ts-expect-error -- this is caused by the custom global declaration, until ember-intlv6 get merged
      localeManager?.setLocale(key);
    },
    t(key, options) {
      return intlService.t(key, options);
    },
  };
}
