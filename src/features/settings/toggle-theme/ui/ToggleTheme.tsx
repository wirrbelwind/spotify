'use client'

import { Switch } from "@heroui/switch"
import { useTheme } from "@heroui/use-theme"
import Link from "next/link"
import { useState } from "react"

export const ToggleTheme = () => {
    const {theme, setTheme} = useTheme()

    const [isThemeChanged, setIsThemeChanged] = useState(false)

    return (
        <div className="flex gap-2">
            value: {theme}
            <p>Light</p>
            <Switch 
                isSelected={theme === 'dark'}
                onValueChange={value => {
                    console.log(value)
                    if(!value) {
                        setTheme('light')
                    }
                    else {
                        setTheme('dark')
                    }
                    setIsThemeChanged(true)
                }}
            />
            <p>Dark</p>

            {isThemeChanged && (
                <Link href="/">Refresh</Link>
            )}
        </div>
    )
}