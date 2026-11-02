/* Invita - penyimpanan proyek di IndexedDB (cadangan memori bila IndexedDB tidak tersedia) */
(function (g) {
  'use strict';
  const mem = new Map();
  let db = null, usingMemory = false;

  const wrap = r => new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });
  const store = mode => db.transaction('projects', mode).objectStore('projects');

  const Store = {
    get volatile() { return usingMemory; },
    async open() {
      try {
        if (!g.indexedDB) throw new Error('no idb');
        db = await new Promise((res, rej) => {
          const r = indexedDB.open('invita', 1);
          r.onupgradeneeded = () => r.result.createObjectStore('projects', { keyPath: 'id' });
          r.onsuccess = () => res(r.result);
          r.onerror = () => rej(r.error);
          r.onblocked = () => rej(new Error('blocked'));
        });
      } catch (e) { usingMemory = true; }
    },
    async all() { return usingMemory ? [...mem.values()] : wrap(store('readonly').getAll()); },
    async put(p) { if (usingMemory) { mem.set(p.id, p); return; } await wrap(store('readwrite').put(p)); },
    async del(id) { if (usingMemory) { mem.delete(id); return; } await wrap(store('readwrite').delete(id)); },
    async usage() {
      try { if (navigator.storage && navigator.storage.estimate) return await navigator.storage.estimate(); } catch (e) { /* abaikan */ }
      return null;
    }
  };
  g.Invita.Store = Store;
})(window);
