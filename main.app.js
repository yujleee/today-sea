/*! For license information please see main.app.js.LICENSE.txt */
(() => {
  const t = function (t, r) {
    localStorage.setItem(t, JSON.stringify(r));
  };
  function r(t) {
    return (
      (r =
        typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol'
          ? function (t) {
              return typeof t;
            }
          : function (t) {
              return t && typeof Symbol === 'function' && t.constructor === Symbol && t !== Symbol.prototype
                ? 'symbol'
                : typeof t;
            }),
      r(t)
    );
  }
  function e(t, r) {
    return (
      (function (t) {
        if (Array.isArray(t)) return t;
      })(t) ||
      (function (t, r) {
        let e = t == null ? null : (typeof Symbol !== 'undefined' && t[Symbol.iterator]) || t['@@iterator'];
        if (e != null) {
          let n;
          let o;
          const i = [];
          let a = !0;
          let c = !1;
          try {
            for (e = e.call(t); !(a = (n = e.next()).done) && (i.push(n.value), !r || i.length !== r); a = !0);
          } catch (t) {
            (c = !0), (o = t);
          } finally {
            try {
              a || e.return == null || e.return();
            } finally {
              if (c) throw o;
            }
          }
          return i;
        }
      })(t, r) ||
      (function (t, r) {
        if (t) {
          if (typeof t === 'string') return n(t, r);
          let e = Object.prototype.toString.call(t).slice(8, -1);
          return (
            e === 'Object' && t.constructor && (e = t.constructor.name),
            e === 'Map' || e === 'Set'
              ? Array.from(t)
              : e === 'Arguments' || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)
              ? n(t, r)
              : void 0
          );
        }
      })(t, r) ||
      (function () {
        throw new TypeError(
          'Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
        );
      })()
    );
  }
  function n(t, r) {
    (r == null || r > t.length) && (r = t.length);
    for (var e = 0, n = new Array(r); e < r; e++) n[e] = t[e];
    return n;
  }
  function o() {
    o = function () {
      return t;
    };
    var t = {};
    const e = Object.prototype;
    const n = e.hasOwnProperty;
    const i = typeof Symbol === 'function' ? Symbol : {};
    const a = i.iterator || '@@iterator';
    const c = i.asyncIterator || '@@asyncIterator';
    const u = i.toStringTag || '@@toStringTag';
    function s(t, r, e) {
      return (
        Object.defineProperty(t, r, {
          value: e,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        }),
        t[r]
      );
    }
    try {
      s({}, '');
    } catch (t) {
      s = function (t, r, e) {
        return (t[r] = e);
      };
    }
    function l(t, r, e, n) {
      const o = r && r.prototype instanceof p ? r : p;
      const i = Object.create(o.prototype);
      const a = new S(n || []);
      return (
        (i._invoke = (function (t, r, e) {
          let n = 'suspendedStart';
          return function (o, i) {
            if (n === 'executing') throw new Error('Generator is already running');
            if (n === 'completed') {
              if (o === 'throw') throw i;
              return { value: void 0, done: !0 };
            }
            for (e.method = o, e.arg = i; ; ) {
              const a = e.delegate;
              if (a) {
                const c = L(a, e);
                if (c) {
                  if (c === h) continue;
                  return c;
                }
              }
              if (e.method === 'next') e.sent = e._sent = e.arg;
              else if (e.method === 'throw') {
                if (n === 'suspendedStart') throw ((n = 'completed'), e.arg);
                e.dispatchException(e.arg);
              } else e.method === 'return' && e.abrupt('return', e.arg);
              n = 'executing';
              const u = f(t, r, e);
              if (u.type === 'normal') {
                if (((n = e.done ? 'completed' : 'suspendedYield'), u.arg === h)) continue;
                return { value: u.arg, done: e.done };
              }
              u.type === 'throw' && ((n = 'completed'), (e.method = 'throw'), (e.arg = u.arg));
            }
          };
        })(t, e, a)),
        i
      );
    }
    function f(t, r, e) {
      try {
        return { type: 'normal', arg: t.call(r, e) };
      } catch (t) {
        return { type: 'throw', arg: t };
      }
    }
    t.wrap = l;
    var h = {};
    function p() {}
    function v() {}
    function y() {}
    let d = {};
    s(d, a, function () {
      return this;
    });
    const m = Object.getPrototypeOf;
    const g = m && m(m(j([])));
    g && g !== e && n.call(g, a) && (d = g);
    const w = (y.prototype = p.prototype = Object.create(d));
    function b(t) {
      ['next', 'throw', 'return'].forEach((r) => {
        s(t, r, function (t) {
          return this._invoke(r, t);
        });
      });
    }
    function x(t, e) {
      function o(i, a, c, u) {
        const s = f(t[i], t, a);
        if (s.type !== 'throw') {
          const l = s.arg;
          const h = l.value;
          return h && r(h) == 'object' && n.call(h, '__await')
            ? e.resolve(h.__await).then(
                (t) => {
                  o('next', t, c, u);
                },
                (t) => {
                  o('throw', t, c, u);
                }
              )
            : e.resolve(h).then(
                (t) => {
                  (l.value = t), c(l);
                },
                (t) => o('throw', t, c, u)
              );
        }
        u(s.arg);
      }
      let i;
      this._invoke = function (t, r) {
        function n() {
          return new e((e, n) => {
            o(t, r, e, n);
          });
        }
        return (i = i ? i.then(n, n) : n());
      };
    }
    function L(t, r) {
      const e = t.iterator[r.method];
      if (void 0 === e) {
        if (((r.delegate = null), r.method === 'throw')) {
          if (t.iterator.return && ((r.method = 'return'), (r.arg = void 0), L(t, r), r.method === 'throw')) return h;
          (r.method = 'throw'), (r.arg = new TypeError("The iterator does not provide a 'throw' method"));
        }
        return h;
      }
      const n = f(e, t.iterator, r.arg);
      if (n.type === 'throw') return (r.method = 'throw'), (r.arg = n.arg), (r.delegate = null), h;
      const o = n.arg;
      return o
        ? o.done
          ? ((r[t.resultName] = o.value),
            (r.next = t.nextLoc),
            r.method !== 'return' && ((r.method = 'next'), (r.arg = void 0)),
            (r.delegate = null),
            h)
          : o
        : ((r.method = 'throw'), (r.arg = new TypeError('iterator result is not an object')), (r.delegate = null), h);
    }
    function E(t) {
      const r = { tryLoc: t[0] };
      1 in t && (r.catchLoc = t[1]), 2 in t && ((r.finallyLoc = t[2]), (r.afterLoc = t[3])), this.tryEntries.push(r);
    }
    function k(t) {
      const r = t.completion || {};
      (r.type = 'normal'), delete r.arg, (t.completion = r);
    }
    function S(t) {
      (this.tryEntries = [{ tryLoc: 'root' }]), t.forEach(E, this), this.reset(!0);
    }
    function j(t) {
      if (t) {
        const r = t[a];
        if (r) return r.call(t);
        if (typeof t.next === 'function') return t;
        if (!isNaN(t.length)) {
          let e = -1;
          const o = function r() {
            for (; ++e < t.length; ) if (n.call(t, e)) return (r.value = t[e]), (r.done = !1), r;
            return (r.value = void 0), (r.done = !0), r;
          };
          return (o.next = o);
        }
      }
      return { next: O };
    }
    function O() {
      return { value: void 0, done: !0 };
    }
    return (
      (v.prototype = y),
      s(w, 'constructor', y),
      s(y, 'constructor', v),
      (v.displayName = s(y, u, 'GeneratorFunction')),
      (t.isGeneratorFunction = function (t) {
        const r = typeof t === 'function' && t.constructor;
        return !!r && (r === v || (r.displayName || r.name) === 'GeneratorFunction');
      }),
      (t.mark = function (t) {
        return (
          Object.setPrototypeOf ? Object.setPrototypeOf(t, y) : ((t.__proto__ = y), s(t, u, 'GeneratorFunction')),
          (t.prototype = Object.create(w)),
          t
        );
      }),
      (t.awrap = function (t) {
        return { __await: t };
      }),
      b(x.prototype),
      s(x.prototype, c, function () {
        return this;
      }),
      (t.AsyncIterator = x),
      (t.async = function (r, e, n, o, i) {
        void 0 === i && (i = Promise);
        const a = new x(l(r, e, n, o), i);
        return t.isGeneratorFunction(e) ? a : a.next().then((t) => (t.done ? t.value : a.next()));
      }),
      b(w),
      s(w, u, 'Generator'),
      s(w, a, function () {
        return this;
      }),
      s(w, 'toString', () => '[object Generator]'),
      (t.keys = function (t) {
        const r = [];
        for (const e in t) r.push(e);
        return (
          r.reverse(),
          function e() {
            for (; r.length; ) {
              const n = r.pop();
              if (n in t) return (e.value = n), (e.done = !1), e;
            }
            return (e.done = !0), e;
          }
        );
      }),
      (t.values = j),
      (S.prototype = {
        constructor: S,
        reset(t) {
          if (
            ((this.prev = 0),
            (this.next = 0),
            (this.sent = this._sent = void 0),
            (this.done = !1),
            (this.delegate = null),
            (this.method = 'next'),
            (this.arg = void 0),
            this.tryEntries.forEach(k),
            !t)
          )
            for (const r in this) r.charAt(0) === 't' && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = void 0);
        },
        stop() {
          this.done = !0;
          const t = this.tryEntries[0].completion;
          if (t.type === 'throw') throw t.arg;
          return this.rval;
        },
        dispatchException(t) {
          if (this.done) throw t;
          const r = this;
          function e(e, n) {
            return (a.type = 'throw'), (a.arg = t), (r.next = e), n && ((r.method = 'next'), (r.arg = void 0)), !!n;
          }
          for (let o = this.tryEntries.length - 1; o >= 0; --o) {
            const i = this.tryEntries[o];
            var a = i.completion;
            if (i.tryLoc === 'root') return e('end');
            if (i.tryLoc <= this.prev) {
              const c = n.call(i, 'catchLoc');
              const u = n.call(i, 'finallyLoc');
              if (c && u) {
                if (this.prev < i.catchLoc) return e(i.catchLoc, !0);
                if (this.prev < i.finallyLoc) return e(i.finallyLoc);
              } else if (c) {
                if (this.prev < i.catchLoc) return e(i.catchLoc, !0);
              } else {
                if (!u) throw new Error('try statement without catch or finally');
                if (this.prev < i.finallyLoc) return e(i.finallyLoc);
              }
            }
          }
        },
        abrupt(t, r) {
          for (let e = this.tryEntries.length - 1; e >= 0; --e) {
            const o = this.tryEntries[e];
            if (o.tryLoc <= this.prev && n.call(o, 'finallyLoc') && this.prev < o.finallyLoc) {
              var i = o;
              break;
            }
          }
          i && (t === 'break' || t === 'continue') && i.tryLoc <= r && r <= i.finallyLoc && (i = null);
          const a = i ? i.completion : {};
          return (
            (a.type = t), (a.arg = r), i ? ((this.method = 'next'), (this.next = i.finallyLoc), h) : this.complete(a)
          );
        },
        complete(t, r) {
          if (t.type === 'throw') throw t.arg;
          return (
            t.type === 'break' || t.type === 'continue'
              ? (this.next = t.arg)
              : t.type === 'return'
              ? ((this.rval = this.arg = t.arg), (this.method = 'return'), (this.next = 'end'))
              : t.type === 'normal' && r && (this.next = r),
            h
          );
        },
        finish(t) {
          for (let r = this.tryEntries.length - 1; r >= 0; --r) {
            const e = this.tryEntries[r];
            if (e.finallyLoc === t) return this.complete(e.completion, e.afterLoc), k(e), h;
          }
        },
        catch(t) {
          for (let r = this.tryEntries.length - 1; r >= 0; --r) {
            const e = this.tryEntries[r];
            if (e.tryLoc === t) {
              const n = e.completion;
              if (n.type === 'throw') {
                var o = n.arg;
                k(e);
              }
              return o;
            }
          }
          throw new Error('illegal catch attempt');
        },
        delegateYield(t, r, e) {
          return (
            (this.delegate = { iterator: j(t), resultName: r, nextLoc: e }),
            this.method === 'next' && (this.arg = void 0),
            h
          );
        },
      }),
      t
    );
  }
  function i(t, r, e, n, o, i, a) {
    try {
      var c = t[i](a);
      var u = c.value;
    } catch (t) {
      return void e(t);
    }
    c.done ? r(u) : Promise.resolve(u).then(n, o);
  }
  function a(t) {
    return function () {
      const r = this;
      const e = arguments;
      return new Promise((n, o) => {
        const a = t.apply(r, e);
        function c(t) {
          i(a, n, o, c, u, 'next', t);
        }
        function u(t) {
          i(a, n, o, c, u, 'throw', t);
        }
        c(void 0);
      });
    };
  }
  function c() {
    const r = this;
    const n = [2, 5, 8, 11, 14, 17, 20, 23];
    const i = document.querySelector('.input-search');
    const c = i.parentNode;
    const u = document.querySelector('.result-list');
    let s = {};
    const l = [];
    (this.searchCount = -1), (this.searchMaxCount = 0);
    const f = {};
    const h = function (t) {
      const r = n.findIndex((r) => t <= r);
      const e = n[r - 1];
      return e < 10 ? '0'.concat(e, '00') : ''.concat(e, '00');
    };
    const p = (function () {
      const t = a(
        o().mark(function t() {
          let r;
          let e;
          let n;
          let i;
          return o().wrap((t) => {
            for (;;)
              switch ((t.prev = t.next)) {
                case 0:
                  return (
                    (r = new Date()),
                    (e = r.getFullYear()),
                    (n = r.toLocaleString('ko-KO', { month: '2-digit' }).slice(0, 2)),
                    (i = r.toLocaleString('ko-KO', { day: '2-digit' }).slice(0, 2)),
                    (f.date = ''.concat(e).concat(n).concat(i)),
                    (f.time = h(r.getHours())),
                    t.abrupt('return', f)
                  );
                case 7:
                case 'end':
                  return t.stop();
              }
          }, t);
        })
      );
      return function () {
        return t.apply(this, arguments);
      };
    })();
    const v = (function () {
      const t = a(
        o().mark(function t() {
          return o().wrap((t) => {
            for (;;) {
              switch ((t.prev = t.next)) {
                case 0:
                  return (
                    (t.next = 2),
                    fetch('assets/beachData.json')
                      .then((t) => t.json())
                      .then((t) => (s = Object.values(t)))
                      .then((t) => {
                        for (let r = 0, n = Object.entries(t); r < n.length; r++) {
                          const o = e(n[r], 2);
                          const i = o[0];
                          const a = o[1];
                          l[i] = a.name;
                        }
                        return l;
                      })
                      .catch((t) => console.error(t))
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
    v();
    const y = function (r) {
      for (
        var n = i.value.length === 1 ? r.target.innerText : i.value, o = 1, a = 0, u = Object.entries(s);
        a < u.length;
        a++
      ) {
        const l = e(u[a], 2);
        const h = (l[0], l[1]);
        h.name === n && (o = h['beach-num']);
      }
      i.value = n;
      const v = { num: o, name: n };
      p(), t('beachInfo', v), t('currentTime', { date: f.date, time: f.time }), c.submit();
    };
    const d = function (t) {
      r.searchCount >= r.searchMaxCount
        ? (r.searchCount = -1)
        : (r.searchCount > r.searchMaxCount || r.searchCount < 0) && (r.searchCount = r.searchMaxCount);
      const e = u.childNodes[r.searchCount];
      switch (t.key) {
        case 'ArrowUp':
          r.searchCount -= 1;
          break;
        case 'ArrowDown':
          r.searchCount += 1;
          break;
        case 'Enter':
          (i.value = e.innerText), y();
      }
      e.classList.toggle('is-active');
    };
    i.addEventListener('keyup', (t) => {
      let e;
      let n;
      t.key !== 'backspace' &&
        (u.parentNode.classList.add('is-active'),
        (n = []),
        (e = i.value) !== '' &&
          (n = l
            .filter((t) => t.toLowerCase().startsWith(e))
            .map((t) => '<li>'.concat(t, '</li>'))
            .join('')),
        (u.innerHTML = n),
        (r.searchMaxCount = u.childElementCount)),
        (t.key !== 'ArrowUp' && t.key !== 'ArrowDown') || d(t);
    }),
      i.addEventListener('keydown', (t) => {
        t.key === 'Enter' && (t.preventDefault(), d(t));
      }),
      u.addEventListener('click', (t) => {
        y(t);
      });
  }
  window.onload = function () {
    new c();
  };
})();
