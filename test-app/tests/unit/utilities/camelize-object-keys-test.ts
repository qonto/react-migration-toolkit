import { module, test } from 'qunit';
import { camelizeObjectKeys } from '@qonto/react-migration-toolkit/react/utils/camelize-object-keys';

module('Unit | Utility | camelizeObjectKeys', function() {
  test('should return the feature flags camelized', function(assert) {
    const featureFlags = camelizeObjectKeys<Record<string, boolean | string>>({
      'feature--boolean-example-flag': true,
      'feature--string-example-flag': 'string',
    });
    const camelizeFeatureFlags = {
      featureBooleanExampleFlag: true,
      featureStringExampleFlag: 'string',
    };
    assert.deepEqual(featureFlags, camelizeFeatureFlags);
  });
});
