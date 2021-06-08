import React from 'react';
export interface SpotlightConfig {
    el: HTMLElement | null;
    text: string;
    placement?: 'bottom' | 'left' | 'right' | 'top';
}
export interface SpotlightProps {
    configs: SpotlightConfig[];
    onClick?: () => void;
}
declare function Spotlight({ configs, onClick }: SpotlightProps): JSX.Element | null;
declare const SpotlightMemo: React.MemoExoticComponent<typeof Spotlight>;
export { SpotlightMemo as Spotlight };
