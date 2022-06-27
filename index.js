class TypedText {
    constructor(dom, text, typingSpeed = 100) {
        this._e = new EventTarget();
        this.dom = dom
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

function typedNode(dom, text, onTyped, typingSpeed = 100) {
    let tt = new TypedText(dom, text, typingSpeed)
    let _onTyped = onTyped || ((e) => tt.dom.innerHTML += e.detail[0])
    tt.on('typed', _onTyped)
    return tt.promise().then((result) => {
        tt.off('typed', _onTyped)
        return result
    })
}
