webpackJsonp(
  [1],
  {
    '/xru': function(e, t, n) {
      'use strict';
      var r = n('ccIB'),
        a = n.n(r),
        c = n('SbZA'),
        o = (n.n(c), n('WSBp')),
        i = (n.n(o), n('MKLq')),
        u = n('8c4l'),
        s = n.n(u),
        f =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          };
      function l(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
      }
      var d = Object(o.SortableContainer)(function(e) {
          var t = e.items,
            n = e.current,
            r = e.onClick,
            c = e.onClose,
            o = e.eWidth,
            u = (function(e, t) {
              var n = {};
              for (var r in e)
                t.indexOf(r) >= 0 ||
                  (Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]));
              return n;
            })(e, ['items', 'current', 'onClick', 'onClose', 'eWidth']);
          return a.a.createElement(
            'div',
            { className: 'chrome-tab-container', style: { display: 'flex' } },
            t.map(function(e, t) {
              var s = e.id,
                l = e.value;
              return a.a.createElement(
                i.a,
                f(
                  {
                    onClick: function(e) {
                      e.target.classList.contains('chrome-tab-close') || r(s);
                    },
                    onClose: function(e) {
                      e.preventDefault(), c(s);
                    },
                    active: s === n,
                    leftOffset: (t + 1) * o,
                    key: t,
                    index: t,
                  },
                  u
                ),
                l
              );
            })
          );
        }),
        p = a.a.createElement(
          'div',
          { className: 'chrome-tabs-logo' },
          a.a.createElement('img', { src: s.a, height: '100%', width: 'auto' })
        ),
        h = (function(e) {
          function t() {
            var n, r;
            !(function(e, t) {
              if (!(e instanceof t))
                throw new TypeError('Cannot call a class as a function');
            })(this, t);
            for (var a = arguments.length, c = Array(a), o = 0; o < a; o++)
              c[o] = arguments[o];
            return (
              (n = r = l(this, e.call.apply(e, [this].concat(c)))),
              (r.tabContentEl = null),
              (r.options = {
                tabOverlapDistance: 10,
                minWidth: 40,
                maxWidth: 180,
              }),
              l(r, n)
            );
          }
          return (
            (function(e, t) {
              if ('function' != typeof t && null !== t)
                throw new TypeError(
                  'Super expression must either be null or a function, not ' +
                    typeof t
                );
              (e.prototype = Object.create(t && t.prototype, {
                constructor: {
                  value: e,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })),
                t &&
                  (Object.setPrototypeOf
                    ? Object.setPrototypeOf(e, t)
                    : (e.__proto__ = t));
            })(t, e),
            (t.prototype.getTabEffectiveWidth = function(e) {
              return e - this.options.tabOverlapDistance;
            }),
            (t.prototype.getTabWidth = function(e) {
              if (!this.tabContentEl) return this.options.maxWidth;
              var t =
                (this.tabContentEl.clientWidth -
                  this.options.tabOverlapDistance) /
                  e.length +
                this.options.tabOverlapDistance;
              return Math.max(
                this.options.minWidth,
                Math.min(this.options.maxWidth, t)
              );
            }),
            (t.prototype.componentDidMount = function() {
              this.setState({ mounted: !0 });
            }),
            (t.prototype.render = function() {
              var e = this,
                t = this.props,
                n = t.tabs,
                r = t.onSortEnd,
                c = t.onClick,
                o = t.onClose,
                i = t.current,
                u = this.getTabWidth(n),
                s = this.getTabEffectiveWidth(u);
              return a.a.createElement(
                'div',
                {
                  ref: function(t) {
                    e.tabContentEl = t;
                  },
                  className: 'chrome-tabs chrome-tabs-dark-theme',
                },
                p,
                a.a.createElement(d, {
                  helperClass: 'chrome-tabs-dragging',
                  axis: 'x',
                  lockAxis: 'x',
                  items: n,
                  width: u,
                  eWidth: s,
                  onSortEnd: r,
                  distance: 5,
                  onClose: o,
                  onClick: c,
                  current: i,
                }),
                a.a.createElement('div', {
                  className: 'chrome-tabs-bottom-bar',
                  style: { zIndex: 3 },
                })
              );
            }),
            t
          );
        })(r.Component);
      t.a = h;
    },
    0: function(e, t, n) {
      n('IeMj'), (e.exports = n('lVK7'));
    },
    '1ol/': function(e, t) {},
    '7nrr': function(e, t) {},
    '8D95': function(e, t, n) {
      'use strict';
      n.d(t, 'c', function() {
        return _;
      }),
        n.d(t, 'a', function() {
          return s;
        }),
        n.d(t, 'b', function() {
          return f;
        });
      var r = n('ZXTf'),
        a = n('18Io'),
        c = (n.n(a), n('XCim')),
        o = n('o0yz'),
        i = n('b2Or');
      function u(e) {
        return new a.schema.Entity(e, {}, { idAttribute: '@id' });
      }
      var s = u('collections'),
        f = u('manifests'),
        l = u('sequences'),
        d = u('canvases'),
        p = u('annotations'),
        h = u('annotationLists'),
        m = u('ranges'),
        b = u('layers'),
        O = u('imageResources'),
        v = u('choices'),
        E = u('externalResources'),
        y = u('services'),
        g = new a.schema.Array(
          { collection: s, manifest: f, externalResource: E, layer: b },
          function(e) {
            switch (e['@type']) {
              case 'sc:Collection':
                return 'collection';
              case 'sc:Manifest':
                return 'manifest';
              case 'sc:Layer':
                return 'layer';
              default:
                return 'externalResource';
            }
          }
        ),
        I = new a.schema.Union({ canvas: d, range: m }, function(e) {
          return 'sc:Canvas' === e['@type'] ? 'canvas' : 'range';
        }),
        T = {
          'sc:Collection': 'collection',
          'sc:Sequence': 'sequence',
          'sc:Manifest': 'manifest',
          'sc:Canvas': 'canvas',
          'sc:AnnotationList': 'annotationList',
          'sc:Annotation': 'annotation',
          'sc:Range': 'range',
          'sc:Layer': 'layer',
          'dctypes:Image': 'imageResource',
        },
        R = new a.schema.Union(
          {
            collection: s,
            sequence: l,
            manifest: f,
            canvas: d,
            annotationList: h,
            annotation: p,
            range: m,
            layer: b,
            imageResource: O,
            service: y,
          },
          function(e) {
            if (T[e['@type']]) return T[e['@type']];
            if (e.profile) return 'service';
            throw Error('Unknown entity type');
          }
        );
      s.define({
        collections: new a.schema.Array(
          { collection: s, manifest: f },
          function(e) {
            return 'sc:Manifest' === e['@type'] ? 'manifest' : 'collection';
          }
        ),
        manifests: [f],
        members: new a.schema.Array({ collection: s, manifest: f }, function(
          e
        ) {
          return 'sc:Manifest' === e['@type'] ? 'manifest' : 'collection';
        }),
        seeAlso: [E],
        service: [y],
        related: [E],
        rendering: [E],
        otherContent: [h],
        within: g,
        thumbnail: O,
      }),
        f.define({
          sequences: [l],
          structures: [m],
          seeAlso: [E],
          service: [y],
          related: [E],
          rendering: [E],
          otherContent: [h],
          within: g,
          thumbnail: O,
        }),
        l.define({
          canvases: [d],
          seeAlso: [E],
          service: [y],
          related: [E],
          rendering: [E],
          otherContent: [h],
          within: g,
          startCanvas: d,
          thumbnail: O,
        }),
        d.define({
          images: [p],
          seeAlso: [E],
          service: [y],
          related: [E],
          rendering: [E],
          otherContent: [h],
          within: g,
          thumbnail: O,
        }),
        p.define({
          resource: new a.schema.Union(
            { imageResource: O, externalResource: E, choice: v },
            function(e) {
              switch (e['@type']) {
                case 'dctypes:Image':
                  return 'imageResource';
                case 'oa:Choice':
                  return 'choice';
                default:
                  return 'externalResource';
              }
            }
          ),
          on: d,
          seeAlso: [E],
          service: [y],
          related: [E],
          rendering: [E],
          within: g,
          thumbnail: O,
        }),
        h.define({
          resources: [p],
          seeAlso: [E],
          service: [y],
          related: [E],
          rendering: [E],
          within: g,
          thumbnail: O,
        }),
        m.define({
          resources: [p],
          members: [I],
          canvases: [d],
          ranges: [m],
          seeAlso: [E],
          service: [y],
          related: [E],
          rendering: [E],
          within: g,
          startCanvas: d,
          contentLayer: b,
          thumbnail: O,
        }),
        b.define({
          seeAlso: [E],
          service: [y],
          related: [E],
          rendering: [E],
          within: g,
        }),
        O.define({ service: [y] }),
        v.define({ default: p, item: [p] });
      var j = Object(r.d)(c.a, o.a, i.a),
        _ = function(e) {
          var t =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : R;
          return Object(a.normalize)(j(e), t);
        };
    },
    '8c4l': function(e, t, n) {
      e.exports = n.p + 'iiif-redux-white.58ac54fe.png';
    },
    '8fsV': function(e, t, n) {
      'use strict';
      var r = n('zKHB'),
        a = n.n(r),
        c = n('9olA'),
        o = a()(function(e, t) {
          return Array.isArray(e)
            ? e
                .map(function(e) {
                  return e.value
                    ? {
                        label: Object(c.a)(e.label, t),
                        value: Object(c.a)(e.value, t),
                      }
                    : null;
                })
                .filter(function(e) {
                  return e;
                })
            : [];
        });
      t.a = o;
    },
    '9olA': function(e, t, n) {
      'use strict';
      var r = n('zKHB'),
        a = n.n(r),
        c = n('gdug'),
        o = n('YdZd'),
        i = a()(function(e, t) {
          return e
            ? 'string' == typeof e
              ? [{ '@language': t, '@value': Object(c.a)(e) }]
              : Array.isArray(e)
                ? e
                    .map(function(e) {
                      return Object(o.a)(e, t);
                    })
                    .reduce(function(e, t) {
                      return e.concat(t);
                    }, [])
                    .filter(function(e) {
                      return e;
                    })
                : Object(o.a)(e, t)
            : [];
        });
      t.a = i;
    },
    Ezjh: function(e, t, n) {
      'use strict';
      t.a = function() {
        arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
        var e =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
          t = (arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
          arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {}),
          n = Object(a.a)(),
          u = Object(r.e)(
            Object(r.c)(c),
            t,
            i(r.a.apply(void 0, [n].concat(e)))
          );
        return (
          o.a.map(function(e) {
            return n.run(e);
          }),
          u
        );
      };
      var r = n('ZXTf'),
        a = n('S+3h'),
        c = n('u+TQ'),
        o = n('ZCQz'),
        i = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || r.d;
    },
    FS1u: function(e, t, n) {
      'use strict';
      (t.a = c),
        (t.b = function(e) {
          return {
            createNewTab: (function(e) {
              return function(t, n, a) {
                e(Object(r.b)({}, t)),
                  e(Object(r.d)('tabState', { tabIndex: a, tabLabel: n }, t));
              };
            })(e),
            selectTab: (function(e) {
              return function(t) {
                e(Object(r.e)(t));
              };
            })(e),
            closeTab: (function(e) {
              return function(t) {
                e(Object(r.c)(t));
              };
            })(e),
            updateSortOrder: (function(e) {
              return function(t, n, o) {
                var i = c(t),
                  u = Object(a.arrayMove)(i, n, o);
                u.forEach(function(t, n) {
                  e(Object(r.a)('tabState', { tabIndex: n }, t.id));
                });
              };
            })(e),
            setResource: (function(e) {
              return function(t, n, a) {
                e(Object(r.f)({ resourceId: n, resourceType: a }, t));
              };
            })(e),
          };
        });
      var r = n('P3DY'),
        a = n('WSBp');
      n.n(a);
      function c(e) {
        return e
          .map(function(e) {
            return {
              id: e.id,
              value: e.tabState.tabLabel,
              order: e.tabState.tabIndex,
            };
          })
          .sort(function(e, t) {
            return e.order > t.order ? 1 : e.order < t.order ? -1 : 0;
          });
      }
    },
    Fxy7: function(e, t, n) {
      'use strict';
      n('Ohrm');
      var r = n('hxlj'),
        a = n('ccIB'),
        c = n.n(a),
        o = n('bSkM'),
        i = (n.n(o),
        Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          });
      var u = (function(e) {
        function t() {
          return (
            (function(e, t) {
              if (!(e instanceof t))
                throw new TypeError('Cannot call a class as a function');
            })(this, t),
            (function(e, t) {
              if (!e)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return !t || ('object' != typeof t && 'function' != typeof t)
                ? e
                : t;
            })(this, e.apply(this, arguments))
          );
        }
        return (
          (function(e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError(
                'Super expression must either be null or a function, not ' +
                  typeof t
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
              t &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, t)
                  : (e.__proto__ = t));
          })(t, e),
          (t.prototype.render = function() {
            var e = this.props,
              t = e.type,
              n = e.iconProps,
              a = (function(e, t) {
                var n = {};
                for (var r in e)
                  t.indexOf(r) >= 0 ||
                    (Object.prototype.hasOwnProperty.call(e, r) &&
                      (n[r] = e[r]));
                return n;
              })(e, ['type', 'iconProps']);
            return c.a.createElement(
              'div',
              i({ className: 'chrome-icon' }, a),
              c.a.createElement(r.a, i({ type: t }, n))
            );
          }),
          t
        );
      })(a.Component);
      t.a = u;
    },
    'GQ+1': function(e, t, n) {
      'use strict';
      var r = n('ccIB'),
        a = n.n(r),
        c = n('IZTr'),
        o = n('hKf9'),
        i = (n.n(o), n('smyc')),
        u = n('/xru'),
        s = n('Fxy7'),
        f = n('GV7Q'),
        l = n('FS1u'),
        d = n('q5pk');
      n.n(d);
      function p(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
      }
      var h = a.a.createElement(s.a, { key: 'left', type: 'left' }),
        m = a.a.createElement(s.a, { key: 'right', type: 'right' }),
        b = a.a.createElement(s.a, { key: 'reload', type: 'reload' }),
        O = a.a.createElement(s.a, { type: 'star' }),
        v = (function(e) {
          function t() {
            var n, r;
            !(function(e, t) {
              if (!(e instanceof t))
                throw new TypeError('Cannot call a class as a function');
            })(this, t);
            for (var a = arguments.length, c = Array(a), o = 0; o < a; o++)
              c[o] = arguments[o];
            return (
              (n = r = p(this, e.call.apply(e, [this].concat(c)))),
              (r.state = {
                tabs: [
                  { id: 0, value: 'testing - 1' },
                  { id: 1, value: 'testing - 2' },
                ],
                current: 0,
              }),
              (r.onSortEnd = function(e) {
                var t = e.oldIndex,
                  n = e.newIndex;
                r.props.updateSortOrder(r.props.allFrames, t, n);
              }),
              (r.addNewTab = function() {
                var e = 'new-tab-' + Math.round(1e5 * Math.random());
                r.props.createNewTab(e, 'new tab', r.props.allFrames.length);
              }),
              (r.onClickTab = function(e) {
                r.props.selectTab(e);
              }),
              (r.onClose = function(e) {
                r.props.closeTab(e);
              }),
              (r.handleSearch = function(e) {
                r.props.setResource(r.props.focused, e, 'collection');
              }),
              p(r, n)
            );
          }
          return (
            (function(e, t) {
              if ('function' != typeof t && null !== t)
                throw new TypeError(
                  'Super expression must either be null or a function, not ' +
                    typeof t
                );
              (e.prototype = Object.create(t && t.prototype, {
                constructor: {
                  value: e,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })),
                t &&
                  (Object.setPrototypeOf
                    ? Object.setPrototypeOf(e, t)
                    : (e.__proto__ = t));
            })(t, e),
            (t.prototype.componentWillMount = function() {
              this.props.createNewTab('new-tab-0', 'new tab', 0);
            }),
            (t.prototype.componentWillReceiveProps = function(e) {
              null === e.focused &&
                e.allFrameIds.length &&
                this.props.selectTab(e.allFrameIds[0]);
            }),
            (t.prototype.render = function() {
              var e = this,
                t = this.props,
                n = t.focused,
                r = t.allFrames,
                c = Object(l.a)(r);
              return a.a.createElement(
                'div',
                null,
                a.a.createElement(u.a, {
                  tabs: c,
                  current: n,
                  onClick: this.onClickTab,
                  onSortEnd: this.onSortEnd,
                  onClose: this.onClose,
                }),
                a.a.createElement(f.a, {
                  searchValue:
                    (this.props.currentResource &&
                      this.props.currentResource.id) ||
                    '',
                  onSearch: this.handleSearch,
                  left: function() {
                    return [
                      h,
                      m,
                      b,
                      a.a.createElement(s.a, {
                        key: 'plus',
                        type: 'plus',
                        onClick: e.addNewTab,
                      }),
                    ];
                  },
                  right: function() {
                    return O;
                  },
                }),
                this.props.currentResource && this.props.currentResource.id
                  ? a.a.createElement(
                      'div',
                      {
                        style: {
                          color: '#fff',
                          marginTop: 100,
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          width: '50%',
                        },
                      },
                      'Current resource:',
                      a.a.createElement(
                        'h1',
                        { style: { color: '#fff' } },
                        this.props.currentResource.id
                      ),
                      a.a.createElement(
                        'p',
                        null,
                        'Type: ',
                        a.a.createElement(
                          'strong',
                          null,
                          this.props.currentResource.type
                        )
                      )
                    )
                  : a.a.createElement(
                      'div',
                      {
                        style: {
                          color: '#fff',
                          marginTop: 100,
                          marginLeft: 'auto',
                          marginRight: 'auto',
                          width: '50%',
                        },
                      },
                      a.a.createElement(
                        'h1',
                        { style: { color: '#999' } },
                        'Enter a collection URL and hit enter...'
                      )
                    )
              );
            }),
            t
          );
        })(r.Component);
      t.a = Object(c.b)(
        Object(o.createStructuredSelector)({
          currentResource: Object(i.a)(function(e) {
            return {
              id: e.getCurrentResourceId,
              type: e.getCurrentResourceType,
            };
          }),
          focused: i.d,
          allFrameIds: i.c,
          allFrames: Object(i.b)(i.c, function(e) {
            return {
              id: e.getId,
              enabled: e.getEnabledExtensions,
              tabState: Object(o.createSelector)(
                e.getExtensionById('tabState'),
                function(e) {
                  return e.config;
                }
              ),
            };
          }),
        }),
        l.b
      )(v);
    },
    GV7Q: function(e, t, n) {
      'use strict';
      var r = n('ccIB'),
        a = n.n(r),
        c = n('7nrr');
      n.n(c);
      function o(e, t) {
        if (!e)
          throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
          );
        return !t || ('object' != typeof t && 'function' != typeof t) ? e : t;
      }
      var i = (function(e) {
        function t() {
          var n, r;
          !(function(e, t) {
            if (!(e instanceof t))
              throw new TypeError('Cannot call a class as a function');
          })(this, t);
          for (var a = arguments.length, c = Array(a), i = 0; i < a; i++)
            c[i] = arguments[i];
          return (
            (n = r = o(this, e.call.apply(e, [this].concat(c)))),
            (r.state = { textValue: '' }),
            (r.handleKeyUp = function(e) {
              13 === e.keyCode && r.props.onSearch(r.textInput.value);
            }),
            (r.handleChange = function(e) {
              r.setState({ searchValue: e.target.value });
            }),
            o(r, n)
          );
        }
        return (
          (function(e, t) {
            if ('function' != typeof t && null !== t)
              throw new TypeError(
                'Super expression must either be null or a function, not ' +
                  typeof t
              );
            (e.prototype = Object.create(t && t.prototype, {
              constructor: {
                value: e,
                enumerable: !1,
                writable: !0,
                configurable: !0,
              },
            })),
              t &&
                (Object.setPrototypeOf
                  ? Object.setPrototypeOf(e, t)
                  : (e.__proto__ = t));
          })(t, e),
          (t.prototype.componentWillReceiveProps = function(e) {
            this.props.searchValue !== e.searchValue &&
              this.setState({ searchValue: e.searchValue });
          }),
          (t.prototype.render = function() {
            var e = this,
              t = this.props,
              n = t.left,
              r = t.right,
              c = (function(e, t) {
                var n = {};
                for (var r in e)
                  t.indexOf(r) >= 0 ||
                    (Object.prototype.hasOwnProperty.call(e, r) &&
                      (n[r] = e[r]));
                return n;
              })(t, ['left', 'right']);
            return a.a.createElement(
              'div',
              { className: 'chrome-navigation' },
              n ? n(c) : null,
              a.a.createElement('input', {
                value: this.state.searchValue,
                ref: function(t) {
                  return (e.textInput = t);
                },
                type: 'text',
                className: 'chrome-navigation__input',
                placeholder: 'Search or enter collection or manifest URL',
                onChange: this.handleChange,
                onKeyUp: this.handleKeyUp,
              }),
              r ? r(c) : null
            );
          }),
          t
        );
      })(r.Component);
      t.a = i;
    },
    HP7d: function(e, t, n) {
      'use strict';
      var r = n('iQfG'),
        a = n('zKHB'),
        c = n.n(a),
        o = n('fKt1'),
        i = n.n(o),
        u = c()(function(e) {
          return e
            ? 'string' == typeof e
              ? i.a.isWebUri(e)
                ? [{ '@id': e }]
                : null
              : Array.isArray(e)
                ? e
                    .map(function(e) {
                      return Object(r.a)(e);
                    })
                    .reduce(function(e, t) {
                      return e.concat(t);
                    }, [])
                    .filter(function(e) {
                      return e;
                    })
                : Object(r.a)(e)
            : [];
        });
      t.a = u;
    },
    MKLq: function(e, t, n) {
      'use strict';
      var r = n('ccIB'),
        a = n.n(r),
        c = n('1ol/'),
        o = (n.n(c), n('WSBp'));
      n.n(o);
      var i = a.a.createElement(
          'div',
          { className: 'chrome-tab-background' },
          a.a.createElement(
            'svg',
            { version: '1.1', xmlns: 'http://www.w3.org/2000/svg' },
            a.a.createElement(
              'defs',
              null,
              a.a.createElement(
                'symbol',
                { id: 'chrome-tab-geometry-left', viewBox: '0 0 214 29' },
                a.a.createElement('path', {
                  d:
                    'M14.3 0.1L214 0.1 214 29 0 29C0 29 12.2 2.6 13.2 1.1 14.3-0.4 14.3 0.1 14.3 0.1Z',
                })
              ),
              a.a.createElement(
                'symbol',
                { id: 'chrome-tab-geometry-right', viewBox: '0 0 214 29' },
                a.a.createElement('use', { href: '#chrome-tab-geometry-left' })
              ),
              a.a.createElement(
                'clipPath',
                { id: 'crop' },
                a.a.createElement('rect', {
                  className: 'mask',
                  width: '100%',
                  height: '100%',
                  x: '0',
                })
              )
            ),
            a.a.createElement(
              'svg',
              { width: '50%', height: '100%' },
              a.a.createElement('use', {
                href: '#chrome-tab-geometry-left',
                width: '214',
                height: '29',
                className: 'chrome-tab-background',
              }),
              a.a.createElement('use', {
                href: '#chrome-tab-geometry-left',
                width: '214',
                height: '29',
                className: 'chrome-tab-shadow',
              })
            ),
            a.a.createElement(
              'g',
              { transform: 'scale(-1, 1)' },
              a.a.createElement(
                'svg',
                { width: '50%', height: '100%', x: '-100%', y: '0' },
                a.a.createElement('use', {
                  href: '#chrome-tab-geometry-right',
                  width: '214',
                  height: '29',
                  className: 'chrome-tab-background',
                }),
                a.a.createElement('use', {
                  href: '#chrome-tab-geometry-right',
                  width: '214',
                  height: '29',
                  className: 'chrome-tab-shadow',
                })
              )
            )
          )
        ),
        u = a.a.createElement('div', { className: 'chrome-tab-favicon' }),
        s = (function(e) {
          function t() {
            return (
              (function(e, t) {
                if (!(e instanceof t))
                  throw new TypeError('Cannot call a class as a function');
              })(this, t),
              (function(e, t) {
                if (!e)
                  throw new ReferenceError(
                    "this hasn't been initialised - super() hasn't been called"
                  );
                return !t || ('object' != typeof t && 'function' != typeof t)
                  ? e
                  : t;
              })(this, e.apply(this, arguments))
            );
          }
          return (
            (function(e, t) {
              if ('function' != typeof t && null !== t)
                throw new TypeError(
                  'Super expression must either be null or a function, not ' +
                    typeof t
                );
              (e.prototype = Object.create(t && t.prototype, {
                constructor: {
                  value: e,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })),
                t &&
                  (Object.setPrototypeOf
                    ? Object.setPrototypeOf(e, t)
                    : (e.__proto__ = t));
            })(t, e),
            (t.prototype.render = function() {
              return a.a.createElement(
                'div',
                {
                  onClick: this.props.onClick,
                  className:
                    (this.props.active ? 'chrome-tab-current' : '') +
                    ' chrome-tab',
                  style: { width: this.props.width },
                },
                i,
                u,
                a.a.createElement(
                  'div',
                  { className: 'chrome-tab-title' },
                  this.props.children
                ),
                a.a.createElement('div', {
                  className: 'chrome-tab-close',
                  onClick: this.props.onClose,
                })
              );
            }),
            t
          );
        })(r.Component);
      t.a = Object(o.SortableElement)(function(e) {
        return a.a.createElement(s, e);
      });
    },
    MlEz: function(e, t, n) {
      'use strict';
      t.a = function(e, t) {
        return c()(function(n, a) {
          return Object(r.createSelector)(
            n,
            e,
            function(e) {
              return e;
            },
            function(e, n, c) {
              return e.map(function(e) {
                var o = a(
                  t(function() {
                    return 'string' == typeof e ? n[e] : e;
                  })
                );
                return 'function' == typeof o
                  ? o(c)
                  : Object(r.createStructuredSelector)(o)(c);
              });
            }
          );
        });
      };
      var r = n('hKf9'),
        a = (n.n(r), n('zKHB')),
        c = n.n(a);
    },
    'NM+w': function(e, t, n) {
      'use strict';
      n.d(t, 'd', function() {
        return D;
      }),
        n.d(t, 'c', function() {
          return M;
        }),
        n.d(t, 'a', function() {
          return G;
        }),
        n.d(t, 'b', function() {
          return w;
        });
      var r,
        a,
        c,
        o,
        i,
        u = n('dOW8'),
        s = n.n(u),
        f = n('tmAo'),
        l = n.n(f),
        d = n('sxsv'),
        p = n('fKt1'),
        h = n.n(p),
        m = n('8D95'),
        b = n('jmaY'),
        O = n('Csgm'),
        v = n('/hkD'),
        E = n.n(v),
        y = ((o = s.a.mark(function e(t, n) {
          return s.a.wrap(
            function(e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return e.abrupt('return', l()(t));
                  case 2:
                    return e.abrupt(
                      'return',
                      fetch(t).then(function(e) {
                        return e.json();
                      })
                    );
                  case 3:
                  case 'end':
                    return e.stop();
                }
            },
            e,
            this
          );
        })),
        (i = function() {
          var e = o.apply(this, arguments);
          return new Promise(function(t, n) {
            return (function r(a, c) {
              try {
                var o = e[a](c),
                  i = o.value;
              } catch (e) {
                return void n(e);
              }
              if (!o.done)
                return Promise.resolve(i).then(
                  function(e) {
                    r('next', e);
                  },
                  function(e) {
                    r('throw', e);
                  }
                );
              t(i);
            })('next');
          });
        }),
        function(e, t) {
          return i.apply(this, arguments);
        });
      function g(e, t) {
        var n = {};
        for (var r in e)
          t.indexOf(r) >= 0 ||
            (Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]));
        return n;
      }
      var I = s.a.mark(k),
        T = s.a.mark(P),
        R = s.a.mark($),
        j = s.a.mark(B),
        _ = s.a.mark(D);
      var S = n('HsEb')('iiif-redux'),
        C = 'IIIF_RESOURCE_REQUEST',
        N = 'IIIF_RESOURCE_REQUEST_UNKNOWN',
        x = Object(d.b)(
          (((r = {})[N] = function(e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            return {
              resourceId: e,
              dereferenceIfMissing: t.dereferenceIfMissing || !1,
              ttl: t.ttl || 600,
              forceFresh: t.forceFresh,
            };
          }),
          (r[C] = function(e, t, n) {
            var r =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : {};
            return {
              resourceId: e,
              types: t,
              schema: n,
              dereferenceIfMissing: r.dereferenceIfMissing || !1,
              ttl: r.ttl || 600,
              forceFresh: r.forceFresh,
            };
          }),
          (r.IIIF_RESOURCE_SUCCESS = function(e, t) {
            return { resourceId: e, normalizedResponse: t };
          }),
          (r.IIIF_RESOURCE_ERROR = function(e, t) {
            return { resourceId: e, error: t };
          }),
          r)
        ),
        w = (x.iiifResourceRequestUnknown, x.iiifResourceRequest),
        A = x.iiifResourceSuccess,
        U = x.iiifResourceError,
        F = {},
        L = {
          collections: {},
          sequences: {},
          manifests: {},
          canvases: {},
          annotationLists: {},
          annotations: {},
          ranges: {},
          layers: {},
          imageResources: {},
          externalResources: {},
        },
        M = Object(d.c)(
          (((a = {})[A] = function(e, t) {
            var n = t.payload.normalizedResponse;
            return Object(O.a)(e, n);
          }),
          a),
          L
        ),
        G = Object(d.c)(
          (((c = {})[w] = function(e, t) {
            var n,
              r = t.payload,
              a = r.resourceId,
              c = r.ttl;
            return E()(
              e,
              (((n = {})[a] = {
                $set: {
                  resourceId: a,
                  ttl: c,
                  requested: e[a] ? e[a].requested : new Date(),
                  loading: !e[a] || e[a].loading,
                },
              }),
              n)
            );
          }),
          (c[U] = function(e, t) {
            var n,
              r = t.payload,
              a = r.resourceId,
              c = r.error;
            return E()(
              e,
              (((n = {})[a] = { loading: { $set: !1 }, error: { $set: c } }), n)
            );
          }),
          (c[A] = function(e, t) {
            var n,
              r = t.payload.resourceId;
            return E()(e, (((n = {})[r] = { loading: { $set: !1 } }), n));
          }),
          c),
          F
        );
      function k(e, t, n) {
        return s.a.wrap(
          function(r) {
            for (;;)
              switch ((r.prev = r.next)) {
                case 0:
                  return (r.next = 2), Object(b.c)(U(t, n));
                case 2:
                  if (!e) {
                    r.next = 5;
                    break;
                  }
                  return (
                    (r.next = 5),
                    Object(b.c)({
                      type: e,
                      payload: { resourceId: t, error: n },
                    })
                  );
                case 5:
                case 'end':
                  return r.stop();
              }
          },
          I,
          this
        );
      }
      function P(e, t, n) {
        return s.a.wrap(
          function(r) {
            for (;;)
              switch ((r.prev = r.next)) {
                case 0:
                  return (r.next = 2), Object(b.c)(A(t, n));
                case 2:
                  return (
                    (r.next = 4),
                    Object(b.c)({
                      type: e,
                      payload: { resourceId: t, normalizedResponse: n },
                    })
                  );
                case 4:
                case 'end':
                  return r.stop();
              }
          },
          T,
          this
        );
      }
      function $(e) {
        var t,
          n,
          r,
          a,
          c,
          o,
          i,
          u,
          f,
          l,
          d,
          p,
          O = e.payload;
        return s.a.wrap(
          function(e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  (t = O.resourceId),
                    (n = O.types),
                    (r = O.schema),
                    (a = g(O, ['resourceId', 'types', 'schema'])),
                    n.length,
                    (e.next = 4);
                  break;
                case 4:
                  if (((c = n[0]), (o = n[1]), (i = n[2]), h.a.isWebUri(t))) {
                    e.next = 9;
                    break;
                  }
                  return (
                    (e.next = 8),
                    Object(b.b)(k, i, t, 'Resource is not a valid Web URI.')
                  );
                case 8:
                  return e.abrupt('return');
                case 9:
                  return (e.next = 11), Object(b.d)();
                case 11:
                  if (
                    !(u = e.sent).dereferenced[t] ||
                    !1 !== u.dereferenced[t].loading
                  ) {
                    e.next = 15;
                    break;
                  }
                  return (
                    S('Skipping fetch for resource %s using cache.', t),
                    e.abrupt('return')
                  );
                case 15:
                  return (e.next = 17), Object(b.c)({ type: c, payload: O });
                case 17:
                  return (
                    (e.prev = 17),
                    S('Fetching resource %s', t),
                    (e.next = 21),
                    Object(b.b)(y, t, a)
                  );
                case 21:
                  return (
                    (f = e.sent)['@id'] !== t &&
                      (S(
                        'Resource ID does not match requested resource, patching... Found: %s Expected: %s',
                        f['@id'],
                        t
                      ),
                      (f['@id'] = t)),
                    S('Starting normalize resource %s', t),
                    (l = Object(m.c)(f, r)),
                    (d = l.result),
                    (p = l.entities),
                    S('Finished normalize resource %s', d),
                    (e.next = 28),
                    Object(b.b)(P, o, d, p)
                  );
                case 28:
                  e.next = 35;
                  break;
                case 30:
                  return (
                    (e.prev = 30),
                    (e.t0 = e.catch(17)),
                    S('Error: %O', e.t0),
                    (e.next = 35),
                    Object(b.b)(k, i, t, e.t0)
                  );
                case 35:
                case 'end':
                  return e.stop();
              }
          },
          R,
          this,
          [[17, 30]]
        );
      }
      function B(e) {
        var t = e.payload;
        t.resourceId, g(t, ['resourceId']);
        return s.a.wrap(
          function(e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                case 'end':
                  return e.stop();
              }
          },
          j,
          this
        );
      }
      function D() {
        return s.a.wrap(
          function(e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  return (
                    (e.next = 2),
                    Object(b.a)([Object(b.e)(C, $), Object(b.e)(N, B)])
                  );
                case 2:
                case 'end':
                  return e.stop();
              }
          },
          _,
          this
        );
      }
    },
    P3DY: function(e, t, n) {
      'use strict';
      n.d(t, 'b', function() {
        return f;
      }),
        n.d(t, 'c', function() {
          return l;
        }),
        n.d(t, 'f', function() {
          return d;
        }),
        n.d(t, 'd', function() {
          return b;
        }),
        n.d(t, 'a', function() {
          return O;
        }),
        n.d(t, 'e', function() {
          return E;
        });
      var r,
        a,
        c = n('sxsv'),
        o = n('/hkD'),
        i = n.n(o),
        u =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          };
      var s = Object(c.b)(
          (((r = {}).FRAME_CREATE = function() {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : 'default-frame',
              n = e.resourceType,
              r = e.resourceId,
              a = (function(e, t) {
                var n = {};
                for (var r in e)
                  t.indexOf(r) >= 0 ||
                    (Object.prototype.hasOwnProperty.call(e, r) &&
                      (n[r] = e[r]));
                return n;
              })(e, ['resourceType', 'resourceId']);
            return { frameId: t, resourceType: n, resourceId: r, config: a };
          }),
          (r.FRAME_DELETE = function(e) {
            return { frameId: e };
          }),
          (r.FRAME_SET_INITIAL_RESOURCE = function() {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = e.resourceType,
              n = e.resourceId,
              r =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : 'default-frame';
            return { frameId: r, resourceType: t, resourceId: n };
          }),
          (r.FRAME_GO_TO_RESOURCE = function() {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = e.resourceType,
              n = e.resourceId,
              r = e.smartJump,
              a = void 0 === r || r,
              c =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : 'default-frame';
            return { frameId: c, resourceType: t, resourceId: n, smartJump: a };
          }),
          (r.FRAME_GO_BACK = function() {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 'default-frame';
            return { frameId: e };
          }),
          (r.FRAME_GO_BACK_TO_TYPE = function(e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 'default-frame';
            return { frameId: t, resourceType: e };
          }),
          (r.FRAME_GO_FORWARD = function() {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 'default-frame';
            return { frameId: e };
          }),
          (r.FRAME_ENABLE_EXTENSION = function(e, t) {
            var n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : 'default-frame';
            return { extensionId: e, extensionConfig: t, frameId: n };
          }),
          (r.FRAME_CONFIGURE_EXTENSION = function(e, t) {
            var n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : 'default-frame';
            return { extensionId: e, extensionConfig: t, frameId: n };
          }),
          (r.FRAME_DISABLE_EXTENSION = function(e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 'default-frame';
            return { extensionId: e, frameId: t };
          }),
          (r.FRAME_NEXT_CANVAS = function() {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 'default-frame';
            return { frameId: e };
          }),
          (r.FRAME_PREVIOUS_CANVAS = function() {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 'default-frame';
            return { frameId: e };
          }),
          (r.FRAME_FOCUS = function() {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : 'default-frame';
            return { frameId: e };
          }),
          r)
        ),
        f = s.frameCreate,
        l = s.frameDelete,
        d = s.frameSetInitialResource,
        p = s.frameGoToResource,
        h = s.frameGoBack,
        m = (s.frameGoBackToType, s.frameGoForward),
        b = s.frameEnableExtension,
        O = s.frameConfigureExtension,
        v = s.frameDisableExtension,
        E = (s.frameNextCanvas, s.framePreviousCanvas, s.frameFocus);
      Object(c.c)(
        (((a = {})[f] = function(e, t) {
          var n,
            r = t.payload,
            a = r.frameId,
            c = r.resourceType,
            o = r.resourceId,
            u = r.config;
          return i()(e, {
            focusedFrame: { $set: a },
            list: ((n = {}),
            (n[a] = {
              $set: {
                id: a,
                current: 0,
                path: o && c ? [{ id: o, schema: c }] : [],
                enabledExtensions: [],
                extensions: {},
                config: u,
              },
            }),
            n),
          });
        }),
        (a[l] = function(e, t) {
          var n = t.payload.frameId;
          return i()(e, {
            focusedFrame: {
              $apply: function(e) {
                return e === n ? null : e;
              },
            },
            list: {
              $apply: function(e) {
                return (e[n] = null), delete e[n], u({}, e);
              },
            },
          });
        }),
        (a[d] = function(e, t) {
          var n,
            r = t.payload,
            a = r.frameId,
            c = r.resourceType,
            o = r.resourceId;
          return i()(e, {
            list: ((n = {}),
            (n[a] = {
              current: { $set: 0 },
              path: { $set: [{ id: o, schema: c }] },
            }),
            n),
          });
        }),
        (a[p] = function(e, t) {
          var n,
            r = t.payload,
            a = r.frameId,
            c = r.resourceType,
            o = r.resourceId,
            u = r.smartJump;
          return i()(e, {
            list: ((n = {}),
            (n[a] = {
              $apply: function(t) {
                if (
                  u &&
                  t.path.filter(function(e) {
                    return e.id === o;
                  }).length
                ) {
                  var n = t.path.reduce(function(e, t) {
                    return e.push(t.id), e;
                  }, []);
                  return i()(t, { current: { $set: n.indexOf(o) } });
                }
                if (0 === t.path.length)
                  return i()(t, {
                    current: { $set: 0 },
                    path: { $set: [{ id: o, schema: c }] },
                  });
                var r = (e.list[a].current || 0) + 1,
                  s = t.path.slice(0, r);
                return (
                  s.push({ id: o, schema: c }),
                  i()(t, { current: { $set: r }, path: { $set: s } })
                );
              },
            }),
            n),
          });
        }),
        (a[h] = function(e, t) {
          var n,
            r = t.payload.frameId;
          return i()(e, {
            list: ((n = {}),
            (n[r] = {
              current: {
                $apply: function(e) {
                  return 0 === e ? 0 : e - 1;
                },
              },
            }),
            n),
          });
        }),
        (a[m] = function(e, t) {
          var n,
            r = t.payload.frameId;
          return i()(e, {
            list: ((n = {}),
            (n[r] = {
              $apply: function(e) {
                return e.path.length - 1 <= e.current
                  ? e
                  : i()(e, { current: { $set: e.current + 1 } });
              },
            }),
            n),
          });
        }),
        (a[b] = function(e, t) {
          var n,
            r,
            a = t.payload,
            c = a.extensionId,
            o = a.extensionConfig,
            u = a.frameId;
          return i()(e, {
            list: ((r = {}),
            (r[u] = {
              enabledExtensions: {
                $apply: function(e) {
                  return -1 === e.indexOf(c) ? [].concat(e, [c]) : e;
                },
              },
              extensions: ((n = {}), (n[c] = { $set: o }), n),
            }),
            r),
          });
        }),
        (a[O] = function(e, t) {
          var n,
            r,
            a = t.payload,
            c = a.extensionId,
            o = a.extensionConfig,
            u = a.frameId;
          return i()(e, {
            list: ((r = {}),
            (r[u] = { extensions: ((n = {}), (n[c] = { $merge: o }), n) }),
            r),
          });
        }),
        (a[v] = function(e, t) {
          var n,
            r = t.payload,
            a = r.extensionId,
            c = r.frameId;
          return i()(e, {
            list: ((n = {}),
            (n[c] = {
              enabledExtensions: {
                $apply: function(e) {
                  return e.reduce(function(e, t) {
                    return t !== a && e.push(t), e;
                  }, []);
                },
              },
            }),
            n),
          });
        }),
        (a[E] = function(e, t) {
          var n = t.payload.frameId;
          return i()(e, { focusedFrame: { $set: n } });
        }),
        a),
        { list: {}, focusedFrame: null }
      );
    },
    SbZA: function(e, t) {},
    XCim: function(e, t, n) {
      'use strict';
      t.a = function(e) {
        if (
          'sc:Manifest' === e['@type'] &&
          e.startCanvas &&
          1 === e.sequences.length
        )
          return r({}, e, {
            startCanvas: null,
            sequences: [r({}, e.sequences[0], { startCanvas: e.startCanvas })],
          });
        return e;
      };
      var r =
        Object.assign ||
        function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        };
    },
    YdZd: function(e, t, n) {
      'use strict';
      var r = n('zKHB'),
        a = n.n(r),
        c = n('gdug'),
        o = a()(function(e, t) {
          return e
            ? 'string' == typeof e
              ? [{ '@language': t, '@value': Object(c.a)(e) }]
              : Array.isArray(e)
                ? null
                : e['@value']
                  ? ((e['@value'] = Object(c.a)(e['@value'])), [e])
                  : Object.keys(e).reduce(function(n, r) {
                      return Array.isArray(e[r])
                        ? [].concat(
                            n,
                            e[r].map(function(e) {
                              return {
                                '@language': '@none' === r ? t : r,
                                '@value': Object(c.a)(e),
                              };
                            })
                          )
                        : [].concat(n, [
                            {
                              '@language': '@none' === r ? t : r,
                              '@value': Object(c.a)(e[r]),
                            },
                          ]);
                    }, [])
            : null;
        });
      t.a = o;
    },
    ZCQz: function(e, t, n) {
      'use strict';
      var r = n('NM+w'),
        a = n('y7Q3'),
        c = n('w+Xp'),
        o = [r.d, a.a, c.a];
      t.a = o;
    },
    ZwHb: function(e, t, n) {
      'use strict';
      n.d(t, 'b', function() {
        return g;
      }),
        n.d(t, 'a', function() {
          return s;
        });
      var r,
        a,
        c = n('sxsv'),
        o = n('/hkD'),
        i = n.n(o),
        u =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          };
      var s = 'default-frame',
        f = Object(c.b)(
          (((r = {}).FRAME_CREATE = function() {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : s,
              n = e.resourceType,
              r = e.resourceId,
              a = (function(e, t) {
                var n = {};
                for (var r in e)
                  t.indexOf(r) >= 0 ||
                    (Object.prototype.hasOwnProperty.call(e, r) &&
                      (n[r] = e[r]));
                return n;
              })(e, ['resourceType', 'resourceId']);
            return { frameId: t, resourceType: n, resourceId: r, config: a };
          }),
          (r.FRAME_DELETE = function(e) {
            return { frameId: e };
          }),
          (r.FRAME_SET_INITIAL_RESOURCE = function() {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = e.resourceType,
              n = e.resourceId,
              r =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : s;
            return { frameId: r, resourceType: t, resourceId: n };
          }),
          (r.FRAME_GO_TO_RESOURCE = function() {
            var e =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              t = e.resourceType,
              n = e.resourceId,
              r = e.smartJump,
              a = void 0 === r || r,
              c =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : s;
            return { frameId: c, resourceType: t, resourceId: n, smartJump: a };
          }),
          (r.FRAME_GO_BACK = function() {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : s;
            return { frameId: e };
          }),
          (r.FRAME_GO_BACK_TO_TYPE = function(e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : s;
            return { frameId: t, resourceType: e };
          }),
          (r.FRAME_GO_FORWARD = function() {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : s;
            return { frameId: e };
          }),
          (r.FRAME_ENABLE_EXTENSION = function(e, t) {
            var n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : s;
            return { extensionId: e, extensionConfig: t, frameId: n };
          }),
          (r.FRAME_CONFIGURE_EXTENSION = function(e, t) {
            var n =
              arguments.length > 2 && void 0 !== arguments[2]
                ? arguments[2]
                : s;
            return { extensionId: e, extensionConfig: t, frameId: n };
          }),
          (r.FRAME_DISABLE_EXTENSION = function(e) {
            var t =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : s;
            return { extensionId: e, frameId: t };
          }),
          (r.FRAME_NEXT_CANVAS = function() {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : s;
            return { frameId: e };
          }),
          (r.FRAME_PREVIOUS_CANVAS = function() {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : s;
            return { frameId: e };
          }),
          (r.FRAME_FOCUS = function() {
            var e =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : s;
            return { frameId: e };
          }),
          r)
        ),
        l = f.frameCreate,
        d = f.frameDelete,
        p = f.frameSetInitialResource,
        h = f.frameGoToResource,
        m = f.frameGoBack,
        b = (f.frameGoBackToType, f.frameGoForward),
        O = f.frameEnableExtension,
        v = f.frameConfigureExtension,
        E = f.frameDisableExtension,
        y = (f.frameNextCanvas, f.framePreviousCanvas, f.frameFocus),
        g = Object(c.c)(
          (((a = {})[l] = function(e, t) {
            var n,
              r = t.payload,
              a = r.frameId,
              c = r.resourceType,
              o = r.resourceId,
              u = r.config;
            return i()(e, {
              focusedFrame: { $set: a },
              list: ((n = {}),
              (n[a] = {
                $set: {
                  id: a,
                  current: 0,
                  path: o && c ? [{ id: o, schema: c }] : [],
                  enabledExtensions: [],
                  extensions: {},
                  config: u,
                },
              }),
              n),
            });
          }),
          (a[d] = function(e, t) {
            var n = t.payload.frameId;
            return i()(e, {
              focusedFrame: {
                $apply: function(e) {
                  return e === n ? null : e;
                },
              },
              list: {
                $apply: function(e) {
                  return (e[n] = null), delete e[n], u({}, e);
                },
              },
            });
          }),
          (a[p] = function(e, t) {
            var n,
              r = t.payload,
              a = r.frameId,
              c = r.resourceType,
              o = r.resourceId;
            return i()(e, {
              list: ((n = {}),
              (n[a] = {
                current: { $set: 0 },
                path: { $set: [{ id: o, schema: c }] },
              }),
              n),
            });
          }),
          (a[h] = function(e, t) {
            var n,
              r = t.payload,
              a = r.frameId,
              c = r.resourceType,
              o = r.resourceId,
              u = r.smartJump;
            return i()(e, {
              list: ((n = {}),
              (n[a] = {
                $apply: function(t) {
                  if (
                    u &&
                    t.path.filter(function(e) {
                      return e.id === o;
                    }).length
                  ) {
                    var n = t.path.reduce(function(e, t) {
                      return e.push(t.id), e;
                    }, []);
                    return i()(t, { current: { $set: n.indexOf(o) } });
                  }
                  if (0 === t.path.length)
                    return i()(t, {
                      current: { $set: 0 },
                      path: { $set: [{ id: o, schema: c }] },
                    });
                  var r = (e.list[a].current || 0) + 1,
                    s = t.path.slice(0, r);
                  return (
                    s.push({ id: o, schema: c }),
                    i()(t, { current: { $set: r }, path: { $set: s } })
                  );
                },
              }),
              n),
            });
          }),
          (a[m] = function(e, t) {
            var n,
              r = t.payload.frameId;
            return i()(e, {
              list: ((n = {}),
              (n[r] = {
                current: {
                  $apply: function(e) {
                    return 0 === e ? 0 : e - 1;
                  },
                },
              }),
              n),
            });
          }),
          (a[b] = function(e, t) {
            var n,
              r = t.payload.frameId;
            return i()(e, {
              list: ((n = {}),
              (n[r] = {
                $apply: function(e) {
                  return e.path.length - 1 <= e.current
                    ? e
                    : i()(e, { current: { $set: e.current + 1 } });
                },
              }),
              n),
            });
          }),
          (a[O] = function(e, t) {
            var n,
              r,
              a = t.payload,
              c = a.extensionId,
              o = a.extensionConfig,
              u = a.frameId;
            return i()(e, {
              list: ((r = {}),
              (r[u] = {
                enabledExtensions: {
                  $apply: function(e) {
                    return -1 === e.indexOf(c) ? [].concat(e, [c]) : e;
                  },
                },
                extensions: ((n = {}), (n[c] = { $set: o }), n),
              }),
              r),
            });
          }),
          (a[v] = function(e, t) {
            var n,
              r,
              a = t.payload,
              c = a.extensionId,
              o = a.extensionConfig,
              u = a.frameId;
            return i()(e, {
              list: ((r = {}),
              (r[u] = { extensions: ((n = {}), (n[c] = { $merge: o }), n) }),
              r),
            });
          }),
          (a[E] = function(e, t) {
            var n,
              r = t.payload,
              a = r.extensionId,
              c = r.frameId;
            return i()(e, {
              list: ((n = {}),
              (n[c] = {
                enabledExtensions: {
                  $apply: function(e) {
                    return e.reduce(function(e, t) {
                      return t !== a && e.push(t), e;
                    }, []);
                  },
                },
              }),
              n),
            });
          }),
          (a[y] = function(e, t) {
            var n = t.payload.frameId;
            return i()(e, { focusedFrame: { $set: n } });
          }),
          a),
          { list: {}, focusedFrame: null }
        );
    },
    b2Or: function(e, t, n) {
      'use strict';
      t.a = function(e) {
        return (
          a()(e).forEach(function(e) {
            ('oa:Annotation' !== e['@type'] &&
              'sc:Sequence' !== e['@type'] &&
              'oa:Choice' !== e['@type']) ||
              e['@id'] ||
              this.update(i({}, e, { '@id': 'https://' + o()(e) }));
          }),
          e
        );
      };
      var r = n('yy4f'),
        a = n.n(r),
        c = n('J0Ce'),
        o = n.n(c),
        i =
          Object.assign ||
          function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = arguments[t];
              for (var r in n)
                Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
          };
    },
    bSkM: function(e, t) {},
    cB7R: function(e, t, n) {
      'use strict';
      n.d(t, 'c', function() {
        return N;
      }),
        n.d(t, 'a', function() {
          return i;
        }),
        n.d(t, 'b', function() {
          return u;
        });
      var r,
        a = n('sxsv'),
        c = n('/hkD'),
        o = n.n(c),
        i = 'ROUTING_SELECT_COLLECTION',
        u = 'ROUTING_SELECT_MANIFEST',
        s = Object(a.a)(i),
        f = (Object(a.a)('ROUTING_NEXT_COLLECTION'),
        Object(a.a)('ROUTING_PREVIOUS_COLLECTION'),
        Object(a.a)('ROUTING_DESELECT_COLLECTION')),
        l = Object(a.a)(u),
        d = (Object(a.a)('ROUTING_NEXT_MANIFEST'),
        Object(a.a)('ROUTING_PREVIOUS_MANIFEST'),
        Object(a.a)('ROUTING_DESELECT_MANIFEST')),
        p = Object(a.a)('ROUTING_SELECT_SEQUENCE'),
        h = (Object(a.a)('ROUTING_NEXT_SEQUENCE'),
        Object(a.a)('ROUTING_PREVIOUS_SEQUENCE'),
        Object(a.a)('ROUTING_DESELECT_SEQUENCE')),
        m = Object(a.a)('ROUTING_SELECT_CANVAS'),
        b = (Object(a.a)('ROUTING_NEXT_CANVAS'),
        Object(a.a)('ROUTING_PREVIOUS_CANVAS'),
        Object(a.a)('ROUTING_DESELECT_CANVAS')),
        O = Object(a.a)('ROUTING_SELECT_ANNOTATION_LIST'),
        v = (Object(a.a)('ROUTING_NEXT_ANNOTATION_LIST'),
        Object(a.a)('ROUTING_PREVIOUS_ANNOTATION_LIST'),
        Object(a.a)('ROUTING_DESELECT_ANNOTATION_LIST')),
        E = Object(a.a)('ROUTING_SELECT_ANNOTATION'),
        y = (Object(a.a)('ROUTING_NEXT_ANNOTATION'),
        Object(a.a)('ROUTING_PREVIOUS_ANNOTATION'),
        Object(a.a)('ROUTING_DESELECT_ANNOTATION')),
        g = Object(a.a)('ROUTING_SELECT_RANGE'),
        I = (Object(a.a)('ROUTING_NEXT_RANGE'),
        Object(a.a)('ROUTING_PREVIOUS_RANGE'),
        Object(a.a)('ROUTING_DESELECT_RANGE')),
        T = Object(a.a)('ROUTING_SELECT_LAYER'),
        R = (Object(a.a)('ROUTING_NEXT_LAYER'),
        Object(a.a)('ROUTING_PREVIOUS_LAYER'),
        Object(a.a)('ROUTING_DESELECT_LAYER')),
        j = Object(a.a)('ROUTING_SELECT_IMAGE_RESOURCE'),
        _ = (Object(a.a)('ROUTING_NEXT_IMAGE_RESOURCE'),
        Object(a.a)('ROUTING_PREVIOUS_IMAGE_RESOURCE'),
        Object(a.a)('ROUTING_DESELECT_IMAGE_RESOURCE')),
        S = function(e) {
          return function(t, n) {
            var r,
              a = n.payload;
            return o()(t, (((r = {})['current' + e] = { $set: a.id }), r));
          };
        },
        C = function(e) {
          return function(t) {
            var n;
            return o()(t, (((n = {})['current' + e] = { $set: null }), n));
          };
        },
        N = Object(a.c)(
          (((r = {})[s] = S('Collection')),
          (r[f] = C('Collection')),
          (r[l] = S('Manifest')),
          (r[d] = C('Manifest')),
          (r[p] = S('Sequence')),
          (r[h] = C('Sequence')),
          (r[m] = S('Canvas')),
          (r[b] = C('Canvas')),
          (r[O] = S('AnnotationList')),
          (r[v] = C('AnnotationList')),
          (r[E] = S('Annotation')),
          (r[y] = C('Annotation')),
          (r[g] = S('Range')),
          (r[I] = C('Range')),
          (r[T] = S('Layer')),
          (r[R] = C('Layer')),
          (r[j] = S('ImageResource')),
          (r[_] = C('ImageResource')),
          r),
          {
            currentSequence: null,
            currentManifest: null,
            currentCanvas: null,
            currentAnnotationList: null,
            currentAnnotation: null,
            currentRange: null,
            currentLayer: null,
            currentImageResource: null,
            currentCollection: null,
          }
        );
    },
    gdug: function(e, t, n) {
      'use strict';
      var r = n('lYOx'),
        a = n.n(r);
      t.a = function e(t) {
        var n =
            arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : ['a', 'b', 'br', 'i', 'img', 'p'],
          r =
            arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '';
        return Array.isArray(t)
          ? t.map(function(t) {
              return e(t, n, r);
            })
          : a()(t, n, r);
      };
    },
    iQfG: function(e, t, n) {
      'use strict';
      var r = n('zKHB'),
        a = n.n(r),
        c = n('fKt1'),
        o = n.n(c),
        i = a()(function(e) {
          return e
            ? e['@value'] || e['@id']
              ? [e]
              : 'string' == typeof e
                ? o.a.isWebUri(e)
                  ? [{ '@id': e }]
                  : null
                : Array.isArray(e)
                  ? i(e[0])
                  : null
            : null;
        });
      t.a = i;
    },
    lVK7: function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = n('yw4T'),
        a = n('IZTr'),
        c = n('ccIB'),
        o = n.n(c),
        i = n('x9tB'),
        u = (n.n(i), n('GQ+1'));
      n('BYFN')('iiif-redux');
      window.localStorage,
        console.log(
          'Running in production v1.0.0',
          '(' + '0df6de8eec1a2a2f88f2eff211ed510af1c0d667'.slice(0, 7) + ')'
        );
      var s = Object(r.a)();
      Object(i.render)(
        o.a.createElement(a.a, { store: s }, o.a.createElement(u.a, null)),
        document.querySelector('#app')
      );
    },
    o0yz: function(e, t, n) {
      'use strict';
      var r = n('HP7d'),
        a = n('9olA'),
        c = n('8fsV'),
        o = n('yy4f'),
        i = n.n(o);
      t.a = function(e) {
        return (
          i()(e).forEach(function(e) {
            switch (this.key) {
              case 'label':
              case 'description':
              case 'attribution':
                this.update(Object(a.a)(e, 'en'));
                break;
              case 'metadata':
                this.update(Object(c.a)(e, 'en'));
                break;
              case 'seeAlso':
              case 'service':
              case 'related':
              case 'rendering':
              case 'within':
                this.update(Object(r.a)(e));
                break;
              case 'startCanvas':
              case 'first':
              case 'last':
              case 'next':
              case 'prev':
                var t = Object(r.a)(e);
                this.update(t && t.length ? t[0] : null);
            }
          }),
          e
        );
      };
    },
    q5pk: function(e, t) {},
    smyc: function(e, t, n) {
      'use strict';
      n.d(t, 'd', function() {
        return s;
      }),
        n.d(t, 'c', function() {
          return l;
        }),
        n.d(t, 'a', function() {
          return p;
        }),
        n.d(t, 'b', function() {
          return h;
        });
      var r = n('zKHB'),
        a = n.n(r),
        c = n('hKf9'),
        o = (n.n(c), n('ZwHb')),
        i = n('MlEz'),
        u = function(e) {
          var t = Object(c.createSelector)(e, function(e) {
              return e.id;
            }),
            n = Object(c.createSelector)(
              t,
              function(e) {
                return e.frames.focusedFrame;
              },
              function(e, t) {
                return t === e;
              }
            ),
            r = Object(c.createSelector)(e, function(e) {
              return e.path;
            }),
            o = Object(c.createSelector)(e, function(e) {
              return e.current;
            }),
            i = Object(c.createSelector)(r, o, function(e, t) {
              return e[t];
            }),
            u = Object(c.createSelector)(i, function(e) {
              return e ? e.id : null;
            }),
            s = Object(c.createSelector)(i, function(e) {
              return e ? e.schema : null;
            }),
            f = a()(function(e) {
              return Object(c.createSelector)(r, function(t) {
                return t.reduce(function(t, n) {
                  return n.schema === e ? n : t;
                }, null);
              });
            }),
            l = Object(c.createSelector)(r, function(e) {
              return e[0] || null;
            }),
            d = Object(c.createSelector)(r, function(e) {
              return e.reduce(function(e, t) {
                return -1 === e.indexOf(t.schema) && e.push(t.schema), e;
              }, []);
            }),
            p = Object(c.createSelector)(o, function(e) {
              return e > 0;
            }),
            h = Object(c.createSelector)(r, o, function(e, t) {
              return 0 !== e.length && e.length - 1 > t;
            }),
            m = Object(c.createSelector)(r, o, function(e, t) {
              return e.length ? e.slice(0, t) : [];
            }),
            b = r,
            O = a()(function(e) {
              return Object(c.createSelector)(m, function(t) {
                return (
                  t.filter(function(t) {
                    return t.schema === e;
                  }).length > 0
                );
              });
            }),
            v = Object(c.createSelector)(e, function(e) {
              return e.extensions;
            }),
            E = Object(c.createSelector)(e, function(e) {
              return Object.keys(e.extensions);
            }),
            y = function(e, t, n) {
              return t[n]
                ? 'string' == typeof t[n] && e[n] && e[n][t[n]]
                  ? { id: n, config: e[n][t[n]] }
                  : { id: n, config: t[n] }
                : { id: n };
            },
            g = Object(c.createSelector)(
              E,
              v,
              function(e) {
                return e;
              },
              function(e, t, n) {
                return e.map(function(e) {
                  return y(n, t, e);
                });
              }
            ),
            I = Object(c.createSelector)(e, function(e) {
              return e.enabledExtensions;
            }),
            T = a()(function(e) {
              return Object(c.createSelector)(I, function(t) {
                return -1 !== t.indexOf(e);
              });
            }),
            R = Object(c.createSelector)(E, I, function(e, t) {
              return e.reduce(function(e, n) {
                return -1 === t.indexOf(n) && e.push(n), e;
              }, []);
            }),
            j = Object(c.createSelector)(
              R,
              v,
              function(e) {
                return e;
              },
              function(e, t, n) {
                return e.map(function(e) {
                  return y(n, t, e);
                });
              }
            ),
            _ = Object(c.createSelector)(
              I,
              v,
              function(e) {
                return e;
              },
              function(e, t, n) {
                return e.map(function(e) {
                  return y(n, t, e);
                });
              }
            );
          return {
            getId: t,
            isFocused: n,
            getCurrentPath: r,
            getCurrentPathIndex: o,
            getCurrentResource: i,
            getCurrentResourceId: u,
            getCurrentResourceType: s,
            getCurrentResourceByType: f,
            getTopLevel: l,
            getAllTypes: d,
            canGoBack: p,
            canGoForward: h,
            getHistory: m,
            getFullHistory: b,
            canGoBackToType: O,
            getAllExtensionIds: E,
            getAllExtensions: g,
            getExtensionById: function(e) {
              return Object(c.createSelector)(
                v,
                function(e) {
                  return e;
                },
                function(t, n) {
                  return y(n, t, e);
                }
              );
            },
            isExtensionEnabled: T,
            getDisabledExtensions: j,
            getEnabledExtensions: _,
          };
        },
        s = (a()(function(e) {
          var t = (arguments.length > 1 && void 0 !== arguments[1]
              ? arguments[1]
              : {}
            ).getId,
            n = void 0 === t ? null : t;
          return function(t, r) {
            var a = n ? n(t, r) : r ? r.frameId : o.a,
              i = e(
                u(function(e) {
                  return e.frames.list[a];
                })
              );
            return (i && '[object Function]' === {}.toString.call(i)
              ? function(e) {
                  return function(t) {
                    return e(t);
                  };
                }
              : c.createStructuredSelector)(i)(t);
          };
        }),
        function(e) {
          return e.frames.focusedFrame;
        }),
        f = function(e) {
          return e.frames.list;
        },
        l = Object(c.createSelector)(f, function(e) {
          return Object.keys(e);
        }),
        d = Object(c.createSelector)(s, f, function(e, t) {
          return t[e];
        }),
        p = function(e) {
          return function(t, n) {
            return s(t)
              ? Object(c.createStructuredSelector)(e(u(d)))(t, n)
              : null;
          };
        },
        h = Object(i.a)(f, u);
    },
    'u+TQ': function(e, t, n) {
      'use strict';
      Object.defineProperty(t, '__esModule', { value: !0 });
      var r = n('NM+w');
      n.d(t, 'resources', function() {
        return r.c;
      }),
        n.d(t, 'dereferenced', function() {
          return r.a;
        });
      var a = n('cB7R');
      n.d(t, 'routing', function() {
        return a.c;
      });
      var c = n('ZwHb');
      n.d(t, 'frames', function() {
        return c.b;
      });
    },
    'w+Xp': function(e, t, n) {
      'use strict';
      n.d(t, 'a', function() {
        return m;
      });
      var r = n('dOW8'),
        a = n.n(r),
        c = n('jmaY'),
        o = n('cB7R'),
        i = n('8D95'),
        u = n('NM+w'),
        s = a.a.mark(h),
        f = a.a.mark(m),
        l = 'MANIFEST_REQUEST',
        d = 'MANIFEST_SUCCESS',
        p = 'MANIFEST_ERROR';
      function h(e) {
        var t = e.payload.id;
        return a.a.wrap(
          function(e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  return (
                    (e.next = 2), Object(c.c)(Object(u.b)(t, [l, d, p], i.b))
                  );
                case 2:
                case 'end':
                  return e.stop();
              }
          },
          s,
          this
        );
      }
      function m() {
        return a.a.wrap(
          function(e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  return (e.next = 2), Object(c.a)([Object(c.e)(o.b, h)]);
                case 2:
                case 'end':
                  return e.stop();
              }
          },
          f,
          this
        );
      }
    },
    y7Q3: function(e, t, n) {
      'use strict';
      n.d(t, 'a', function() {
        return m;
      });
      var r = n('dOW8'),
        a = n.n(r),
        c = n('jmaY'),
        o = n('cB7R'),
        i = n('8D95'),
        u = n('NM+w'),
        s = a.a.mark(h),
        f = a.a.mark(m),
        l = 'COLLECTION_REQUEST',
        d = 'COLLECTION_SUCCESS',
        p = 'COLLECTION_ERROR';
      function h(e) {
        var t = e.payload.id;
        return a.a.wrap(
          function(e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  return (
                    (e.next = 2), Object(c.c)(Object(u.b)(t, [l, d, p], i.a))
                  );
                case 2:
                case 'end':
                  return e.stop();
              }
          },
          s,
          this
        );
      }
      function m() {
        return a.a.wrap(
          function(e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  return (e.next = 2), Object(c.a)([Object(c.e)(o.a, h)]);
                case 2:
                case 'end':
                  return e.stop();
              }
          },
          f,
          this
        );
      }
    },
    yw4T: function(e, t, n) {
      'use strict';
      n('ZCQz'), n('u+TQ');
      var r = n('Ezjh');
      n.d(t, 'a', function() {
        return r.a;
      });
    },
  },
  [0]
);
//# sourceMappingURL=app.04c026a0.js.map
