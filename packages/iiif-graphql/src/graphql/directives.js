import { SchemaDirectiveVisitor } from 'graphql-tools';
import { defaultFieldResolver } from 'graphql';

/**
 * This is non functional.
 */
function translate(str, path, locale) {
  if (!str) {
    return '';
  }
  if (typeof str === 'string') {
    return str;
  }
  if (Array.isArray(str)) {
    return str && str[0] ? str[0]['@value'] || '' : '';
  }
  return str[Object.keys(str)[0]][0] || '';
}

class IntlDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field, details) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function(...args) {
      const context = args[2];
      const defaultText = await resolve.apply(this, args);
      // In this example, path would be ["Query", "greeting"]:
      const path = [details.objectType.name, field.name];
      return translate(defaultText, path, context.locale);
    };
  }
}

export default {
  intl: IntlDirective,
};
