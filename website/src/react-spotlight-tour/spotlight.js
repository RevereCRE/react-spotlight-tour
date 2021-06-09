import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useEffect, useLayoutEffect, useRef, useState, } from 'react';
import { createPortal } from 'react-dom';
function checkExhaustive(_cased) {
    return undefined;
}
function SpotlightConfig({ children }) {
    const outlet = useRef(null);
    const [didMount, setDidMount] = useState(false);
    useEffect(() => {
        let outletDiv = document.getElementById('spotlight-outlet');
        if (!outletDiv) {
            outletDiv = document.createElement('div');
            outletDiv.id = 'spotlight-outlet';
            document.body.appendChild(outletDiv);
        }
        outlet.current = outletDiv;
        setDidMount(true);
    }, [outlet]);
    if (!didMount)
        return null;
    return createPortal(didMount ? children : null, outlet.current);
}
// Controls overall size of the spotlight.
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
function Spotlight({ configs, onClick }) {
    const containerRef = useRef(null);
    const [canvas, setCanvas] = useState(null);
    useLayoutEffect(() => {
        if (canvas == null) {
            return;
        }
        function drawSpotlight() {
            if (containerRef.current != null) {
                containerRef.current.style.height = `${document.body.scrollHeight}px`;
                containerRef.current.style.width = `${document.body.clientWidth}px`;
            }
            const ctx = getCanvasContext(canvas);
            if (ctx == null)
                return;
            for (const config of configs) {
                renderConfig(ctx, config);
            }
        }
        const resizeObserver = new ResizeObserver(drawSpotlight);
        resizeObserver.observe(document.body);
        for (const { el } of configs) {
            if (el)
                resizeObserver.observe(el);
        }
        const drawInitialFrame = requestAnimationFrame(drawSpotlight);
        return () => {
            cancelAnimationFrame(drawInitialFrame);
            resizeObserver.disconnect();
        };
    }, [canvas, configs]);
    const hasEls = configs.some(({ el }) => el != null);
    if (!hasEls)
        return null;
    return (_jsx(SpotlightConfig, { children: _jsxs("div", Object.assign({ ref: containerRef, onClick: onClick, style: {
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
            } }, { children: [_jsx("canvas", { ref: setCanvas }, void 0),
                _jsx("div", { style: { backgroundColor: 'black', opacity: 0.7, flex: 1 } }, void 0)] }), void 0) }, void 0));
}
const SpotlightMemo = memo(Spotlight, (prev, next) => {
    if (prev.configs.length !== next.configs.length)
        return false;
    return prev.configs.every((el, i) => el.el === next.configs[i].el &&
        el.text === next.configs[i].text &&
        el.placement === next.configs[i].placement);
});
export default SpotlightMemo;
