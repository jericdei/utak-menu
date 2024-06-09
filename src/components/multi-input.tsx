import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

type MultiInputProps = {
    label: string;
    value: string[];
    onChange: (value: string[]) => void;
};

export default function MultiInput({
    label,
    value,
    onChange,
}: MultiInputProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="mb-4 flex items-center justify-between">
                <Label className="text-sm">{label}</Label>

                <Button
                    type="button"
                    variant="success"
                    size="sm"
                    onClick={() => {
                        onChange([...value, '']);
                    }}
                >
                    <i className="ri-add-fill ri-line"></i>
                </Button>
            </div>

            {value.length === 0 && (
                <p className="text-center text-sm text-muted-foreground">
                    Click the ➕ button to add an option
                </p>
            )}

            {value.map((v, i) => (
                <div key={i} className="flex items-center gap-2">
                    <Input
                        type="text"
                        value={v}
                        placeholder="Type here.."
                        onChange={(e) => {
                            const newValue = [...value];
                            newValue[i] = e.target.value;
                            onChange(newValue);
                        }}
                    />

                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                            const newValue = [...value];
                            newValue.splice(i, 1);
                            onChange(newValue);
                        }}
                    >
                        <i className="ri-delete-bin-line ri-lg"></i>
                    </Button>
                </div>
            ))}
        </div>
    );
}
