import filterHtmlTags from '../../src/compat/filterHtmlTags';

describe('filterHtmlTags', () => {
  it('should not filter some tags', () => {
    const notFiltered = [
      '<a href="#">not filtered</a>',
      '<b>not filtered</b>',
      '<p class="center">not filtered</p>',
      'not<br/>filtered',
      'not <i>filtered</i>',
      'not <img src="#"/> filtered',
    ];

    notFiltered.forEach(str => {
      expect(filterHtmlTags(str)).toEqual(str);
    });
  });
  it('should filter some tags', () => {
    expect(filterHtmlTags('<script>filterMe();</script>')).toEqual(
      'filterMe();'
    );
    expect(filterHtmlTags('<ul><li>filter</li> <li>me</li></ul>')).toEqual(
      'filter me'
    );
  });
  it('should filter arrays', () => {
    expect(
      filterHtmlTags([
        'filter me',
        '<strong>filter</strong> me',
        'filter <hr/>me',
      ])
    ).toEqual(['filter me', 'filter me', 'filter me']);
  });
});
