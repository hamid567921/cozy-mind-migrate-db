
import React, { useState } from 'react';
import { useMongoDb } from '@/context/MongoContext';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { 
  FileJson, 
  RefreshCw, 
  Trash2, 
  Edit, 
  Plus,
  MoreHorizontal, 
  DatabaseBackup
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const DocumentViewer: React.FC = () => {
  const { 
    documents, 
    fetchDocuments, 
    isLoading, 
    currentCollection,
    currentDatabase,
    deleteDocument
  } = useMongoDb();
  
  const [selectedDocument, setSelectedDocument] = useState<any | null>(null);

  const handleRefresh = () => {
    fetchDocuments();
  };

  const handleDelete = (id: string) => {
    deleteDocument(id);
  };

  const truncateValue = (value: any): string => {
    if (value === null || value === undefined) return 'null';
    if (typeof value === 'object') {
      return JSON.stringify(value).length > 40 
        ? JSON.stringify(value).substring(0, 40) + '...' 
        : JSON.stringify(value);
    }
    const str = String(value);
    return str.length > 40 ? str.substring(0, 40) + '...' : str;
  };

  if (!currentCollection) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileJson className="h-5 w-5 text-mongodb-green" />
            Documents
          </CardTitle>
          <CardDescription>
            Select a collection to view documents
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center h-[400px] text-center">
          <DatabaseBackup className="h-16 w-16 mb-4 opacity-20" />
          <p className="text-muted-foreground">No collection selected</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileJson className="h-5 w-5 text-mongodb-green" />
              Documents
            </CardTitle>
            <CardDescription>
              {currentCollection 
                ? `Viewing documents in ${currentDatabase}.${currentCollection}` 
                : 'Select a collection to view documents'}
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading || !currentCollection}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="sr-only">Refresh</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              disabled={isLoading || !currentCollection}
            >
              <Plus className="h-4 w-4 mr-1" /> Add
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-4 py-2">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : documents.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc._id}>
                    <TableCell className="font-mono text-xs truncate max-w-[100px]">
                      {truncateValue(doc._id)}
                    </TableCell>
                    <TableCell>{doc.name}</TableCell>
                    <TableCell className="text-xs">
                      {new Date(doc.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>{doc.value}</TableCell>
                    <TableCell>
                      <Badge variant={doc.isActive ? "default" : "outline"}>
                        {doc.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setSelectedDocument(doc)}>
                            <Edit className="h-4 w-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-destructive focus:text-destructive"
                            onClick={() => handleDelete(doc._id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-center">
              <FileJson className="h-12 w-12 mb-2 opacity-20" />
              <p className="text-muted-foreground">No documents found</p>
              <Button variant="outline" className="mt-4" onClick={handleRefresh}>
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh
              </Button>
            </div>
          )}
        </ScrollArea>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        {documents.length > 0 && (
          <div className="w-full flex justify-between">
            <p>{documents.length} document{documents.length !== 1 ? 's' : ''} found</p>
            <p>Last updated: {new Date().toLocaleTimeString()}</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default DocumentViewer;
