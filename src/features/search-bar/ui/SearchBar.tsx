'use client'
import { debounce } from "@/shared/lib/debounce"
import { Button } from "@heroui/button"
import { Divider } from "@heroui/divider"
import { Input } from "@heroui/input"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { ChangeEvent, ChangeEventHandler, useCallback } from "react"

interface SearchBarProps {
}

export const SearchBar = ({}: SearchBarProps) => {
    const router = useRouter()
    const params = useSearchParams()
    const searchType = params.get('searchType')

    const onSearchChange = useCallback(
		debounce(
			(event: ChangeEvent<HTMLInputElement>) => {
				const query = event.target.value

                const url = `/dashboard/search?q=${query}&searchType=${searchType ?? 'all'}`
                router.push(url)
			}
			, 1000)
		, [])

    return (
        <div className="w-96">
            <Input 
            startContent={
                <Button 
                variant="light"
                isIconOnly
                >
                    <Image 
                        alt="search"
                        width={32}
                        height={32}
                        className="w-8 h-8"
                        src="/icons/search.svg"
                    />
                </Button>
            }
            
            endContent={
                <>
                <Divider 
                orientation="vertical" 
                className="mx-2"
                />
                <Link href="/categories">
                   
                   <Image 
                    alt="search"
                    width={32}
                    height={32}
                    className="w-8 h-8"
                    src="/icons/albums.svg"
                   />
                </Link>
                </>
            }

            onChange={onSearchChange}
            />
        </div>
    )
}