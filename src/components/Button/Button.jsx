import "./Button.css";

export default function Button({ children, onClick, type = "button", className = "" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`btn-base px-4 py-2 rounded-md font-medium shadow-sm inline-flex items-center justify-center ${className}`}
        >
            {children}
        </button>
    );
}
