import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {z} from 'zod';

export const myCompSchema = z.object({
	subtitle: z.string(),
});

type MyCompProps = z.infer<typeof myCompSchema>;

export function Subtitle(props: MyCompProps): JSX.Element {
	const {subtitle} = props;

	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [30, 50], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill className="bg-red-600 items-center justify-center">
			<div className="text-gray-600 text-3xl" style={{opacity}}>
				{subtitle}
			</div>
		</AbsoluteFill>
	);
}
