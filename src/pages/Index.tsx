
import React from 'react';
import { useMongoDb } from '@/context/MongoContext';
import DashboardHeader from '@/components/DashboardHeader';
import ConnectionForm from '@/components/ConnectionForm';
import DatabaseSelector from '@/components/DatabaseSelector';
import CollectionSelector from '@/components/CollectionSelector';
import DocumentViewer from '@/components/DocumentViewer';
import MongoDBStats from '@/components/MongoDBStats';

const Index = () => {
  const { isConnected } = useMongoDb();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <DashboardHeader />
      
      <main className="flex-1 container mx-auto py-6 px-4">
        <ConnectionForm />
        
        {isConnected && (
          <>
            <MongoDBStats />
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <DatabaseSelector />
                  <CollectionSelector />
                </div>
              </div>
              
              <div className="lg:col-span-3">
                <DocumentViewer />
              </div>
            </div>
          </>
        )}
        
        {!isConnected && (
          <div className="mt-10 text-center">
            <img 
              src="https://mongodb-devhub-cms.s3.us-west-1.amazonaws.com/mongodb_thumbnail_6279eddec4e3e895f30b77bd.png" 
              alt="MongoDB" 
              className="w-48 mx-auto mb-6 mongodb-logo" 
            />
            <h2 className="text-2xl font-bold mb-2">Connect to MongoDB</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enter your MongoDB connection string above to get started. You can use MongoDB Atlas or any MongoDB compatible database.
            </p>
          </div>
        )}
      </main>
      
      <footer className="border-t py-4 px-6 text-center text-sm text-muted-foreground">
        <p>MongoDB Migration Tool &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Index;
