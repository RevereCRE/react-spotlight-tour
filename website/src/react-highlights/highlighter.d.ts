import React from 'react';
export interface HighlightConfig {
    el: HTMLElement | null;
    text: string;
    placement?: 'bottom' | 'left' | 'right' | 'top';
}
export interface HighlighterProps {
    configs: HighlightConfig[];
    onClick?: () => void;
}
declare function Highlighter({ configs, onClick }: HighlighterProps): JSX.Element | null;
declare const HighlighterMemo: React.MemoExoticComponent<typeof Highlighter>;
export { HighlighterMemo as Highlighter };
