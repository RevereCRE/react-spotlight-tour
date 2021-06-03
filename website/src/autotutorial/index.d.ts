import React, { ComponentType, PropsWithChildren } from 'react';
import type { TutorialProps } from './tutorial';
export declare function useAutoTutorial(text: string, placement?: 'bottom' | 'left' | 'right' | 'top'): React.Dispatch<React.SetStateAction<HTMLElement | null>>;
interface AutoTutorialProps {
    name: string;
    seenTutorials: readonly string[];
    markSeen: (tutorial: string) => void;
    Tutorial?: ComponentType<TutorialProps>;
}
export declare function AutoTutorial({ name, seenTutorials, markSeen, Tutorial, children, }: PropsWithChildren<AutoTutorialProps>): JSX.Element;
export {};
