import { useState } from 'react'
import { getViewConfig } from '@/components/ui/modals/tableViewConfigs'

export const useTableViewModal = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [itemType, setItemType] = useState<string>('policy')

  const openModal = (item: any, type: string) => {
    setSelectedItem(item)
    setItemType(type)
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    setSelectedItem(null)
    setItemType('policy')
  }

  const config = getViewConfig(itemType)

  return {
    isOpen,
    selectedItem,
    config,
    openModal,
    closeModal
  }
}
