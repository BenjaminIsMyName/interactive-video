import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { AbsoluteFill } from 'remotion'
import { z } from 'zod'

const dispatchSetStateActionNumber = z.unknown().refine(
    (val): val is Dispatch<SetStateAction<number>> => {
        return typeof val === 'function'
    },
    {
        message: 'Must be a Dispatch<SetStateAction<number>>',
    }
)

const dispatchSetStateActionString = z.unknown().refine(
    (val): val is Dispatch<SetStateAction<string>> => {
        return typeof val === 'function'
    },
    {
        message: 'Must be a Dispatch<SetStateAction<string>>',
    }
)

// eslint-disable-next-line react-refresh/only-export-components
export const myCompSchema = z.object({
    duration: z.number(),
    setDuration: dispatchSetStateActionNumber,
    setSubtitle: dispatchSetStateActionString,
})

type MyCompProps = z.infer<typeof myCompSchema>

/*

	In this component the magic happens.
	The useEffect hook is used to increment the duration every second by a second. 
	Meaning, it increments the duration by the time the user spends on the input screen.
	Once the user submits the input, we stop incrementing the duration and move on to the next screen.

*/

export function Input(props: MyCompProps): JSX.Element {
    const { setDuration } = props
    const { setSubtitle } = props

    const [isSubmitted, setIsSubmitted] = React.useState(false)
    const [text, setText] = React.useState('')

    console.log('hello')

    const intervalRef = React.useRef<number>()

    useEffect(() => {
        if (isSubmitted) return

        const incrementDuration = () => setDuration(prev => prev + 1)

        // Call the function once at the beginning
        incrementDuration()

        // Then set the interval
        intervalRef.current = setInterval(incrementDuration, 1000)
        return () => {
            clearInterval(intervalRef.current)
        }
    }, [isSubmitted, setDuration])

    return (
        <AbsoluteFill className="bg-gray-100 items-center justify-center gap-3">
            <input
                className="p-3 rounded-md"
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
            />

            <button
                className="bg-black text-white"
                type="button"
                onClick={() => {
                    setSubtitle(text)
                    setIsSubmitted(true)
                }}
            >
                {isSubmitted ? 'Loading...' : 'Submit'}
            </button>
        </AbsoluteFill>
    )
}
