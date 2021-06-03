import React, {
  ComponentType,
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { HighlightConfig, HighlighterProps } from './highlighter';

interface HighlightsContextValue {
  configs: HighlightConfig[];
  addConfig: (config: HighlightConfig) => void;
  removeConfig: (config: HighlightConfig) => void;
}

const HighlightsContext = createContext<HighlightsContextValue>({
  configs: [],
  addConfig: () => {},
  removeConfig: () => {},
});

export function useHighlight(
  text: string,
  placement?: 'bottom' | 'left' | 'right' | 'top'
) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const { addConfig, removeConfig } = useContext(HighlightsContext);

  useEffect(() => {
    if (ref == null) return;

    const config: HighlightConfig = { el: ref, text, placement };
    addConfig(config);
    return () => {
      removeConfig(config);
    };
  }, [addConfig, removeConfig, ref, text, placement]);

  return setRef;
}

interface HighlightsProps {
  open: boolean;
  onClose: () => void;
  Highlighter?: ComponentType<HighlighterProps>;
}

export function Highlights({
  open,
  onClose,
  Highlighter,
  children,
}: PropsWithChildren<HighlightsProps>) {
  const [configs, setConfigs] = useState<HighlightConfig[]>([]);

  const addConfig = useCallback((config: HighlightConfig) => {
    setConfigs((prevConfigs) => [...prevConfigs, config]);
  }, []);

  const removeConfig = useCallback((config: HighlightConfig) => {
    setConfigs((prevConfigs) => prevConfigs.filter((c) => c !== config));
  }, []);

  const HighlightsContextValue = useMemo(
    () => ({
      configs,
      addConfig,
      removeConfig,
    }),
    [configs, addConfig, removeConfig]
  );

  return (
    <HighlightsContext.Provider value={HighlightsContextValue}>
      {children}
      {open && Highlighter != null && (
        <Highlighter configs={configs} onClick={onClose} />
      )}
    </HighlightsContext.Provider>
  );
}
