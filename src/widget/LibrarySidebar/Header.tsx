'use client'

import { Button, Chip } from "@nextui-org/react"
import Image from "next/image"
import { useState } from "react"
import { allChips } from "./constants"

export const Header = () => {


	const [selectedChips, setSelectedChips] = useState<string[]>([])

	return (
		<div className="mb-2">
			<p>Your library</p>
			<div className="flex gap-2 mt-2 items-center overflow-x-scroll scrollbar-hide">
				{selectedChips.length > 0 && (
					<Button
						className="rounded-full w-8 h-8 self-stretch"
						isIconOnly
						onPress={() => setSelectedChips([])}
					>
						<Image
							src="/icons/close.svg"
							alt="clear filters"
							width={20}
							height={20}
						/>
					</Button>
				)}

				{allChips.map(chip => {
					const isSelected = selectedChips.includes(chip)

					return (
						<Chip
							key={chip}
							className={`
								${isSelected && 'bg-green-600'}
								cursor-pointer
							`}
							onClick={() => {
								if (isSelected) {
									setSelectedChips(prev => prev.filter(item => item !== chip))
								}
								else {
									setSelectedChips(prev => [...prev, chip])
								}
							}}
						>
							{chip}
						</Chip>
					)
				})}
			</div>
		</div>
	)
}
