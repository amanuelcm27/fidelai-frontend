"use client";

import { useState } from "react";
import { NotificationItem } from "@/components/dashboard/notification-item";
import { mockNotifications, Notification } from "@/lib/mocks/dashboard";
import { Tabs } from "@/components/ui/tabs";
import { Bell, CheckSquare, Trash2, SlidersHorizontal, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [activeFilter, setActiveFilter] = useState<'all' | 'system' | 'task' | 'marketplace' | 'account'>('all');

  const filteredNotifications = notifications.filter(n => 
    activeFilter === 'all' || n.type === activeFilter
  );

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    toast.success("All notifications marked as read");
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.info("Notification deleted");
  };

  const markRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const filters = [
    { id: 'all', label: 'All', icon: <Bell size={14} /> },
    { id: 'system', label: 'System', icon: <SlidersHorizontal size={14} /> },
    { id: 'task', label: 'Tasks', icon: <CheckSquare size={14} /> },
    { id: 'marketplace', label: 'Marketplace', icon: <Filter size={14} /> },
    { id: 'account', label: 'Account', icon: <SlidersHorizontal size={14} /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-20"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Stay updated on your tasks, marketplace activity, and account status.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={markAllRead}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold border rounded-lg hover:bg-muted transition-colors"
          >
            <CheckSquare size={14} />
            Mark all as read
          </button>
          <button 
            className="p-2 border rounded-lg hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
             <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {filters.map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
              activeFilter === filter.id 
                ? "bg-primary text-white border-primary shadow-lg shadow-primary/20" 
                : "bg-card text-muted-foreground border-border hover:border-primary/50"
            }`}
          >
            {filter.icon}
            {filter.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {filteredNotifications.map((notification) => (
            <motion.div
              key={notification.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <NotificationItem 
                notification={notification} 
                onMarkRead={markRead}
                onDelete={deleteNotification}
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredNotifications.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 border-2 border-dashed rounded-2xl bg-muted/20"
          >
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
               <Bell className="text-muted-foreground opacity-50" size={32} />
            </div>
            <h3 className="text-lg font-bold text-muted-foreground">No notifications found</h3>
            <p className="text-sm text-muted-foreground opacity-70">We'll let you know when something important happens.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
