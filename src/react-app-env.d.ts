/// <reference types="react-scripts" />

declare module JSX {

	interface IntrinsicElements {
		nav: React.DetailedDivProps<React.DivHTMLAttributes<HTMLDivElement>, HTMLDivElement>
	}
}
