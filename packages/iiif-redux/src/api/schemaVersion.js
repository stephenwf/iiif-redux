import { createSelector } from 'reselect';
import { getAllSchemaVersions } from './all';

export const getSchemaVersionForResource = selector =>
  createSelector(
    getAllSchemaVersions,
    selector,
    (allSchemaVersions, resource) => {
      const id = resource ? resource['@id'] || resource.id : null;
      if (!id) {
        return null;
      }
      return allSchemaVersions ? allSchemaVersions[id] || null : null;
    }
  );
