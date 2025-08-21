const Button = ({ children, primary, secondary, tertiary, className = '', ...props }) => {

    const baseStyles = 'font-semibold transition duration-300 ease-in-out cursor-pointer flex items-center justify-center';

    let typeStyles = '';
    let hoverActiveStyles = '';

    // Determine button type and its base styles
    if (primary) {
        typeStyles = 'bg-[#101957] text-white px-4 py-2 rounded-md';
        hoverActiveStyles = 'hover:shadow-[0_0_10.74px_0_#101957] active:bg-[#585E89] active:shadow-[0_0_5.37px_0_#101957]';
    } else if (secondary) {
        typeStyles = 'bg-white text-[#101957] border border-[#101957] px-4 py-2 rounded-md';
        hoverActiveStyles = 'hover:shadow-[0_0_10.74px_0_#101957] active:border-[#9FA3BC]';
    } else if (tertiary) {
        typeStyles = 'bg-[#10195726] text-[#101957] border border-[#101957] px-4 py-2 rounded-md';
        hoverActiveStyles = 'hover:shadow-[0_3px_5px_0_#101957]';
    } else {
        // Default to primary if no type is specified
        typeStyles = 'bg-[#101957] text-white px-4 py-2 rounded-md';
        hoverActiveStyles = 'hover:shadow-[0_0_10.74px_0_#101957] active:bg-[#585E89] active:shadow-[0_0_5.37px_0_#101957]';
    }

    // Combine all styles, with className prop allowing for overrides
    const finalStyles = `${baseStyles} ${typeStyles} ${hoverActiveStyles} ${className}`;

    return (
        <button className={finalStyles.trim()} {...props}>
            {children}
        </button>
    );
};

export default Button;