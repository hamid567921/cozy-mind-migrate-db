
import React from 'react';
import { useMongoDb } from '@/context/MongoContext';
import { Button } from '@/components/ui/button';
import { Database } from 'lucide-react';

const DashboardHeader: React.FC = () => {
  const { isConnected, currentDatabase, currentCollection } = useMongoDb();

  return (
    <header className="border-b p-4 flex items-center justify-between">
      <div className="flex items-center">
        <div className="mr-2 bg-mongodb-green rounded-full p-1">
          <Database className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-2xl font-heading font-bold">MongoDB Migration Tool</h1>
      </div>
      
      {isConnected && (
        <div className="hidden md:flex items-center text-sm">
          <div className="flex items-center space-x-1 px-3 py-1 bg-accent rounded-l-md">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>Connected</span>
          </div>
          {currentDatabase && (
            <div className="px-3 py-1 bg-accent/50">
              <span className="font-medium">{currentDatabase}</span>
            </div>
          )}
          {currentCollection && (
            <div className="px-3 py-1 bg-accent/30 rounded-r-md">
              <span>{currentCollection}</span>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default DashboardHeader;
