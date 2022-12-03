import BaseComponent from "./base";
import { Bodies, Body } from "matter-js";
import Inputs from "../utils/inputs";

const DEFAULT_VERTICES = [
    { x: 0, y: -25 },
    { x: -25, y: 25 },
    { x: 0, y: 10 },
    { x: 25, y: 25 },
];

const cos = Math.cos;
const sin = Math.sin;
const PI = Math.PI;

export default class Player extends BaseComponent {
    constructor(props) {
        super(props);
        this.addComponent(Inputs, {
            keyCodes: ["KeyW", "KeyA", "KeyS", "KeyD"],
        });
        this.thrustPower = 0.001;
        this.rotationSpeed = 0.075;
        this.body = Bodies.fromVertices(
            500,
            500,
            DEFAULT_VERTICES,
            {
                inertia: Infinity,
                restitution: 0.5,
                friction: 0,
            },
            true
        );
    }

    draw() {
        this.graphics.clear();
        this.graphics.beginFill(this.color, 1);
        this.graphics.drawPolygon(this.calculateVertexLocations());
        this.graphics.endFill();
    }

    update(dt) {
        const angle = this.body.angle;
        if (this.inputs.isDown("KeyW")) {
            Body.applyForce(
                this.body,
                { x: this.body.position.x, y: this.body.position.y },
                {
                    x: this.thrustPower * cos(angle - PI / 2) * dt,
                    y: this.thrustPower * sin(angle - PI / 2) * dt,
                }
            );
        }

        if (this.inputs.isDown("KeyA")) {
            Body.rotate(this.body, -1 * this.rotationSpeed * dt);
        }

        if (this.inputs.isDown("KeyD")) {
            Body.rotate(this.body, this.rotationSpeed * dt);
        }
    }

    calculateVertexLocations() {
        return DEFAULT_VERTICES.map((vertex) => {
            const x = vertex.x;
            const y = vertex.y;
            const angle = this.body.angle;
            const position = this.body.position;
            const xRotated = x * cos(angle) - y * sin(angle);
            const yRotated = x * sin(angle) + y * cos(angle);
            return { x: xRotated + position.x, y: yRotated + position.y };
        });
    }
}
