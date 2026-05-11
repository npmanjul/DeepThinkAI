import { StatsItemProps } from '@/src/types/blog.types'

const StatsItem = ({ label, value, color }: StatsItemProps) => {
    const colors: Record<string, string> = {
        slate: "text-zinc-400",
        amber: "text-amber-300",
        emerald: "text-emerald-300",
        red: "text-red-300"
      };
    
  return (
    <div className="flex items-center gap-1.5">
    <span className="text-zinc-600">{label}</span>
    <span className={`font-semibold tabular-nums ${colors[color]}`}>{value}</span>
  </div>
  )
}

export default StatsItem