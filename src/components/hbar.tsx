import cn from "classnames"

type HBarProps = {
  title: string
  color: string
  value: number
}

export default function HBar(props: HBarProps) {
  return (
    <div className="w-full h-[48px] border border-gray-400 p-[1px] relative">
      <div
        className={cn('h-full', props.color)}
        style={{ width: `${props.value * 100}%` }}
      />
      <div className="absolute inset-0 flex justify-center items-center">
        <span className="text-xs p-1 rounded-lg border bg-white">
          {props.title}
        </span>
      </div>
    </div>
  )
}