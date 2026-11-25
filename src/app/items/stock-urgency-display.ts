import { StockUrgency } from './item.model';

export interface StockUrgencyDisplay {
  label: string;
  icon: string;
}

export const STOCK_URGENCY_DISPLAY: Record<StockUrgency, StockUrgencyDisplay> = {
  STOCK_HIGH: { label: 'High', icon: 'img/warning-icon-green.png' },
  STOCK_MEDIUM: { label: 'Medium', icon: 'img/warning-icon-orange.png' },
  STOCK_LOW: { label: 'Low', icon: 'img/warning-icon-red.png' },
}
