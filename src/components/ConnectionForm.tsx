
import React, { useState } from 'react';
import { useMongoDb } from '@/context/MongoContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, Link2Off } from 'lucide-react';

const ConnectionForm: React.FC = () => {
  const { 
    connectionString, 
    setConnectionString, 
    connect, 
    disconnect, 
    isConnected, 
    isLoading 
  } = useMongoDb();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    connect();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-mongodb-green" />
          MongoDB Connection
        </CardTitle>
        <CardDescription>
          Enter your MongoDB connection string to connect to your database
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-2">
            <Input
              type="text"
              placeholder="mongodb://username:password@host:port/database"
              value={connectionString}
              onChange={(e) => setConnectionString(e.target.value)}
              disabled={isConnected || isLoading}
              className="flex-1"
            />
            {!isConnected ? (
              <Button type="submit" disabled={isLoading || !connectionString}>
                {isLoading ? 'Connecting...' : 'Connect'}
              </Button>
            ) : (
              <Button 
                type="button" 
                onClick={disconnect} 
                variant="destructive"
              >
                <Link2Off className="mr-2 h-4 w-4" /> Disconnect
              </Button>
            )}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <p>Status: {isConnected ? (
          <span className="text-green-500 font-medium">Connected</span>
        ) : (
          <span className="text-muted-foreground">Disconnected</span>
        )}</p>
        <p className="text-right">MongoDB Atlas compatible</p>
      </CardFooter>
    </Card>
  );
};

export default ConnectionForm;
