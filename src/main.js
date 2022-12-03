import {
    Engine,
    World,
    Body,
    Bodies,
    Mouse,
    MouseConstraint,
    Common,
    Runner,
} from "matter-js";
import * as PIXI from "pixi.js";
import Player from "./components/player";
import { CRTFilter, PixelateFilter, RGBSplitFilter } from "pixi-filters";
//goofy ahh decomposition is not working try and fix soon come broski import decomp from "poly-decomp";

document.addEventListener("DOMContentLoaded", (event) => {
    const sceneContainer = document.querySelector(".scene");
    const canvasWidth = sceneContainer.offsetWidth;
    const canvasHeight = sceneContainer.offsetHeight;
    let canvasPrevWidth = canvasWidth;
    let canvasPrevHeight = canvasHeight;

    const engine = Engine.create();
    engine.gravity.y = 0;

    const wallTop = Bodies.rectangle(canvasWidth / 2, 0, canvasWidth, 10, {
        isStatic: true,
    });
    const wallBottom = Bodies.rectangle(
        canvasWidth / 2,
        canvasHeight,
        canvasWidth,
        10,
        {
            isStatic: true,
        }
    );
    const wallRight = Bodies.rectangle(
        canvasWidth,
        canvasHeight / 2,
        10,
        canvasHeight,
        {
            isStatic: true,
        }
    );
    const wallLeft = Bodies.rectangle(0, canvasHeight / 2, 10, canvasHeight, {
        isStatic: true,
    });

    World.add(engine.world, [wallBottom, wallTop, wallLeft, wallRight]);

    const app = new PIXI.Application({
        backgroundColor: 0x222233,
        resizeTo: sceneContainer,
    });

    app.stage.filters = [
        new RGBSplitFilter([2, 2], [0, 0], [-2, -2]),
        new PixelateFilter(2),
    ];

    document.querySelector(".scene").appendChild(app.view);

    const player = new Player({ container: app.stage });
    World.addBody(engine.world, player.body);

    app.ticker.add((dt) => {
        player.update(dt);
        player.draw();
    });

    const mouseConstraint = MouseConstraint.create(engine, {
        mouse: Mouse.create(document.querySelector(".scene canvas")),
    });

    World.add(engine.world, mouseConstraint);

    window.addEventListener("resize", function (event) {
        const canvasWidth = sceneContainer.offsetWidth;
        const canvasHeight = sceneContainer.offsetHeight;

        Body.setPosition(wallLeft, {
            x: 0,
            y: canvasHeight / 2,
        });
        Body.scale(wallLeft, 1, canvasHeight / canvasPrevHeight);

        Body.setPosition(wallRight, {
            x: canvasWidth,
            y: canvasHeight / 2,
        });
        Body.scale(wallRight, 1, canvasHeight / canvasPrevHeight);

        Body.setPosition(wallTop, {
            x: canvasWidth / 2,
            y: 0,
        });
        Body.scale(wallTop, canvasWidth / canvasPrevWidth, 1);

        Body.setPosition(wallBottom, {
            x: canvasWidth / 2,
            y: canvasHeight,
        });
        Body.scale(wallBottom, canvasWidth / canvasPrevWidth, 1);

        canvasPrevWidth = canvasWidth;
        canvasPrevHeight = canvasHeight;
    });

    Runner.run(engine);
});
