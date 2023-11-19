type TextInputProps = {
    label?: string;
    placeholder?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    name?: string;
    className?: string
};

const TextInput = ({ onChange, name, value, label, placeholder, className, ...rest }: TextInputProps) => {
    return (
        <div className={`lg:w-[446px] h-[74px] lg:flex-col lg:justify-start lg:items-start gap-2 lg:inline-flex lg:mb-6 ${className}`}>
            <div className={`text-gray-900 text-base font-semibold ${className}`}>{label}</div>
            <input
                type="text"
                placeholder={placeholder}
                defaultValue={value}
                name={name}
                onChange={onChange}
                className={`self-stretch px-4 py-3 bg-white rounded-lg border border-gray-300 inline-flex ${className}`}
                {...rest}
            />
        </div>
    );
}

export default TextInput
