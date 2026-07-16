import { useRef } from "react"

type PinInputProps = {
  length?: number
  onComplete: (pin: string) => void
}

export default function PinInput({ length = 6, onComplete }: PinInputProps) {
  const inputs = useRef<HTMLInputElement[]>([])

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return // solo números

    if (value && index < length - 1) {
      inputs.current[index + 1].focus()
    }

    const pin = inputs.current.map(i => i.value).join("")
    if (pin.length === length) onComplete(pin)
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !inputs.current[index].value && index > 0) {
      inputs.current[index - 1].focus()
    }
  }

  return (
    <div style={{ display: "flex", gap: "8px" }}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={el => { if (el) inputs.current[i] = el }}
          maxLength={1}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          style={{ width: "40px", textAlign: "center", fontSize: "1.5rem",  borderWidth: '5px' }}
        />
      ))}
    </div>
  )
}