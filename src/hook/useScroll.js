import {createContext, useEffect, useState} from 'react';

export default function useScroll(props) {
    const [data, setdata] = useState({
        x: 0,
        y: 0,
        lastX: 0,
        lastY: 0,
        direction:'up'
    })

    useEffect(() => {
        const handleScroll = () => {
            setdata((last) => {
                return {
                    x: window.scrollX,
                    y: window.scrollY,
                    lastX: last.x,
                    lastY: last.y,
                    direction:(window.scrollY > 250 && window.scrollY-last.y > 0) ? 'down' : 'up'
                }
            })
        }

        handleScroll()
        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    return data
}

export const ScrollContext = createContext(null);