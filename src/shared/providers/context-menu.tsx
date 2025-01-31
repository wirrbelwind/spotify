'use client'
import { Button } from "@nextui-org/button"
import React, { PropsWithChildren, useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useOutsideClick } from "../lib/useOutsideClick";

export const ContextMenuProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [visible, setVisible] = useState(false)

	const menuRef = useOutsideClick(() => {
		setVisible(value => {
			if (value) {
				return false
			}
			return value
		})
	})

	useEffect(() => {
		function handleContextMenu(event) {
			event.preventDefault()

			const elementWithEntityData = event.target.closest('[data-context-menu-entity-type]')
			if (!elementWithEntityData) {
				return false
			}

			

			// show menu
			menuRef.current.style.top = `${event.clientY}px`
			menuRef.current.style.left = `${event.clientX}px`

			setVisible(true)

			return false
		}

		document.addEventListener('contextmenu', handleContextMenu)

		return () => {
			document.removeEventListener('contextmenu', handleContextMenu)
		}
	}, [])



	return (
		<React.Fragment>
			{children}

			{createPortal(
				(<div
					className="absolute z-[99999] top-0 left-0"
					ref={menuRef}
				>
					{visible && (
						<Dropdown >
							<DropdownMenu aria-label="Static Actions" >
								<DropdownItem key="new">New file</DropdownItem>
								<DropdownItem key="copy">Copy link</DropdownItem>
								<DropdownItem key="edit">Edit file</DropdownItem>
								<DropdownItem key="delete" className="text-danger" color="danger">
									Delete file
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					)}
				</div>),
				document.body
			)}
		</React.Fragment>
	)
}
