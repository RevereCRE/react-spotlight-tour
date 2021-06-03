import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, } from 'react';
const HighlightsContext = createContext({
    configs: [],
    addConfig: () => { },
    removeConfig: () => { },
});
export function useHighlight(text, placement) {
    const [ref, setRef] = useState(null);
    const { addConfig, removeConfig } = useContext(HighlightsContext);
    useEffect(() => {
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
export function Highlights({ open, onClose, Highlighter, children, }) {
    const [configs, setConfigs] = useState([]);
    const addConfig = useCallback((config) => {
        setConfigs((prevConfigs) => [...prevConfigs, config]);
    }, []);
    const removeConfig = useCallback((config) => {
        setConfigs((prevConfigs) => prevConfigs.filter((c) => c !== config));
    }, []);
    const HighlightsContextValue = useMemo(() => ({
        configs,
        addConfig,
        removeConfig,
    }), [configs, addConfig, removeConfig]);
    return (_jsxs(HighlightsContext.Provider, Object.assign({ value: HighlightsContextValue }, { children: [children,
            open && Highlighter != null && (_jsx(Highlighter, { configs: configs, onClick: onClose }, void 0))] }), void 0));
}
