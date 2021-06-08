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
import type { SpotlightConfig, SpotlightProps } from './spotlight';

interface SpotlightTourContextValue {
  configs: SpotlightConfig[];
  addConfig: (config: SpotlightConfig) => void;
  removeConfig: (config: SpotlightConfig) => void;
}

const SpotlightTourContext = createContext<SpotlightTourContextValue>({
  configs: [],
  addConfig: () => {},
  removeConfig: () => {},
});

export function useSpotlight(
  text: string,
  placement?: 'bottom' | 'left' | 'right' | 'top'
) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const { addConfig, removeConfig } = useContext(SpotlightTourContext);

  useEffect(() => {
    if (ref == null) return;

    const config: SpotlightConfig = { el: ref, text, placement };
    addConfig(config);
    return () => {
      removeConfig(config);
    };
  }, [addConfig, removeConfig, ref, text, placement]);

  return setRef;
}

interface SpotlightTourProps {
  open: boolean;
  onClose: () => void;
  Spotlight?: ComponentType<SpotlightProps>;
}

export function SpotlightTour({
  open,
  onClose,
  Spotlight,
  children,
}: PropsWithChildren<SpotlightTourProps>) {
  const [configs, setConfigs] = useState<SpotlightConfig[]>([]);

  const addConfig = useCallback((config: SpotlightConfig) => {
    setConfigs((prevConfigs) => [...prevConfigs, config]);
  }, []);

  const removeConfig = useCallback((config: SpotlightConfig) => {
    setConfigs((prevConfigs) => prevConfigs.filter((c) => c !== config));
  }, []);

  const spotlightContextValue = useMemo(
    () => ({
      configs,
      addConfig,
      removeConfig,
    }),
    [configs, addConfig, removeConfig]
  );

  return (
    <SpotlightTourContext.Provider value={spotlightContextValue}>
      {children}
      {open && Spotlight != null && (
        <Spotlight configs={configs} onClick={onClose} />
      )}
    </SpotlightTourContext.Provider>
  );
}
