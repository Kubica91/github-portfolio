/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            borderRadius: {
                "sm-md": "0.25rem",
            },
        },
    },
    plugins: [],
};
