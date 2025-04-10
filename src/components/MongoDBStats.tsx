
import React from 'react';
import { useMongoDb } from '@/context/MongoContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Database, HardDrive, FileJson, Users } from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis
} from 'recharts';

const COLORS = ['#00ED64', '#13AA52', '#C1F94B', '#00684A', '#116149'];

const MongoDBStats: React.FC = () => {
  const { isConnected, documents, databases, collections } = useMongoDb();

  const pieData = [
    { name: 'Active', value: documents.filter(doc => doc.isActive).length },
    { name: 'Inactive', value: documents.filter(doc => !doc.isActive).length },
  ];

  const barData = documents.slice(0, 5).map(doc => ({
    name: doc.name,
    value: doc.value
  }));

  if (!isConnected || !documents.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Database className="h-4 w-4 mr-2 text-mongodb-green" /> Databases
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{databases.length}</div>
          <p className="text-xs text-muted-foreground mt-1">Available databases</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <HardDrive className="h-4 w-4 mr-2 text-mongodb-green" /> Collections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{collections.length}</div>
          <p className="text-xs text-muted-foreground mt-1">In current database</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <FileJson className="h-4 w-4 mr-2 text-mongodb-green" /> Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{documents.length}</div>
          <p className="text-xs text-muted-foreground mt-1">In current collection</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center">
            <Users className="h-4 w-4 mr-2 text-mongodb-green" /> Status
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center">
          <div className="w-12 h-12 mr-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={15}
                  outerRadius={24}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div>
            <div className="text-2xl font-bold">
              {Math.round((pieData[0].value / (pieData[0].value + pieData[1].value || 1)) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Active documents</p>
          </div>
        </CardContent>
      </Card>
      
      {documents.length > 0 && (
        <Card className="col-span-1 md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle className="text-sm font-medium">Document Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#00ED64" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MongoDBStats;
