"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Highlights = exports.useHighlight = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const HighlightsContext = react_1.createContext({
    configs: [],
    addConfig: () => { },
    removeConfig: () => { },
});
function useHighlight(text, placement) {
    const [ref, setRef] = react_1.useState(null);
    const { addConfig, removeConfig } = react_1.useContext(HighlightsContext);
    react_1.useEffect(() => {
        if (ref == null)
            return;
        const config = { el: ref, text, placement };
        addConfig(config);
        return () => {
            removeConfig(config);
        };
    }, [addConfig, removeConfig, ref, text, placement]);
    return setRef;
}
exports.useHighlight = useHighlight;
function Highlights({ open, onClose, Highlighter, children, }) {
    const [configs, setConfigs] = react_1.useState([]);
    const addConfig = react_1.useCallback((config) => {
        setConfigs((prevConfigs) => [...prevConfigs, config]);
    }, []);
    const removeConfig = react_1.useCallback((config) => {
        setConfigs((prevConfigs) => prevConfigs.filter((c) => c !== config));
    }, []);
    const HighlightsContextValue = react_1.useMemo(() => ({
        configs,
        addConfig,
        removeConfig,
    }), [configs, addConfig, removeConfig]);
    return (jsx_runtime_1.jsxs(HighlightsContext.Provider, Object.assign({ value: HighlightsContextValue }, { children: [children,
            open && Highlighter != null && (jsx_runtime_1.jsx(Highlighter, { configs: configs, onClick: onClose }, void 0))] }), void 0));
}
exports.Highlights = Highlights;
