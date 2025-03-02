'use client'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Dropdown, DropdownMenu, DropdownItem } from '@heroui/dropdown'
import { useOutsideClick } from '../lib/useOutsideClick'

const Context = createContext(null)

export const ContextMenuProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [visible, setVisible] = useState(false)

  const menuRef = useOutsideClick(() => {
    setVisible((value) => {
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

      const entity = {
        type: elementWithEntityData.dataset.contextMenuEntityType,
        uri: elementWithEntityData.dataset.contextMenuEntityUri,
        id: elementWithEntityData.dataset.contextMenuEntityId,
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

  const [target, setTarget] = useState<null | object>(null)

  return (
    <Context.Provider
      value={{
        target,
        setTarget,
      }}
    >
      {children}

      {createPortal(
        <div className="absolute z-[99999] top-0 left-0" ref={menuRef}>
          {visible && (
            <Dropdown>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem key="new">New file</DropdownItem>
                <DropdownItem key="copy">Copy link</DropdownItem>
                <DropdownItem key="edit">Edit file</DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger">
                  Delete file
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )}
        </div>,
        document.body,
      )}
    </Context.Provider>
  )
}
