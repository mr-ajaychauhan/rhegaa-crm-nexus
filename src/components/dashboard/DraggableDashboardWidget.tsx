
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DashboardWidget } from './DashboardWidget';

interface DraggableWidgetProps {
  id: string;
  type: string;
  title: string;
  index: number;
  onRemove: (id: string) => void;
  onMove: (dragIndex: number, hoverIndex: number) => void;
}

const ItemType = 'WIDGET';

export const DraggableDashboardWidget: React.FC<DraggableWidgetProps> = ({
  id,
  type,
  title,
  index,
  onRemove,
  onMove,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        onMove(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
      className="transform transition-all duration-200 hover:scale-105"
    >
      <DashboardWidget
        id={id}
        type={type}
        title={title}
        onRemove={onRemove}
      />
    </div>
  );
};
