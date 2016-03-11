const INTERVAL_TIME = 100;
const CHARCODE_ATMARK = 64;
const PRESS_COUNT = 2;
const DOUBLE_PRESS_TIME = 300;

class ChatWorkTo {
  $textarea;
  $toButton;
  atMarkPressedCount = 0;

  constructor () {
    this.readyTextarea();
  }

  readyTextarea () {
    let interval;
    let confirmTextarea = () => {
      this.$textarea = $('#_chatText');

      if (this.$textarea.length) {
        this.$toButton = $('#_to');
        this.bindEvents();
        clearInterval(interval);
      }
    };

    interval = setInterval(() => {
      confirmTextarea();
    }, INTERVAL_TIME);
  }

  bindEvents () {
    this.$textarea.on('keypress', (e) => this.keypress(e));
  }

  keypress (e) {
    this.atMarkPressedCount++;

    if (
      e.charCode === CHARCODE_ATMARK &&
      this.atMarkPressedCount >= PRESS_COUNT
    ) {
      this.callToWindow();
    }

    setTimeout(() => {
      this.atMarkPressedCount = 0;
    }, DOUBLE_PRESS_TIME);
  }

  callToWindow () {
    this.$toButton.trigger('click');

    let caretPosition = this.$textarea[0].selectionStart;
    let text = this.$textarea.val();

    text = text.substr(0, caretPosition - 1) + text.substr(caretPosition);

    setTimeout(() => {
      this.$textarea.val(text);
    });
  }
}

$(function () {
  new ChatWorkTo();
});
