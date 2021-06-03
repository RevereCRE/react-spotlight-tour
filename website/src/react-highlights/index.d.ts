import React, { ComponentType, PropsWithChildren } from 'react';
import type { HighlighterProps } from './highlighter';
export declare function useHighlight(text: string, placement?: 'bottom' | 'left' | 'right' | 'top'): React.Dispatch<React.SetStateAction<HTMLElement | null>>;
interface HighlightsProps {
    open: boolean;
    onClose: () => void;
    Highlighter?: ComponentType<HighlighterProps>;
}
export declare function Highlights({ open, onClose, Highlighter, children, }: PropsWithChildren<HighlightsProps>): JSX.Element;
export {};
