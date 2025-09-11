export default async function DepartmentDashboard({ params }: { params: { deptId: string } }) {
  const { deptId } = params;
  
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{deptId.toUpperCase()} Department Dashboard</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Welcome to the Dashboard</h2>
        <p className="text-gray-600">You are viewing the {deptId} department dashboard.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Faculty</h3>
          <p className="text-3xl font-bold text-blue-600">25</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Students</h3>
          <p className="text-3xl font-bold text-green-600">450</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Laboratories</h3>
          <p className="text-3xl font-bold text-amber-600">8</p>
        </div>
      </div>
    </div>
  );
}
