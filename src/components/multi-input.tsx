import { useEffect, useRef } from 'react';
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
    const inputRefs = useRef<HTMLInputElement[]>([]);

    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, value.length);
    }, [value]);

    function handleAddInput(index: number) {
        // Add new input to the array after the current index
        const newValue = value;
        newValue.splice(index + 1, 0, '');

        onChange(newValue);

        // Wait for state to update and then focus the new input
        setTimeout(() => {
            if (inputRefs.current[index + 1]) {
                inputRefs.current[index + 1].focus();
            }
        }, 0);
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <Label className="text-sm">{label}</Label>

                <Button
                    type="button"
                    variant="success"
                    size="sm"
                    onClick={() => {
                        handleAddInput(value.length - 1);
                    }}
                >
                    <i className="ri-add-fill ri-line"></i>
                </Button>
            </div>

            <small>
                Tip: You can press{' '}
                <code className="rounded-lg bg-gray-100 p-1 font-mono font-bold text-slate-900">
                    Enter
                </code>{' '}
                while typing to add an option.
            </small>

            {value.length === 0 && (
                <p className="mt-8 text-center text-sm text-muted-foreground">
                    Click the ➕ button to add an option
                </p>
            )}

            <div className="mt-4 space-y-2">
                {value.map((v, i) => (
                    <div key={i} className="flex items-center gap-2">
                        <Input
                            type="text"
                            value={v}
                            name={`options[${i}]`}
                            placeholder="Type here.."
                            ref={(el) =>
                                (inputRefs.current[i] = el as HTMLInputElement)
                            }
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();

                                    handleAddInput(i);
                                }
                            }}
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
        </div>
    );
}
