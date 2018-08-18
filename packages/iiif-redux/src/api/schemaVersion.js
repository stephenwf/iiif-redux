import { createSelector } from 'reselect';
import { getAllSchemaVersions } from './all';

export const getSchemaVersionForResource = selector =>
  createSelector(
    getAllSchemaVersions,
    selector,
    (allSchemaVersions, resource) => {
      const id = resource['@id'] || resource.id;
      if (!id) {
        return null;
      }
      return allSchemaVersions ? allSchemaVersions[id] || null : null;
    }
  );
