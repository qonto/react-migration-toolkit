import { useCallback, useSyncExternalStore } from 'react';
import { useEmberService } from '../use-ember-service';
import { type IntlShape } from 'react-intl';

export function useEmberIntl(): IntlShape {
  const emberIntl = useEmberService('intl');

  const subscribeToLocaleChange = useCallback(
    (callback: () => void) => {
      //@ts-expect-error This is an internal property, but we need it to subscribe to locale changes
      emberIntl._eventEmitter.on('localeChanged', callback, null);
      return () => {
        //@ts-expect-error This is an internal property, but we need it to unsubscribe to locale changes
        emberIntl._eventEmitter.off('localeChanged', callback, null);
      };
    },
    [emberIntl],
  );

  const locale = useSyncExternalStore(
    subscribeToLocaleChange,
    () => emberIntl.primaryLocale,
  );

  if (!locale) {
    throw new Error(
      'Intl service not available, make sure ember-intl is installed',
    );
  }

  return (
    //@ts-expect-error emberIntl.getIntl is a private method
    emberIntl.getIntl(locale)
  );
}
