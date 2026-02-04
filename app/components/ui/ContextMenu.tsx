import React, { useState, useRef, useEffect } from 'react';

export interface ContextMenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  divider?: boolean;
  submenu?: ContextMenuItem[];
}

export interface ContextMenuProps {
  items: ContextMenuItem[];
  children: React.ReactNode;
  onItemClick?: (itemId: string) => void;
}

export function ContextMenu({
  items,
  children,
  onItemClick,
}: ContextMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [submenuPos, setSubmenuPos] = useState<{ x: number; y: number } | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setIsOpen(true);
    setOpenSubmenu(null);
  };

  const handleItemClick = (item: ContextMenuItem) => {
    if (item.submenu && item.submenu.length > 0) {
      setOpenSubmenu(openSubmenu === item.id ? null : item.id);
    } else if (!item.disabled) {
      item.onClick?.();
      onItemClick?.(item.id);
      setIsOpen(false);
      setOpenSubmenu(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setOpenSubmenu(null);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const MenuContent = ({ items, isSubmenu = false }: { items: ContextMenuItem[]; isSubmenu?: boolean }) => (
    <ul className={`min-w-max ${isSubmenu ? 'bg-neutral-800' : 'bg-neutral-900'} border border-neutral-700 rounded-lg shadow-lg py-1 z-50`}>
      {items.map((item) => (
        <React.Fragment key={item.id}>
          {item.divider && (
            <li className="h-px bg-neutral-700 my-1" />
          )}
          <li
            onMouseEnter={() => {
              if (item.submenu && item.submenu.length > 0) {
                setOpenSubmenu(item.id);
              }
            }}
            onMouseLeave={() => {
              if (!item.submenu || item.submenu.length === 0) {
                setOpenSubmenu(null);
              }
            }}
            className="relative"
          >
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
              <span className="flex-1 text-left">{item.label}</span>
              {item.submenu && item.submenu.length > 0 && (
                <span className="text-xs text-neutral-500">›</span>
              )}
            </button>

            {/* Submenu */}
            {item.submenu && item.submenu.length > 0 && openSubmenu === item.id && (
              <div className="absolute left-full top-0 ml-0 mt-0">
                <MenuContent items={item.submenu} isSubmenu={true} />
              </div>
            )}
          </li>
        </React.Fragment>
      ))}
    </ul>
  );

  return (
    <div ref={containerRef} onContextMenu={handleContextMenu} className="relative">
      {children}

      {/* Context menu */}
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
          <div
            ref={menuRef}
            style={{
              position: 'absolute',
              left: `${position.x}px`,
              top: `${position.y}px`,
              zIndex: 50,
            }}
          >
            <MenuContent items={items} />
          </div>
        </>
      )}
    </div>
  );
}
