import { Chip, ChipProps } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import Image from "next/image";
import { FC, HTMLAttributes } from "react";

interface FilterItemProps extends ChipProps {
    isDisabled?: boolean
    tooltip?: string
    filterType: string
    selectedType: string | null
    // onSelect: () => void
}

export const FilterItem: FC<FilterItemProps> = ({
    filterType,
    isDisabled,
    selectedType,
    tooltip,
    ...chipProps
}) => {

    const item = (
        <Chip
            className={`
                cursor-pointer
                ${selectedType === filterType && 'bg-green-600'}
            `}
            // onClick={onSelect}
            isDisabled={isDisabled}
            {...chipProps}
        >
            {
                isDisabled ? (<div className="flex gap-2 items-center">
                    <Image
                        alt=""
                        width={16}
                        height={16}
                        className="w-4 h-4"
                        src="/icons/lock.svg"
                    />
                    <span>{filterType}</span>
                </div>) : (
                    filterType
                )
            }
        </Chip>
    )

    if (tooltip) {
        return (
            <Tooltip content={tooltip}>
                {/**
                 * This <div> wrapping allows to show tooltip for disabled Chip.
                 * Removing <div> will block displaying of tooltip.
                 */}
               <div>{item}</div>
            </Tooltip>
        )
    }

    else {
        return item
    }
}