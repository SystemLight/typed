class TypedText {
    constructor(domOrSelector, text, typingSpeed = 100) {
        this._e = new EventTarget();
        if (typeof domOrSelector === 'string') {
            this.dom = document.querySelector(domOrSelector)
        } else {
            this.dom = domOrSelector
        }
        this.text = text
        this.textSize = text.length
        this.typingSpeed = typingSpeed
    }

    on(type, callback) {
        this._e.addEventListener(type, callback)
    }

    off(type, callback) {
        this._e.removeEventListener(type, callback)
    }

    promise() {
        return new Promise((resolve) => {
            let i = 0;
            let _typedCharacter = () => {
                this._e.dispatchEvent(new CustomEvent('typed', {detail: [this.text[i]]}))
                i++
                if (i < this.textSize) {
                    setTimeout(_typedCharacter, this.typingSpeed)
                } else {
                    resolve()
                }
            }
            _typedCharacter()
        })
    }
}

function typedNode(domOrSelector, text, onTyped, typingSpeed = 100) {
    let tt = new TypedText(domOrSelector, text, typingSpeed)
    let _onTyped = onTyped || ((e) => tt.dom.innerHTML += e.detail[0])
    tt.on('typed', _onTyped)
    return tt.promise().then(() => {
        tt.off('typed', _onTyped)
    })
}
