import { normalize } from '../schema/presentation2';

export default async function preloadNormalizedList(list) {
  for (const listItem of list) {
    await new Promise(resolve => {
      setTimeout(() => resolve(normalize(listItem)), 0);
    });
  }
}
