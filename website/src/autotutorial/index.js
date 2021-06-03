"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoTutorial = exports.useAutoTutorial = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const AutoTutorialContext = react_1.createContext({
    configs: [],
    addConfig: () => { },
    removeConfig: () => { },
});
function useAutoTutorial(text, placement) {
    const [ref, setRef] = react_1.useState(null);
    const { addConfig, removeConfig } = react_1.useContext(AutoTutorialContext);
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
exports.useAutoTutorial = useAutoTutorial;
function AutoTutorial({ name, seenTutorials, markSeen, Tutorial, children, }) {
    const closeTutorial = react_1.useCallback(() => {
        markSeen(name);
    }, [markSeen, name]);
    const [configs, setConfigs] = react_1.useState([]);
    const addConfig = react_1.useCallback((config) => {
        setConfigs((prevConfigs) => [...prevConfigs, config]);
    }, []);
    const removeConfig = react_1.useCallback((config) => {
        setConfigs((prevConfigs) => prevConfigs.filter((c) => c !== config));
    }, []);
    const autoTutorialContextValue = react_1.useMemo(() => ({
        configs,
        addConfig,
        removeConfig,
    }), [configs, addConfig, removeConfig]);
    return (jsx_runtime_1.jsxs(AutoTutorialContext.Provider, Object.assign({ value: autoTutorialContextValue }, { children: [children,
            !seenTutorials.includes(name) && Tutorial != null && (jsx_runtime_1.jsx(Tutorial, { conf: configs, onClick: closeTutorial }, void 0))] }), void 0));
}
exports.AutoTutorial = AutoTutorial;
