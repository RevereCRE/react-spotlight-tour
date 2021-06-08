import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, } from 'react';
const SpotlightTourContext = createContext({
    configs: [],
    addConfig: () => { },
    removeConfig: () => { },
});
export function useSpotlight(text, placement) {
    const [ref, setRef] = useState(null);
    const { addConfig, removeConfig } = useContext(SpotlightTourContext);
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
export function SpotlightTour({ open, onClose, Spotlight, children, }) {
    const [configs, setConfigs] = useState([]);
    const addConfig = useCallback((config) => {
        setConfigs((prevConfigs) => [...prevConfigs, config]);
    }, []);
    const removeConfig = useCallback((config) => {
        setConfigs((prevConfigs) => prevConfigs.filter((c) => c !== config));
    }, []);
    const spotlightContextValue = useMemo(() => ({
        configs,
        addConfig,
        removeConfig,
    }), [configs, addConfig, removeConfig]);
    return (_jsxs(SpotlightTourContext.Provider, Object.assign({ value: spotlightContextValue }, { children: [children,
            open && Spotlight != null && (_jsx(Spotlight, { configs: configs, onClick: onClose }, void 0))] }), void 0));
}
