/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";


function Graph({ data } : { data: any[]})  {
  return (
    <div className={`flex flex-col pb-[20vh]`}>
      <div className="w-[100%]">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="60%" stopColor="#bd9e1e" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#bd9e1e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="label" interval={0} className="text-[10px]" />
            <YAxis className="text-[12px]" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#bd9e1e"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graph;
