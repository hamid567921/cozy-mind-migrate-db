
import React from 'react';
import { useMongoDb } from '@/context/MongoContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Layers, FolderKanban } from 'lucide-react';

const DatabaseSelector: React.FC = () => {
  const { 
    databases, 
    currentDatabase, 
    selectDatabase, 
    isLoading 
  } = useMongoDb();

  const handleDatabaseChange = (value: string) => {
    selectDatabase(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-mongodb-green" />
          Databases
        </CardTitle>
        <CardDescription>
          Select a database to view its collections
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Select
          disabled={isLoading || databases.length === 0}
          value={currentDatabase || ''}
          onValueChange={handleDatabaseChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a database" />
          </SelectTrigger>
          <SelectContent>
            {databases.map((db) => (
              <SelectItem key={db} value={db}>
                <div className="flex items-center gap-2">
                  <FolderKanban className="h-4 w-4" />
                  {db}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default DatabaseSelector;
