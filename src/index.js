class IdleSessionLogout {
    constructor({
      timeout = 30 * 60 * 1000,
      onTimeout = null,
      events = ['mousemove','mousedown','keydown','scroll','touchstart'],
      popupMessage = "You've been inactive for 30 minutes.",
    } = {}) {
      this.timeout = timeout;
      this.onTimeout = onTimeout;
      this.events = events;
      this.popupMessage = popupMessage;
  
      this._timerId = null;
      this._activityHandler = this._resetTimer.bind(this);
      this._origFetch = null;
      this._origXHR = null;
    }
  
    start() {
      this._attachEvents();
      this._patchFetch();
      this._patchXHR();
      this._resetTimer();
    }
  
    stop() {
      this._clearTimer();
      this._detachEvents();
      this._restoreFetch();
      this._restoreXHR();
    }
  
    _attachEvents() {
      this.events.forEach(e => window.addEventListener(e, this._activityHandler, true));
    }
  
    _detachEvents() {
      this.events.forEach(e => window.removeEventListener(e, this._activityHandler, true));
    }
  
    _resetTimer() {
      this._clearTimer();
      this._timerId = setTimeout(() => this._handleTimeout(), this.timeout);
    }
  
    _clearTimer() {
      if (this._timerId) {
        clearTimeout(this._timerId);
        this._timerId = null;
      }
    }
  
    _handleTimeout() {
      if (typeof this.onTimeout === 'function') {
        this.onTimeout();
      } else {
        try {
          alert(this.popupMessage);
        } catch (e) { /* noop for non-window env */ }
        window.location.href = '/login';
      }
    }
  
    _patchFetch() {
      if (!window.fetch) return;
      this._origFetch = window.fetch.bind(window);
      const self = this;
      window.fetch = function (...args) {
        self._resetTimer();
        return self._origFetch(...args);
      };
    }
  
    _restoreFetch() {
      if (this._origFetch) window.fetch = this._origFetch;
      this._origFetch = null;
    }
  
    _patchXHR() {
      if (!window.XMLHttpRequest) return;
      const OrigXHR = window.XMLHttpRequest;
      this._origXHR = OrigXHR;
      const self = this;
  
      function WrappedXHR() {
        const xhr = new OrigXHR();
        const origSend = xhr.send;
        xhr.send = function (...args) {
          self._resetTimer();
          return origSend.apply(this, args);
        };
        return xhr;
      }
      WrappedXHR.prototype = OrigXHR.prototype;
      window.XMLHttpRequest = WrappedXHR;
    }
  
    _restoreXHR() {
      if (this._origXHR) window.XMLHttpRequest = this._origXHR;
      this._origXHR = null;
    }
  }
  
  export default IdleSessionLogout;
  export { IdleSessionLogout };
  