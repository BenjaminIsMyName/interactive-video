import { useState } from 'react'
import './App.css'
import { MyComposition, myCompSchema } from '../video/Composition'
import { Player } from '@remotion/player'

function App() {
    const [duration, setDuration] = useState(0)

    const durationInFrames = duration * 30

    return (
        <>
            <h1 className="text-green-500">
                This is a React.js app created using Vite
            </h1>
            <br />
            <h2 className="text-green-300">
                The amazing part - this app includes an INTERACTIVE video!
            </h2>
            <br />
            <h3 className="text-green-100">
                The video was created using Remotion
            </h3>
            <br /> <br /> <br />
            <Player
                className="shadow-2xl shadow-green-600 border-2 border-green-500 border-dotted"
                autoPlay
                compositionWidth={1280}
                compositionHeight={720}
                inputProps={{
                    titleText:
                        'Truly Interactive Video! Built by @BenjaminIsMyName using Remotion',
                    titleColor: '#000000',
                    logoColor: '#00bfff',
                    duration,
                    setDuration,
                }}
                component={MyComposition}
                durationInFrames={240 + durationInFrames}
                fps={30}
                schema={myCompSchema}
            />
        </>
    )
}

export default App
