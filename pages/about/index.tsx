// import Image from 'next/image'
// import HeavyComponent from '@/components/HeavyComponent'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'),
    {
        ssr: false,
        loading: () => <p>Loading ...</p>
    }
)

export default function About() {
    const [show, setShow] = useState(false)

    return (
        <div>
            <h1>About Page</h1>
            <button onClick={() => setShow(true)}>Show Component</button>
            {/* <Image src="/blur-bright-bulb-clear-thumbnail.jpg" width="1000" height="500" alt="About Page Image" priority /> */}
            {show && <HeavyComponent />}
        </div>
    )
}