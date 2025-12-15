import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#9c27b0", "#ff5722"];

export function PieChartComponent({ data }) {
  return (
    <div style={{ width: "100%", maxWidth: "500px", margin: "40px auto" }}>
      <h3 style={{ textAlign: "center", color: "#1e3c72", marginBottom: "20px" }}>Portfolio Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="current"
            nameKey="coin"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LineChartComponent({ historyData }) {
  return (
    <div style={{ width: "100%", maxWidth: "700px", margin: "40px auto" }}>
      <h3 style={{ textAlign: "center", color: "#1e3c72", marginBottom: "20px" }}>Portfolio Value Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={historyData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#1e3c72" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
