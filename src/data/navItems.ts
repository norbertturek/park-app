import PointIcon from '../assets/point.svg?component'
import ListIcon from '../assets/list.svg?component'
import WalletIcon from '../assets/wallet.svg?component'
import CarIcon from '../assets/car.svg?component'
import MenuIcon from '../assets/menu.svg?component'

import type { Component } from 'vue'

export type NavItem = {
  to: string
  aria: string
  icon: Component
}

const navItems: NavItem[] = [
  { to: '/', aria: 'Points', icon: PointIcon },
  { to: '/', aria: 'List', icon: ListIcon },
  { to: '/', aria: 'Car', icon: CarIcon },
  { to: '/', aria: 'Wallet', icon: WalletIcon },
  { to: '/', aria: 'Menu', icon: MenuIcon },
]

export default navItems
