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
import type { TutorialConfig, TutorialProps } from './tutorial';

interface AutoTutorialContextValue {
  configs: TutorialConfig[];
  addConfig: (config: TutorialConfig) => void;
  removeConfig: (config: TutorialConfig) => void;
}

const AutoTutorialContext = createContext<AutoTutorialContextValue>({
  configs: [],
  addConfig: () => {},
  removeConfig: () => {},
});

export function useAutoTutorial(
  text: string,
  placement?: 'bottom' | 'left' | 'right' | 'top'
) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const { addConfig, removeConfig } = useContext(AutoTutorialContext);

  useEffect(() => {
    if (ref == null) return;

    const config: TutorialConfig = { el: ref, text, placement };
    addConfig(config);
    return () => {
      removeConfig(config);
    };
  }, [addConfig, removeConfig, ref, text, placement]);

  return setRef;
}

interface AutoTutorialProps {
  name: string;
  seenTutorials: readonly string[];
  markSeen: (tutorial: string) => void;
  Tutorial?: ComponentType<TutorialProps>;
}

export function AutoTutorial({
  name,
  seenTutorials,
  markSeen,
  Tutorial,
  children,
}: PropsWithChildren<AutoTutorialProps>) {
  const closeTutorial = useCallback(() => {
    markSeen(name);
  }, [markSeen, name]);

  const [configs, setConfigs] = useState<TutorialConfig[]>([]);

  const addConfig = useCallback((config: TutorialConfig) => {
    setConfigs((prevConfigs) => [...prevConfigs, config]);
  }, []);

  const removeConfig = useCallback((config: TutorialConfig) => {
    setConfigs((prevConfigs) => prevConfigs.filter((c) => c !== config));
  }, []);

  const autoTutorialContextValue = useMemo(
    () => ({
      configs,
      addConfig,
      removeConfig,
    }),
    [configs, addConfig, removeConfig]
  );

  return (
    <AutoTutorialContext.Provider value={autoTutorialContextValue}>
      {children}
      {!seenTutorials.includes(name) && Tutorial != null && (
        <Tutorial conf={configs} onClick={closeTutorial} />
      )}
    </AutoTutorialContext.Provider>
  );
}
