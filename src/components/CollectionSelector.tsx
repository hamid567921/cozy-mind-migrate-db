
import React from 'react';
import { useMongoDb } from '@/context/MongoContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { FileJson, Database } from 'lucide-react';

const CollectionSelector: React.FC = () => {
  const { 
    collections, 
    currentCollection, 
    selectCollection, 
    isLoading, 
    currentDatabase
  } = useMongoDb();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Database className="h-5 w-5 text-mongodb-green" />
          Collections
        </CardTitle>
        <CardDescription>
          {currentDatabase 
            ? `Collections in ${currentDatabase}` 
            : 'Select a database first'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {collections.length > 0 ? (
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-2">
              {collections.map((collection) => (
                <Button
                  key={collection}
                  variant={currentCollection === collection ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => selectCollection(collection)}
                  disabled={isLoading}
                >
                  <FileJson className="mr-2 h-4 w-4" />
                  {collection}
                </Button>
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
            <FileJson className="h-12 w-12 mb-2 opacity-20" />
            <p>No collections available</p>
            <p className="text-sm mt-1">
              {currentDatabase 
                ? 'This database has no collections' 
                : 'Select a database to view collections'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CollectionSelector;
