"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tutorial = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_dom_1 = require("react-dom");
function checkExhaustive(_cased) {
    return undefined;
}
function TutorialPortal({ children }) {
    const outlet = react_1.useRef(null);
    const [didMount, setDidMount] = react_1.useState(false);
    react_1.useEffect(() => {
        let outletDiv = document.getElementById('tutorial-outlet');
        if (!outletDiv) {
            outletDiv = document.createElement('div');
            outletDiv.id = 'tutorial-outlet';
            document.body.appendChild(outletDiv);
        }
        outlet.current = outletDiv;
        setDidMount(true);
    }, [outlet]);
    if (!didMount)
        return null;
    return react_dom_1.createPortal(didMount ? children : null, outlet.current);
}
// Controls overall size of the tutorial.
const UNIT = 12;
const UNIT_2 = UNIT * 2;
const UNIT_3 = UNIT * 3;
const UNIT_4 = UNIT * 4;
const UNIT_5 = UNIT * 5;
function renderTextBottom(ctx, elRect, textParts) {
    ctx.fillRect(elRect.x - UNIT, elRect.y + elRect.height + UNIT_2, elRect.width + UNIT_2, 2);
    ctx.fillRect(elRect.x + Math.floor(elRect.width / 2), elRect.y + elRect.height + UNIT_2, 2, UNIT_2);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let i = 0; i < textParts.length; i++) {
        ctx.fillText(textParts[i], elRect.x + Math.floor(elRect.width / 2), elRect.y + elRect.height + UNIT_4 + UNIT_3 * i);
    }
}
function renderTextTop(ctx, elRect, textParts) {
    ctx.fillRect(elRect.x - UNIT, elRect.y - UNIT_2, elRect.width + UNIT_2, 2);
    ctx.fillRect(elRect.x + Math.floor(elRect.width / 2), elRect.y - UNIT_4, 2, UNIT_2);
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    for (let i = 0; i < textParts.length; i++) {
        ctx.fillText(textParts[i], elRect.x + Math.floor(elRect.width / 2), elRect.y - UNIT_5 - UNIT_3 * (textParts.length - i - 1));
    }
}
function renderTextLeft(ctx, elRect, textParts) {
    ctx.fillRect(elRect.x - UNIT_2, elRect.y - UNIT, 2, elRect.height + UNIT_2);
    ctx.fillRect(elRect.x - UNIT_4, elRect.y + Math.floor(elRect.height / 2), UNIT_2, 2);
    for (let i = 0; i < textParts.length; i++) {
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(textParts[i], elRect.x - UNIT_5, elRect.y + Math.floor(elRect.height / 2) + UNIT_3 * i);
    }
}
function renderTextRight(ctx, elRect, textParts) {
    ctx.fillRect(elRect.x + elRect.width + UNIT_2, elRect.y - UNIT, 2, elRect.height + UNIT_2);
    ctx.fillRect(elRect.x + elRect.width + UNIT_2, elRect.y + Math.floor(elRect.height / 2), UNIT_2, 2);
    for (let i = 0; i < textParts.length; i++) {
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(textParts[i], elRect.x + elRect.width + UNIT_5, elRect.y + Math.floor(elRect.height / 2) + UNIT_3 * i);
    }
}
function renderConfig(ctx, { el, text, placement = 'bottom' }) {
    if (el == null)
        return;
    const elRect = el.getBoundingClientRect();
    ctx.clearRect(elRect.x - UNIT, elRect.y - UNIT, elRect.width + UNIT_2, elRect.height + UNIT_2);
    ctx.fillStyle = 'white';
    ctx.font = `${UNIT_3}px sans-serif`;
    const textParts = text.split('\n');
    switch (placement) {
        case 'bottom':
            renderTextBottom(ctx, elRect, textParts);
            break;
        case 'top':
            renderTextTop(ctx, elRect, textParts);
            break;
        case 'left':
            renderTextLeft(ctx, elRect, textParts);
            break;
        case 'right':
            renderTextRight(ctx, elRect, textParts);
            break;
        default:
            checkExhaustive(placement);
    }
}
function getCanvasContext(canvas) {
    var _a;
    const pixelRatio = (_a = window.devicePixelRatio) !== null && _a !== void 0 ? _a : 1;
    const height = Math.min(document.body.scrollHeight, window.innerHeight * 2);
    const width = Math.min(document.body.clientWidth, window.innerWidth * 2);
    canvas.height = height * pixelRatio;
    canvas.width = width * pixelRatio;
    canvas.style.height = `${height}px`;
    canvas.style.width = `${width}px`;
    const canvasRect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (ctx == null)
        return null;
    ctx.scale(pixelRatio, pixelRatio);
    ctx.fillStyle = 'black';
    ctx.globalAlpha = 0.7;
    ctx.fillRect(0, 0, canvasRect.width, canvasRect.height);
    ctx.globalAlpha = 1;
    return ctx;
}
function Tutorial({ conf, onClick }) {
    const containerRef = react_1.useRef(null);
    const [canvas, setCanvas] = react_1.useState(null);
    react_1.useLayoutEffect(() => {
        if (canvas == null) {
            return;
        }
        function drawTutorial() {
            if (containerRef.current != null) {
                containerRef.current.style.height = `${document.body.scrollHeight}px`;
                containerRef.current.style.width = `${document.body.clientWidth}px`;
            }
            const ctx = getCanvasContext(canvas);
            if (ctx == null)
                return;
            for (const tutorialConfig of conf) {
                renderConfig(ctx, tutorialConfig);
            }
        }
        const resizeObserver = new ResizeObserver(drawTutorial);
        resizeObserver.observe(document.body);
        for (const { el } of conf) {
            if (el)
                resizeObserver.observe(el);
        }
        const drawInitialFrame = requestAnimationFrame(drawTutorial);
        return () => {
            cancelAnimationFrame(drawInitialFrame);
            resizeObserver.disconnect();
        };
    }, [canvas, conf]);
    const hasEls = conf.some(({ el }) => el != null);
    if (!hasEls)
        return null;
    return (jsx_runtime_1.jsx(TutorialPortal, { children: jsx_runtime_1.jsxs("div", Object.assign({ ref: containerRef, onClick: onClick, style: {
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
            } }, { children: [jsx_runtime_1.jsx("canvas", { ref: setCanvas }, void 0),
                jsx_runtime_1.jsx("div", { style: { backgroundColor: 'black', opacity: 0.7, flex: 1 } }, void 0)] }), void 0) }, void 0));
}
const TutorialMemo = react_1.memo(Tutorial, (prev, next) => {
    if (prev.conf.length !== next.conf.length)
        return false;
    return prev.conf.every((el, i) => el.el === next.conf[i].el &&
        el.text === next.conf[i].text &&
        el.placement === next.conf[i].placement);
});
exports.Tutorial = TutorialMemo;
