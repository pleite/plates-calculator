(function (window) {
  "use strict";

  var HISTORY_LIMIT = 60;

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function read(key, fallback, validate) {
    try {
      var raw = window.localStorage.getItem(key);
      if (raw === null) return clone(fallback);
      var value = JSON.parse(raw);
      if (validate && !validate(value)) return clone(fallback);
      return value;
    } catch (error) {
      return clone(fallback);
    }
  }

  function write(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }

  function historyKey(eventId) {
    return "event" + eventId + ".history.v1";
  }

  function validHistory(value) {
    return Array.isArray(value);
  }

  function history(eventId) {
    return read(historyKey(eventId), [], validHistory);
  }

  function createId(eventId) {
    if (window.crypto && typeof window.crypto.randomUUID === "function") {
      return window.crypto.randomUUID();
    }
    return eventId + "-" + Date.now() + "-" + Math.random().toString(16).slice(2);
  }

  function archive(eventId, state, total, summary) {
    var entries = history(eventId);
    var serializedState = JSON.stringify(state);
    if (entries.length && JSON.stringify(entries[0].state) === serializedState) return false;

    entries.unshift({
      id: createId(eventId),
      schemaVersion: 1,
      eventId: eventId,
      timestamp: Date.now(),
      total: total,
      summary: summary,
      state: clone(state)
    });
    if (entries.length > HISTORY_LIMIT) entries.length = HISTORY_LIMIT;
    return write(historyKey(eventId), entries);
  }

  function removeHistory(eventId, id) {
    return write(historyKey(eventId), history(eventId).filter(function (entry) {
      return entry && entry.id !== id;
    }));
  }

  function clearHistory(eventId) {
    return write(historyKey(eventId), []);
  }

  function formatTimestamp(timestamp) {
    try {
      return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short"
      }).format(new Date(timestamp));
    } catch (error) {
      return new Date(timestamp).toLocaleString();
    }
  }

  function renderHistory(eventId, options) {
    var list = document.getElementById(options.listId || "history");
    var clearButton = document.getElementById(options.clearButtonId || "clearHistoryBtn");
    var entries = history(eventId).filter(function (entry) {
      return entry && entry.state && (!options.validateState || options.validateState(entry.state));
    });
    list.innerHTML = "";
    clearButton.disabled = entries.length === 0;
    clearButton.onclick = function () {
      clearHistory(eventId);
      renderHistory(eventId, options);
    };

    if (entries.length === 0) {
      var empty = document.createElement("p");
      empty.className = "hist-empty";
      empty.textContent = options.emptyText || "Cleared scores will appear here.";
      list.appendChild(empty);
      return;
    }

    entries.forEach(function (entry) {
      var item = document.createElement("div");
      item.className = "hist-item";
      var meta = document.createElement("div");
      meta.className = "hist-meta";
      var score = document.createElement("div");
      score.className = "hist-score";
      score.textContent = entry.total;
      var unit = document.createElement("span");
      unit.className = "hist-unit";
      unit.textContent = options.unit || "reps";
      score.appendChild(unit);
      var summary = document.createElement("div");
      summary.className = "hist-summary";
      summary.textContent = entry.summary || "Saved score";
      var time = document.createElement("div");
      time.className = "hist-time";
      time.textContent = formatTimestamp(entry.timestamp);
      meta.appendChild(score);
      meta.appendChild(summary);
      meta.appendChild(time);

      var actions = document.createElement("div");
      actions.className = "hist-actions";
      var restore = document.createElement("button");
      restore.type = "button";
      restore.textContent = "Restore";
      restore.onclick = function () { options.onRestore(clone(entry.state)); };
      var remove = document.createElement("button");
      remove.type = "button";
      remove.className = "btn-warn";
      remove.textContent = "Delete";
      remove.onclick = function () {
        removeHistory(eventId, entry.id);
        renderHistory(eventId, options);
      };
      actions.appendChild(restore);
      actions.appendChild(remove);
      item.appendChild(meta);
      item.appendChild(actions);
      list.appendChild(item);
    });
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in window.navigator) || window.location.protocol === "file:") return;
    window.addEventListener("load", function () {
      window.navigator.serviceWorker.register("sw.js").catch(function () {});
    });
  }

  window.XenomApp = {
    archive: archive,
    clearHistory: clearHistory,
    clone: clone,
    formatTimestamp: formatTimestamp,
    history: history,
    read: read,
    registerServiceWorker: registerServiceWorker,
    renderHistory: renderHistory,
    removeHistory: removeHistory,
    write: write
  };

  registerServiceWorker();
})(window);