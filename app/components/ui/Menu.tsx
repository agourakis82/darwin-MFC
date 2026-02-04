import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';

export interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
  submenu?: MenuItem[];
  description?: string;
}

export interface MenuProps {
  items: MenuItem[];
  trigger?: React.ReactNode;
  className?: string;
  variant?: 'dropdown' | 'vertical';
  onItemClick?: (itemId: string) => void;
}

export function Menu({
  items,
  trigger = 'Menu',
  className = '',
  variant = 'dropdown',
  onItemClick,
}: MenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleItemClick = (item: MenuItem) => {
    if (item.submenu && item.submenu.length > 0) {
      setOpenSubmenu(openSubmenu === item.id ? null : item.id);
    } else if (!item.disabled) {
      item.onClick?.();
      onItemClick?.(item.id);
      setIsOpen(false);
      setOpenSubmenu(null);
    }
  };

  const MenuContent = ({ items, nested = false }: { items: MenuItem[]; nested?: boolean }) => (
    <ul className={`min-w-max ${nested ? 'bg-neutral-800' : 'bg-neutral-900'} border border-neutral-700 rounded-lg shadow-lg py-1`}>
      {items.map((item, idx) => (
        <React.Fragment key={item.id}>
          {item.divider && (
            <li className="h-px bg-neutral-700 my-1" />
          )}
          <li>
            <button
              onClick={() => handleItemClick(item)}
              disabled={item.disabled}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                item.disabled
                  ? 'text-neutral-600 cursor-not-allowed opacity-50'
                  : 'text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              {item.icon && <span className="flex-shrink-0 w-4 h-4">{item.icon}</span>}
              <div className="flex-1 text-left">
                <div className="font-medium">{item.label}</div>
                {item.description && <div className="text-xs text-neutral-500">{item.description}</div>}
              </div>
              {item.submenu && item.submenu.length > 0 && <ChevronRight size={16} />}
            </button>

            {/* Submenu */}
            {item.submenu && item.submenu.length > 0 && openSubmenu === item.id && (
              <div className="absolute left-full top-0 ml-0">
                <MenuContent items={item.submenu} nested={true} />
              </div>
            )}
          </li>
        </React.Fragment>
      ))}
    </ul>
  );

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-primary text-neutral-900 font-medium rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 focus:ring-primary transition-colors"
      >
        {trigger}
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setIsOpen(false);
              setOpenSubmenu(null);
            }}
          />

          {/* Menu content */}
          <div className="absolute top-full left-0 mt-2 z-50">
            <MenuContent items={items} />
          </div>
        </>
      )}
    </div>
  );
}

/**
 * VerticalMenu - Menu displayed as a vertical list (not dropdown)
 */
export function VerticalMenu({
  items,
  onItemClick,
}: Omit<MenuProps, 'trigger' | 'variant'>) {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const handleItemClick = (item: MenuItem) => {
    if (item.submenu && item.submenu.length > 0) {
      setOpenSubmenu(openSubmenu === item.id ? null : item.id);
    } else if (!item.disabled) {
      item.onClick?.();
      onItemClick?.(item.id);
    }
  };

  const renderItems = (items: MenuItem[], level = 0) => (
    <ul className={`space-y-1 ${level > 0 ? 'ml-4 border-l border-neutral-700 pl-4' : ''}`}>
      {items.map((item) => (
        <React.Fragment key={item.id}>
          {item.divider && <li className="h-px bg-neutral-700 my-2" />}
          <li>
            <button
              onClick={() => handleItemClick(item)}
              disabled={item.disabled}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm rounded transition-colors ${
                item.disabled
                  ? 'text-neutral-600 cursor-not-allowed opacity-50'
                  : 'text-neutral-200 hover:bg-neutral-800'
              }`}
            >
              {item.icon && <span className="flex-shrink-0 w-4 h-4">{item.icon}</span>}
              <div className="flex-1 text-left">
                <div className="font-medium">{item.label}</div>
                {item.description && <div className="text-xs text-neutral-500">{item.description}</div>}
              </div>
              {item.submenu && item.submenu.length > 0 && (
                <ChevronRight
                  size={16}
                  className={`transition-transform ${
                    openSubmenu === item.id ? 'rotate-90' : ''
                  }`}
                />
              )}
            </button>

            {/* Submenu */}
            {item.submenu && item.submenu.length > 0 && openSubmenu === item.id && (
              renderItems(item.submenu, level + 1)
            )}
          </li>
        </React.Fragment>
      ))}
    </ul>
  );

  return (
    <nav className="bg-neutral-900 border border-neutral-700 rounded-lg p-4 w-full">
      {renderItems(items)}
    </nav>
  );
}
