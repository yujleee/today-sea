/*! For license information please see info.app.js.LICENSE.txt */
(() => {
  const t = function (t) {
    return JSON.parse(localStorage.getItem(t));
  };
  const e = [
    { img_id: 1, name: 'clear', img: 'assets/images/clear.png' },
    { img_id: 4, name: 'cloud', img: 'assets/images/cloud.png' },
    { img_id: 3, name: 'fewCloud', img: 'assets/images/few-cloud.png' },
    { img_id: 2, name: 'rain', img: 'assets/images/rain.png' },
    { img_id: 6, name: 'lightRain', img: 'assets/images/light-Rain.png' },
    { img_id: 8, name: 'snow', img: 'assets/images/snow.png' },
    { img_id: 5, name: 'night', img: 'assets/images/night.png' },
  ];
  const r = Number(t('currentTime').time);
  function n(t, e) {
    (e == null || e > t.length) && (e = t.length);
    for (var r = 0, n = new Array(e); r < e; r++) n[r] = t[r];
    return n;
  }
  const o = t('beachInfo').name;
  const i = t('currentTime').time;
  const a = document.querySelector('.beach-info-top');
  const c = document.querySelector('.info-area');
  const u = {
    45: '북-북동',
    90: '북동-동',
    135: '동-남동',
    180: '남동-남',
    225: '남-남서',
    270: '남서-서',
    315: '남-북서',
    360: '북서-북',
  };
  const s = function (t) {
    let s;
    let f;
    let l;
    let h;
    let m;
    const p =
      ((s = t.response.body.items),
      (f = {}),
      s.item.forEach((t) => {
        f[t.category] = t.fcstValue;
      }),
      f);
    (a.querySelector('.beach-name').innerText = o),
      (a.querySelector('.base-time').innerText = '오늘 '.concat(i.slice(0, 2), '시 기준')),
      a
        .querySelector('.weather-img img')
        .setAttribute(
          'src',
          ((l = p.SKY),
          (h = p.PTY),
          (m = ''),
          r >= 2e3
            ? e.find((t) => t.name === 'night').img
            : (Number(h) === 0 && (m = e.find((t) => t.img_id === Number(l)).img),
              Number(h) >= 1 && (m = e.find((t) => t.img_id === Number(h) + 1).img),
              m))
        ),
      (a.querySelector('.current-temp').innerText = ''.concat(p.TMP, '°')),
      (c.querySelector('.humidty').innerText = ''.concat(p.REH, '%')),
      (c.querySelector('.wave').innerText = ''.concat(p.WAV)),
      (c.querySelector('.wind-speed').innerText = ''.concat(p.WSD)),
      (c.querySelector('.wind-direction').innerText = ''.concat(
        (function (t) {
          for (var e = '', r = 0, o = Object.entries(u); r < o.length; r++) {
            const i =
              ((s = o[r]),
              (f = 2),
              (function (t) {
                if (Array.isArray(t)) return t;
              })(s) ||
                (function (t, e) {
                  let r = t == null ? null : (typeof Symbol !== 'undefined' && t[Symbol.iterator]) || t['@@iterator'];
                  if (r != null) {
                    let n;
                    let o;
                    const i = [];
                    let a = !0;
                    let c = !1;
                    try {
                      for (
                        r = r.call(t);
                        !(a = (n = r.next()).done) && (i.push(n.value), !e || i.length !== e);
                        a = !0
                      );
                    } catch (t) {
                      (c = !0), (o = t);
                    } finally {
                      try {
                        a || r.return == null || r.return();
                      } finally {
                        if (c) throw o;
                      }
                    }
                    return i;
                  }
                })(s, f) ||
                (function (t, e) {
                  if (t) {
                    if (typeof t === 'string') return n(t, e);
                    let r = Object.prototype.toString.call(t).slice(8, -1);
                    return (
                      r === 'Object' && t.constructor && (r = t.constructor.name),
                      r === 'Map' || r === 'Set'
                        ? Array.from(t)
                        : r === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                        ? n(t, e)
                        : void 0
                    );
                  }
                })(s, f) ||
                (function () {
                  throw new TypeError(
                    'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
                  );
                })());
            const a = i[0];
            const c = i[1];
            t <= a && (e = c);
          }
          let s;
          let f;
          return e;
        })(p.VEC)
      ));
  };
  const f = document.querySelector('.info-area');
  const l = function (t) {
    let e;
    const r = {
      sunrise: (e = t.response.body.items).item[0].sunrise !== ':' ? e.item[0].sunrise : '정보없음',
      sunset: e.item[0].sunset !== ':' ? e.item[0].sunset : '정보없음',
    };
    (f.querySelector('.sunrise').innerText = r.sunrise), (f.querySelector('.sunset').innerText = r.sunset);
  };
  const h = document.querySelector('.info-area');
  const m = t('currentTime').time;
  const p = ['ET1', 'FT1', 'ET2', 'FT2'];
  const d = function (t) {
    let e;
    let r;
    let n;
    const o =
      ((e = t.response.body.items),
      (r = Object.values(e)),
      (n = {}),
      r[0].forEach((t) => {
        t.tiType === '-' && p.forEach((t) => (n[t] = '정보없음')), (n[t.tiType] = t.tiTime);
      }),
      n);
    let i = '';
    let a = '';
    Number(m.slice(0, 2)) < 12 ? ((i = o.ET1), (a = o.FT1)) : ((i = o.ET2), (a = o.FT2)),
      (h.querySelector('.ebb-tide').innerText = ''.concat(i)),
      (h.querySelector('.flood-tide').innerText = ''.concat(a));
  };
  function y(t) {
    return (
      (y =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t && typeof Symbol === 'function' && t.constructor === Symbol && t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      y(t)
    );
  }
  function v() {
    v = function () {
      return t;
    };
    var t = {};
    const e = Object.prototype;
    const r = e.hasOwnProperty;
    const n = typeof Symbol === 'function' ? Symbol : {};
    const o = n.iterator || '@@iterator';
    const i = n.asyncIterator || '@@asyncIterator';
    const a = n.toStringTag || '@@toStringTag';
    function c(t, e, r) {
      return (
        Object.defineProperty(t, e, {
          value: r,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        }),
        t[e]
      );
    }
    try {
      c({}, '');
    } catch (t) {
      c = function (t, e, r) {
        return (t[e] = r);
      };
    }
    function u(t, e, r, n) {
      const o = e && e.prototype instanceof l ? e : l;
      const i = Object.create(o.prototype);
      const a = new L(n || []);
      return (
        (i._invoke = (function (t, e, r) {
          let n = 'suspendedStart';
          return function (o, i) {
            if (n === 'executing') throw new Error('Generator is already running');
            if (n === 'completed') {
              if (o === 'throw') throw i;
              return { value: void 0, done: !0 };
            }
            for (r.method = o, r.arg = i; ; ) {
              const a = r.delegate;
              if (a) {
                const c = S(a, r);
                if (c) {
                  if (c === f) continue;
                  return c;
                }
              }
              if (r.method === 'next') r.sent = r._sent = r.arg;
              else if (r.method === 'throw') {
                if (n === 'suspendedStart') throw ((n = 'completed'), r.arg);
                r.dispatchException(r.arg);
              } else r.method === 'return' && r.abrupt('return', r.arg);
              n = 'executing';
              const u = s(t, e, r);
              if (u.type === 'normal') {
                if (((n = r.done ? 'completed' : 'suspendedYield'), u.arg === f)) continue;
                return { value: u.arg, done: r.done };
              }
              u.type === 'throw' && ((n = 'completed'), (r.method = 'throw'), (r.arg = u.arg));
            }
          };
        })(t, r, a)),
        i
      );
    }
    function s(t, e, r) {
      try {
        return { type: 'normal', arg: t.call(e, r) };
      } catch (t) {
        return { type: 'throw', arg: t };
      }
    }
    t.wrap = u;
    var f = {};
    function l() {}
    function h() {}
    function m() {}
    let p = {};
    c(p, o, function () {
      return this;
    });
    const d = Object.getPrototypeOf;
    const g = d && d(d(_([])));
    g && g !== e && r.call(g, o) && (p = g);
    const w = (m.prototype = l.prototype = Object.create(p));
    function b(t) {
      ['next', 'throw', 'return'].forEach((e) => {
        c(t, e, function (t) {
          return this._invoke(e, t);
        });
      });
    }
    function x(t, e) {
      function n(o, i, a, c) {
        const u = s(t[o], t, i);
        if (u.type !== 'throw') {
          const f = u.arg;
          const l = f.value;
          return l && y(l) == 'object' && r.call(l, '__await')
            ? e.resolve(l.__await).then(
                (t) => {
                  n('next', t, a, c);
                },
                (t) => {
                  n('throw', t, a, c);
                }
              )
            : e.resolve(l).then(
                (t) => {
                  (f.value = t), a(f);
                },
                (t) => n('throw', t, a, c)
              );
        }
        c(u.arg);
      }
      let o;
      this._invoke = function (t, r) {
        function i() {
          return new e((e, o) => {
            n(t, r, e, o);
          });
        }
        return (o = o ? o.then(i, i) : i());
      };
    }
    function S(t, e) {
      const r = t.iterator[e.method];
      if (void 0 === r) {
        if (((e.delegate = null), e.method === 'throw')) {
          if (t.iterator.return && ((e.method = 'return'), (e.arg = void 0), S(t, e), e.method === 'throw')) return f;
          (e.method = 'throw'), (e.arg = new TypeError("The iterator does not provide a 'throw' method"));
        }
        return f;
      }
      const n = s(r, t.iterator, e.arg);
      if (n.type === 'throw') return (e.method = 'throw'), (e.arg = n.arg), (e.delegate = null), f;
      const o = n.arg;
      return o
        ? o.done
          ? ((e[t.resultName] = o.value),
            (e.next = t.nextLoc),
            e.method !== 'return' && ((e.method = 'next'), (e.arg = void 0)),
            (e.delegate = null),
            f)
          : o
        : ((e.method = 'throw'), (e.arg = new TypeError('iterator result is not an object')), (e.delegate = null), f);
    }
    function T(t) {
      const e = { tryLoc: t[0] };
      1 in t && (e.catchLoc = t[1]), 2 in t && ((e.finallyLoc = t[2]), (e.afterLoc = t[3])), this.tryEntries.push(e);
    }
    function E(t) {
      const e = t.completion || {};
      (e.type = 'normal'), delete e.arg, (t.completion = e);
    }
    function L(t) {
      (this.tryEntries = [{ tryLoc: 'root' }]), t.forEach(T, this), this.reset(!0);
    }
    function _(t) {
      if (t) {
        const e = t[o];
        if (e) return e.call(t);
        if (typeof t.next === 'function') return t;
        if (!isNaN(t.length)) {
          let n = -1;
          const i = function e() {
            for (; ++n < t.length; ) if (r.call(t, n)) return (e.value = t[n]), (e.done = !1), e;
            return (e.value = void 0), (e.done = !0), e;
          };
          return (i.next = i);
        }
      }
      return { next: O };
    }
    function O() {
      return { value: void 0, done: !0 };
    }
    return (
      (h.prototype = m),
      c(w, 'constructor', m),
      c(m, 'constructor', h),
      (h.displayName = c(m, a, 'GeneratorFunction')),
      (t.isGeneratorFunction = function (t) {
        const e = typeof t === 'function' && t.constructor;
        return !!e && (e === h || (e.displayName || e.name) === 'GeneratorFunction');
      }),
      (t.mark = function (t) {
        return (
          Object.setPrototypeOf ? Object.setPrototypeOf(t, m) : ((t.__proto__ = m), c(t, a, 'GeneratorFunction')),
          (t.prototype = Object.create(w)),
          t
        );
      }),
      (t.awrap = function (t) {
        return { __await: t };
      }),
      b(x.prototype),
      c(x.prototype, i, function () {
        return this;
      }),
      (t.AsyncIterator = x),
      (t.async = function (e, r, n, o, i) {
        void 0 === i && (i = Promise);
        const a = new x(u(e, r, n, o), i);
        return t.isGeneratorFunction(r) ? a : a.next().then((t) => (t.done ? t.value : a.next()));
      }),
      b(w),
      c(w, a, 'Generator'),
      c(w, o, function () {
        return this;
      }),
      c(w, 'toString', () => '[object Generator]'),
      (t.keys = function (t) {
        const e = [];
        for (const r in t) e.push(r);
        return (
          e.reverse(),
          function r() {
            for (; e.length; ) {
              const n = e.pop();
              if (n in t) return (r.value = n), (r.done = !1), r;
            }
            return (r.done = !0), r;
          }
        );
      }),
      (t.values = _),
      (L.prototype = {
        constructor: L,
        reset(t) {
          if (
            ((this.prev = 0),
            (this.next = 0),
            (this.sent = this._sent = void 0),
            (this.done = !1),
            (this.delegate = null),
            (this.method = 'next'),
            (this.arg = void 0),
            this.tryEntries.forEach(E),
            !t)
          ) {
            for (const e in this) e.charAt(0) === 't' && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0);
          }
        },
        stop() {
          this.done = !0;
          const t = this.tryEntries[0].completion;
          if (t.type === 'throw') throw t.arg;
          return this.rval;
        },
        dispatchException(t) {
          if (this.done) throw t;
          const e = this;
          function n(r, n) {
            return (a.type = 'throw'), (a.arg = t), (e.next = r), n && ((e.method = 'next'), (e.arg = void 0)), !!n;
          }
          for (let o = this.tryEntries.length - 1; o >= 0; --o) {
            const i = this.tryEntries[o];
            var a = i.completion;
            if (i.tryLoc === 'root') return n('end');
            if (i.tryLoc <= this.prev) {
              const c = r.call(i, 'catchLoc');
              const u = r.call(i, 'finallyLoc');
              if (c && u) {
                if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
                if (this.prev < i.finallyLoc) return n(i.finallyLoc);
              } else if (c) {
                if (this.prev < i.catchLoc) return n(i.catchLoc, !0);
              } else {
                if (!u) throw new Error('try statement without catch or finally');
                if (this.prev < i.finallyLoc) return n(i.finallyLoc);
              }
            }
          }
        },
        abrupt(t, e) {
          for (let n = this.tryEntries.length - 1; n >= 0; --n) {
            const o = this.tryEntries[n];
            if (o.tryLoc <= this.prev && r.call(o, 'finallyLoc') && this.prev < o.finallyLoc) {
              var i = o;
              break;
            }
          }
          i && (t === 'break' || t === 'continue') && i.tryLoc <= e && e <= i.finallyLoc && (i = null);
          const a = i ? i.completion : {};
          return (
            (a.type = t), (a.arg = e), i ? ((this.method = 'next'), (this.next = i.finallyLoc), f) : this.complete(a)
          );
        },
        complete(t, e) {
          if (t.type === 'throw') throw t.arg;
          return (
            t.type === 'break' || t.type === 'continue'
              ? (this.next = t.arg)
              : t.type === 'return'
              ? ((this.rval = this.arg = t.arg), (this.method = 'return'), (this.next = 'end'))
              : t.type === 'normal' && e && (this.next = e),
            f
          );
        },
        finish(t) {
          for (let e = this.tryEntries.length - 1; e >= 0; --e) {
            const r = this.tryEntries[e];
            if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), E(r), f;
          }
        },
        catch(t) {
          for (let e = this.tryEntries.length - 1; e >= 0; --e) {
            const r = this.tryEntries[e];
            if (r.tryLoc === t) {
              const n = r.completion;
              if (n.type === 'throw') {
                var o = n.arg;
                E(r);
              }
              return o;
            }
          }
          throw new Error('illegal catch attempt');
        },
        delegateYield(t, e, r) {
          return (
            (this.delegate = { iterator: _(t), resultName: e, nextLoc: r }),
            this.method === 'next' && (this.arg = void 0),
            f
          );
        },
      }),
      t
    );
  }
  function g(t, e, r, n, o, i, a) {
    try {
      var c = t[i](a);
      var u = c.value;
    } catch (t) {
      return void r(t);
    }
    c.done ? e(u) : Promise.resolve(u).then(n, o);
  }
  function w(t) {
    return function () {
      const e = this;
      const r = arguments;
      return new Promise((n, o) => {
        const i = t.apply(e, r);
        function a(t) {
          g(i, n, o, a, c, 'next', t);
        }
        function c(t) {
          g(i, n, o, a, c, 'throw', t);
        }
        a(void 0);
      });
    };
  }
  const b = 'https://apis.data.go.kr/1360000/BeachInfoservice';
  const x = 'JgOTEFegmT85gM1vQ7XNalEJFJb0gusFB26pkZkBameKaU3B5WlTltcyt6xWvGR8aNvLvw7Jw6gqnQSiMm6KgQ%3D%3D';
  const S = t('beachInfo').num;
  const T = { date: t('currentTime').date, time: t('currentTime').time };
  const E = (function () {
    const t = w(
      v().mark(function t() {
        return v().wrap((t) => {
          for (;;) {
            switch ((t.prev = t.next)) {
              case 0:
                return (
                  (t.next = 2),
                  fetch(
                    ''
                      .concat(b, '/getVilageFcstBeach?serviceKey=')
                      .concat(x, '&dataType=JSON&base_date=')
                      .concat(T.date, '&base_time=')
                      .concat(T.time, '&beach_num=')
                      .concat(S, '&numOfRows=20')
                  )
                    .then((t) => t.json())
                    .then((t) => {
                      document.querySelector('.loading').classList.remove('before-load'), s(t);
                    })
                    .catch((t) => {
                      console.error(t);
                    })
                );
              case 2:
              case 'end':
                return t.stop();
            }
          }
        }, t);
      })
    );
    return function () {
      return t.apply(this, arguments);
    };
  })();
  const L = (function () {
    const t = w(
      v().mark(function t() {
        return v().wrap((t) => {
          for (;;) {
            switch ((t.prev = t.next)) {
              case 0:
                return (
                  (t.next = 2),
                  fetch(
                    ''
                      .concat(b, '/getSunInfoBeach?serviceKey=')
                      .concat(x, '&dataType=JSON&base_date=')
                      .concat(T.date, '&beach_num=')
                      .concat(S)
                  )
                    .then((t) => t.json())
                    .then((t) => l(t))
                    .catch((t) => {
                      console.error(t);
                    })
                );
              case 2:
              case 'end':
                return t.stop();
            }
          }
        }, t);
      })
    );
    return function () {
      return t.apply(this, arguments);
    };
  })();
  const _ = (function () {
    const t = w(
      v().mark(function t() {
        return v().wrap((t) => {
          for (;;) {
            switch ((t.prev = t.next)) {
              case 0:
                return (
                  (t.next = 2),
                  fetch(
                    ''
                      .concat(b, '/getTideInfoBeach?serviceKey=')
                      .concat(x, '&dataType=JSON&base_date=')
                      .concat(T.date, '&beach_num=')
                      .concat(S)
                  )
                    .then((t) => t.json())
                    .then((t) => {
                      d(t),
                        document.querySelector('.loading').addEventListener('transitionend', (t) => {
                          document.body.removeChild(t.currentTarget);
                        });
                    })
                    .catch((t) => {
                      console.error(t);
                    })
                );
              case 2:
              case 'end':
                return t.stop();
            }
          }
        }, t);
      })
    );
    return function () {
      return t.apply(this, arguments);
    };
  })();
  const O = (function () {
    const t = w(
      v().mark(function t() {
        return v().wrap((t) => {
          for (;;) {
            switch ((t.prev = t.next)) {
              case 0:
                E(), L(), _();
              case 3:
              case 'end':
                return t.stop();
            }
          }
        }, t);
      })
    );
    return function () {
      return t.apply(this, arguments);
    };
  })();
  window.onload = function () {
    O(), console.log('app running');
  };
})();
