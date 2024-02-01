import { AbsoluteFill, Sequence } from 'remotion'
import { Logo } from './Logo'
import { Subtitle } from './Subtitle'
import { Title } from './Title'
import { z } from 'zod'
import { zColor } from '@remotion/zod-types'
import { Dispatch, SetStateAction, useState } from 'react'
import { Input } from './Input'
import React from 'react'

const dispatchSetStateActionNumber = z.unknown().refine(
    (val): val is Dispatch<SetStateAction<number>> => {
        return typeof val === 'function'
    },
    {
        message: 'Must be a Dispatch<SetStateAction<number>>',
    }
)

export const myCompSchema = z.object({
    titleText: z.string(),
    titleColor: zColor(),
    logoColor: zColor(),
    duration: z.number(),
    setDuration: dispatchSetStateActionNumber,
})

type MyCompProps = z.infer<typeof myCompSchema>

export function MyComposition(props: MyCompProps): JSX.Element {
    const { titleText: propOne } = props
    const { titleColor: propTwo } = props
    const { logoColor: propThree } = props
    const { duration } = props
    const { setDuration } = props

    const [subtitle, setSubtitle] = useState('')

    console.log(subtitle)

    return (
        <>
            <Sequence durationInFrames={100}>
                <AbsoluteFill className="bg-gray-100 items-center justify-center">
                    <div className="m-10" />
                    <Logo logoColor={propThree} />
                    <div className="m-3" />
                    <Title titleText={propOne} titleColor={propTwo} />
                </AbsoluteFill>
            </Sequence>
            {/* if duration is 4, it should be 4 seconds. We render 30 FPS so total frames in 4 seconds are 120. Add one so it renders initially... */}
            <Sequence from={100} durationInFrames={duration * 30 + 1}>
                <Input
                    duration={duration}
                    setDuration={setDuration}
                    setSubtitle={setSubtitle}
                />
            </Sequence>
            <Sequence from={100 + duration * 30} durationInFrames={300}>
                <Subtitle subtitle={subtitle} />
            </Sequence>
        </>
    )
}
