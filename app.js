'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var INTERVAL_TIME = 100;
var CHARCODE_ATMARK = 64;
var PRESS_COUNT = 2;
var DOUBLE_PRESS_TIME = 300;

var ChatWorkTo = function () {
  function ChatWorkTo() {
    _classCallCheck(this, ChatWorkTo);

    this.atMarkPressedCount = 0;

    this.readyTextarea();
  }

  _createClass(ChatWorkTo, [{
    key: 'readyTextarea',
    value: function readyTextarea() {
      var _this = this;

      var interval = void 0;
      var confirmTextarea = function confirmTextarea() {
        _this.$textarea = $('#_chatText');

        if (_this.$textarea.length) {
          _this.$toButton = $('#_to');
          _this.bindEvents();
          clearInterval(interval);
        }
      };

      interval = setInterval(function () {
        confirmTextarea();
      }, INTERVAL_TIME);
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this2 = this;

      this.$textarea.on('keypress', function (e) {
        return _this2.keypress(e);
      });
    }
  }, {
    key: 'keypress',
    value: function keypress(e) {
      var _this3 = this;

      this.atMarkPressedCount++;

      if (e.charCode === CHARCODE_ATMARK && this.atMarkPressedCount >= PRESS_COUNT) {
        this.callToWindow();
      }

      setTimeout(function () {
        _this3.atMarkPressedCount = 0;
      }, DOUBLE_PRESS_TIME);
    }
  }, {
    key: 'callToWindow',
    value: function callToWindow() {
      var _this4 = this;

      this.$toButton.trigger('click');

      var caretPosition = this.$textarea[0].selectionStart;
      var text = this.$textarea.val();

      text = text.substr(0, caretPosition - 1) + text.substr(caretPosition);

      setTimeout(function () {
        _this4.$textarea.val(text);
      });
    }
  }]);

  return ChatWorkTo;
}();

$(function () {
  new ChatWorkTo();
});