/* eslint-disable */
import React, { FC, ReactNode } from 'react';

interface ColumnProps {
  title: string;
  children: ReactNode;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
}

export const ColumnTask: FC<ColumnProps> = ({
  title,
  children,
  onDrop,
  onDragOver,
}) => (
  <div
    onDrop={onDrop}
    onDragOver={onDragOver}
    style={{
      flexGrow: 1,
      margin: '0 10px',
      padding: '10px',
      minHeight: 300,
      backgroundColor: '#f0f0f0',
      borderRadius: '5px',
    }}
  >
    <h3>{title}</h3>
    {children}
  </div>
);
