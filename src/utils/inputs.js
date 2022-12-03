export default class Inputs {
    static name = "inputs";
    constructor({ keyCodes }) {
        this.keyStates = {};
        keyCodes.forEach((keyCode) => {
            this.keyStates[keyCode] = false;
        });
        document.addEventListener("keydown", (e) => this.keydown(e));
        document.addEventListener("keyup", (e) => this.keyup(e));
    }

    keydown(e) {
        if (this.keyStates[e.code] !== undefined) {
            this.keyStates[e.code] = true;
        }
    }

    keyup(e) {
        if (this.keyStates[e.code] !== undefined) {
            this.keyStates[e.code] = false;
        }
    }

    isDown(key) {
        return this.keyStates[key];
    }
}
