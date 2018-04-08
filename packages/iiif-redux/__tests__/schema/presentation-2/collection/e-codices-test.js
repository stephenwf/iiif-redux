import { normalize } from 'normalizr';
import { collection } from '../../../../src/schema/presentation2';
import eCodicesFixture from '../../../fixtures/e-codices';
import * as currentCollection from '../../../../src/api/current-collection';

describe('e-codices collection', () => {
  const entity = normalize(eCodicesFixture, collection);
  const state = {
    ...entity.entities,
    config: {
      defaultLanguage: 'en',
    },
    routing: {
      currentCollection: entity.result,
      currentManifest: null,
    },
  };

  it('should have a label', () => {
    expect(currentCollection.getLabel(state)).toEqual([
      {
        '@language': 'en',
        '@value': 'e-codices – Virtual Manuscript Library of Switzerland',
      },
    ]);
  });

  it('should have a logo', () => {
    expect(currentCollection.getLogo(state)).toEqual(
      'http://www.e-codices.ch/img/logo-for-iiif-manifest.png'
    );
  });

  it('should have attribution', () => {
    expect(currentCollection.getAttribution(state)).toEqual([
      {
        '@language': 'en',
        '@value': 'e-codices - Virtual Manuscript Library of Switzerland',
      },
    ]);
  });

  it('should be able to load first collection', () => {
    const collections = currentCollection.getCollections(state);

    expect(collections[0].label).toEqual('[sine loco], codices restituti');
  });

  it('should be able to load collections from members property', () => {
    expect(currentCollection.getMemberIds(state).length).toEqual(83);
    expect(currentCollection.getMembers(state).length).toEqual(83);
    expect(currentCollection.getCollections(state).length).toEqual(83);
  });

  it('should have collections', () => {
    expect(currentCollection.getCollectionIds(state)).toEqual([
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/sl.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/kba.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/saa.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/laai.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/phmb.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/ubb.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/bbb.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/sbb.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/dab.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/stab.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/mgb.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/caap.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/acv.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/chap.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/sag.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/clap.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/cma.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/fmb.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/daap.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/bkd.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/sbe.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/bke.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/psle.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/gf.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/kbt.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/kpfaf.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/aef.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/bcuf.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/fcc.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/bge.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/hba.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/bj.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/bcul.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/kol.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/pal.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/stalu.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/zhl.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/maap.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/bkm.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/bs.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/bmm.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/kjm.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/bpun.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/oms.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/bnf.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/arcj.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/bcj.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/quap.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/fdr.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/mdi.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/aasm.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/cps.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/bks.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/staow.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/kgfs.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/stash.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/sbs.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/ebs.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/das.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/aev.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/acs.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/mvs.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/dss.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/staso.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/zbs.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/vad.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/ssg.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/csg.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/spl.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/nlr.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/teap.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/tap.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/cea.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/lsb.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/gau.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/utp.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/mhv.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/dsoz.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/kaw.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/zos.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/bc.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/snm.json',
      'http://www.e-codices.unifr.ch/metadata/iiif/collection/zbz.json',
    ]);
  });
});
