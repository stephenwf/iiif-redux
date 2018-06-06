import { normalize } from '../schema/presentation2';

export default async function preloadNormalizedList(list) {
  let proms = [];

  for (const listItem of list) {
    proms.push(
      new Promise(resolve => {
        setTimeout(() => resolve(normalize(listItem)), 0);
      })
    );
  }

  await Promise.all(proms);
}
