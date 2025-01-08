import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
}

export function QuantitySelector({
  value,
  onChange,
  max,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => value > 1 && onChange(value - 1)}
        disabled={value <= 1}
      >
        -
      </Button>
      <Input
        type="number"
        value={value}
        onChange={(e) => {
          const val = parseInt(e.target.value);
          if (val >= 1 && val <= max) onChange(val);
        }}
        className="w-16 text-center"
        min={1}
        max={max}
      />
      <Button
        variant="outline"
        size="icon"
        onClick={() => value < max && onChange(value + 1)}
        disabled={value >= max}
      >
        +
      </Button>
    </div>
  );
}
