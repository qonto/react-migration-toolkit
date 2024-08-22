import { useCallback, useSyncExternalStore } from 'react';
import type Service from '@ember/service';
import { useEmberService } from '../use-ember-service';
import type { PolymorphicIntl } from '../../contexts/polymorphic-intl-context';

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
      intlService._ee.on('localeChanged', callback, null);
      return () => {
        // This is an internal property, but we need it to unsubscribe to locale changes
        intlService._ee.off('localeChanged', callback, null);
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
    primaryLocale: locale,
    locale,
    t(key, options) {
      return intlService.t(key, options);
    },
    setLocale(key: string) {
      // @ts-expect-error -- this is caused by the custom global declaration, until ember-intlv6 get merged
      localeManager?.setLocale(key);
    },
    exists(key, locale) {
      return intlService.exists(key, locale);
    },
    formatCountry(value, opts) {
      return intlService.formatCountry(value, opts);
    },
    formatMoney(amount, opts) {
      return intlService.formatMoney(amount, opts);
    },
    formatNumber(value, opts) {
      return intlService.formatNumber(value, opts);
    },
  };
}
