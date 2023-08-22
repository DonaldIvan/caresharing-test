import { useUsersContext } from "../contexts/UsersContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SelectedUser = () => {
  const { selectedUser } = useUsersContext();
  if (!selectedUser) {
    return null;
  }
  return (
    <div>
      <h2>Name: {selectedUser.name}</h2>
      <div style={{ width: 500, height: 300 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={selectedUser.grades}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="subject" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="grade" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SelectedUser;
