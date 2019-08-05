const { expect } = require('chai');
const mergeConfig = require('./merge.utils');

const { parseValue } = mergeConfig;

describe('MergeUtils', () => {
  describe('#mergeConfig', () => {
    it('should merge env variables starting with the right prefix with the object', () => {
      process.env.TEST_MERGE_CONFIG_A_STRING = 'value';
      process.env.TEST_MERGE_CONFIG_NUMBER = '3000';
      process.env.TEST_MERGE_CONFIG_BOOLEAN = 'false';
      process.env.TEST_MERGE_CONFIG_DEEP__PROPERTY = 'new';

      const config = {
        aString: 'oldValue',
        number: 5000,
        boolean: true,
        deep: {
          property: 'old',
        },
      };
      const newConfig = mergeConfig(config, 'TEST_MERGE_CONFIG_');

      expect(newConfig.aString).equal('value');
      expect(newConfig.number).be.a('number').and.equal(3000);
      expect(newConfig.boolean).be.a('boolean').and.equal(false);
      expect(newConfig.deep.property).be.a('string').and.equal('new');

      delete process.env.TEST_MERGE_CONFIG_STRING;
      delete process.env.TEST_MERGE_CONFIG_NUMBER;
      delete process.env.TEST_MERGE_CONFIG_BOOLEAN;
      delete process.env.TEST_MERGE_CONFIG_DEEP__PROPERTY;
    });
    it('should ignore unset properties', () => {
      process.env.TEST_MERGE_CONFIG_UNKNOWN = 'value';
      process.env.TEST_MERGE_CONFIG_DEEP__UNKNOWN = 'value';
      process.env.TEST_MERGE_CONFIG_DEEP__DEEP__UNKNOWN = 'value';

      const config = {
        deep: {},
      };
      const newConfig = mergeConfig(config, 'TEST_MERGE_CONFIG_');
      expect(newConfig).to.deep.equal(config);

      delete process.env.TEST_MERGE_CONFIG_UNKNOWN;
      delete process.env.TEST_MERGE_CONFIG_DEEP__UNKNOWN;
      delete process.env.TEST_MERGE_CONFIG_DEEP__DEEP__UNKNOWN;
    });
    it('should set production to true when NODE_ENV is production', () => {
      const previousNodeEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      const config = {};
      const newConfig = mergeConfig(config);
      expect(newConfig).have.property('production', true);
      process.env.NODE_ENV = previousNodeEnv;
    });
  });

  describe('#parseValue', () => {
    it('should cast \'true\' to true (string > boolean)', () => {
      expect(parseValue('true')).be.equal(true);
    });
    it('should cast \'false\' to false (string > boolean)', () => {
      expect(parseValue('false')).be.equal(false);
    });
    it('should cast \'10.2\' to 10.2 (string > number)', () => {
      expect(parseValue('10.2')).be.equal(10.2);
    });
    it('should cast \'3000\' to 3000 (string > number)', () => {
      expect(parseValue('3000')).be.equal(3000);
    });
    it('should return \'a random string\' as is (string > string)', () => {
      expect(parseValue('a random string')).be.equal('a random string');
    });
    it('should return \'10 random string\' as is (string with numbers > string)', () => {
      expect(parseValue('10 random string')).be.equal('10 random string');
    });
  });
});
