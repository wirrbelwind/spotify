'use client'

import Image from "next/image"
import { startTransition, useState } from "react"
import { allChips } from "./constants"
import { Avatar } from "@heroui/avatar"
import { Button } from "@heroui/button"
import { Chip } from "@heroui/chip"
import { Input } from "@heroui/input"
import { Select,SelectItem, SelectSection } from "@heroui/select"

export const Header = () => {
	const [selectedChips, setSelectedChips] = useState<string[]>([])

	const [inputTouched, setInputTouched] = useState(false)

	return (
		<div className="mb-2">
			<p>Your library</p>

			<div className="">
				<div className="flex flex-wrap gap-2 mt-2 items-center overflow-x-scroll scrollbar-hide">
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

				<Select
					className="max-w-xs"
				>
					<SelectSection showDivider title="Sort by">
						<SelectItem textValue={"Recents"}>
							Recents
						</SelectItem>
						<SelectItem textValue={"Recently added"}>
							Recently added
						</SelectItem>
						<SelectItem textValue={"Alphabetical"}>
							Alphabetical
						</SelectItem>
						<SelectItem textValue={"Creator"}>
							Creator
						</SelectItem>
					</SelectSection>

					<SelectSection showDivider title="View as">
						<SelectItem textValue={"Compact"} startContent={'1'}>
							Compact
						</SelectItem>
						<SelectItem textValue={"List"} startContent={'2'}>
							List
						</SelectItem>
						<SelectItem textValue={"Grid"} startContent={'3'}>
							Grid
						</SelectItem>

					</SelectSection>


				</Select>

				<div className="flex mt-2">
					<Input
						type="text"
						className={`
						transition-all
						${inputTouched ? 'w-40' : 'w-0'}
					`}
					/>

					<Button
						isIconOnly
						onPress={() => setInputTouched(prev => !prev)}
					>
						<Image
							src="/icons/search.svg"
							width={20}
							height={20}
							alt="search in library"
						/>
					</Button>
				</div>
			</div>
		</div>
	)
}
