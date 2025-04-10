
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface MongoContextType {
  connectionString: string;
  isConnected: boolean;
  collections: string[];
  databases: string[];
  currentDatabase: string | null;
  currentCollection: string | null;
  isLoading: boolean;
  error: string | null;
  setConnectionString: (connectionString: string) => void;
  connect: () => Promise<void>;
  disconnect: () => void;
  selectDatabase: (database: string) => Promise<void>;
  selectCollection: (collection: string) => Promise<void>;
  documents: any[];
  fetchDocuments: () => Promise<void>;
  addDocument: (document: any) => Promise<void>;
  updateDocument: (id: string, document: any) => Promise<void>;
  deleteDocument: (id: string) => Promise<void>;
}

const MongoContext = createContext<MongoContextType | undefined>(undefined);

export const useMongoDb = () => {
  const context = useContext(MongoContext);
  if (!context) {
    throw new Error('useMongoDb must be used within a MongoProvider');
  }
  return context;
};

interface MongoProviderProps {
  children: ReactNode;
}

export const MongoProvider: React.FC<MongoProviderProps> = ({ children }) => {
  const [connectionString, setConnectionString] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [collections, setCollections] = useState<string[]>([]);
  const [databases, setDatabases] = useState<string[]>([]);
  const [currentDatabase, setCurrentDatabase] = useState<string | null>(null);
  const [currentCollection, setCurrentCollection] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [documents, setDocuments] = useState<any[]>([]);

  // In a real implementation, this would connect to MongoDB
  // For this demo, we'll simulate connection behaviors
  const connect = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate connection validation
      if (!connectionString || !connectionString.includes('mongodb')) {
        throw new Error('Invalid MongoDB connection string');
      }

      // Simulate successful connection
      setIsConnected(true);
      setDatabases(['sample_analytics', 'sample_mflix', 'sample_training', 'sample_weatherdata']);
      toast.success('Successfully connected to MongoDB');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect to MongoDB');
      toast.error('Failed to connect to MongoDB');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setIsConnected(false);
    setCollections([]);
    setDatabases([]);
    setCurrentDatabase(null);
    setCurrentCollection(null);
    setDocuments([]);
    toast.info('Disconnected from MongoDB');
  };

  const selectDatabase = async (database: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setCurrentDatabase(database);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simulate collections based on selected database
      let simulatedCollections: string[] = [];
      switch(database) {
        case 'sample_analytics':
          simulatedCollections = ['accounts', 'customers', 'transactions'];
          break;
        case 'sample_mflix':
          simulatedCollections = ['movies', 'users', 'comments', 'theaters'];
          break;
        case 'sample_training':
          simulatedCollections = ['companies', 'inspections', 'trips', 'posts'];
          break;
        case 'sample_weatherdata':
          simulatedCollections = ['data', 'stations'];
          break;
        default:
          simulatedCollections = [];
      }
      
      setCollections(simulatedCollections);
      setCurrentCollection(null);
      setDocuments([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to select database');
      toast.error('Failed to select database');
    } finally {
      setIsLoading(false);
    }
  };

  const selectCollection = async (collection: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setCurrentCollection(collection);
      
      // Simulate fetching documents after selecting a collection
      await fetchDocuments();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to select collection');
      toast.error('Failed to select collection');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDocuments = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate sample documents based on current collection
      const sampleDocuments = Array.from({ length: 10 }, (_, i) => ({
        _id: `doc_${i}_${Date.now()}`,
        name: `Sample ${i}`,
        createdAt: new Date().toISOString(),
        value: Math.floor(Math.random() * 1000),
        isActive: Math.random() > 0.3
      }));
      
      setDocuments(sampleDocuments);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch documents');
      toast.error('Failed to fetch documents');
    } finally {
      setIsLoading(false);
    }
  };

  const addDocument = async (document: any) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Add document with a generated ID
      const newDocument = {
        _id: `doc_${Date.now()}`,
        ...document,
        createdAt: new Date().toISOString()
      };
      
      setDocuments(prev => [newDocument, ...prev]);
      toast.success('Document added successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add document');
      toast.error('Failed to add document');
    } finally {
      setIsLoading(false);
    }
  };

  const updateDocument = async (id: string, document: any) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setDocuments(prev => 
        prev.map(doc => 
          doc._id === id ? { ...doc, ...document, updatedAt: new Date().toISOString() } : doc
        )
      );
      
      toast.success('Document updated successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update document');
      toast.error('Failed to update document');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteDocument = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setDocuments(prev => prev.filter(doc => doc._id !== id));
      toast.success('Document deleted successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete document');
      toast.error('Failed to delete document');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MongoContext.Provider value={{
      connectionString,
      isConnected,
      collections,
      databases,
      currentDatabase,
      currentCollection,
      isLoading,
      error,
      setConnectionString,
      connect,
      disconnect,
      selectDatabase,
      selectCollection,
      documents,
      fetchDocuments,
      addDocument,
      updateDocument,
      deleteDocument
    }}>
      {children}
    </MongoContext.Provider>
  );
};
