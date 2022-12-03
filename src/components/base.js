import { Graphics } from "pixi.js";

export default class BaseComponent {
    constructor(props) {
        this.body = {};
        this.graphics = new Graphics();
        props.container.addChild(this.graphics);
        this.color = 0xffffff;
    }

    draw() {}

    update(dt) {}

    addComponent(module, props) {
        this[module.name] = new module(props);
    }
}
