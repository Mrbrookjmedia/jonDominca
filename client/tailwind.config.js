// // /** @type {import('tailwindcss').Config} */
// // export default {
// //     darkMode: ["class"],
// //     content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
// //   theme: {
// //   	extend: {
// //   		borderRadius: {
// //   			lg: 'var(--radius)',
// //   			md: 'calc(var(--radius) - 2px)',
// //   			sm: 'calc(var(--radius) - 4px)'
// //   		},
// //   		colors: {}
// //   	}
// //   },
// //   plugins: [require("tailwindcss-animate")],
// // }



// module.exports = {
// 	content: ["./src/**/*.{js,jsx,ts,tsx}"],
// 	theme: {
// 	  extend: {
// 		typography: {
// 		  DEFAULT: {
// 			css: {
// 			  h2: {
// 				fontSize: '2rem',
// 				fontFamily: 'serif',
// 				marginTop: '3rem',
// 				marginBottom: '1.5rem',
// 			  },
// 			  h3: {
// 				fontSize: '1.5rem',
// 				fontWeight: '600',
// 				marginTop: '2.5rem',
// 				marginBottom: '1rem',
// 			  },
// 			  ul: {
// 				listStyleType: 'disc',
// 				paddingLeft: '1.5rem',
// 				marginBottom: '1.5rem',
// 			  },
// 			  ol: {
// 				listStyleType: 'decimal',
// 				paddingLeft: '1.5rem',
// 				marginBottom: '1.5rem',
// 			  },
// 			  blockquote: {
// 				borderLeftWidth: '4px',
// 				borderColor: '#e5e7eb',
// 				paddingLeft: '1.5rem',
// 				fontStyle: 'italic',
// 				color: '#4b5563',
// 				margin: '2rem 0',
// 			  },
// 			  img: {
// 				borderRadius: '0.5rem',
// 				margin: '2rem 0',
// 			  }
// 			},
// 		  },
// 		},
// 	  },
// 	},
// 	plugins: [
// 	  require('@tailwindcss/typography'),
// 	],
//   }
  

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
            typography: {
                DEFAULT: {
                    css: {
                        h2: {
                            fontSize: '2rem',
                            fontFamily: 'serif',
                            marginTop: '3rem',
                            marginBottom: '1.5rem',
                        },
                        h3: {
                            fontSize: '1.5rem',
                            fontWeight: '600',
                            marginTop: '2.5rem',
                            marginBottom: '1rem',
                        },
                        ul: {
                            listStyleType: 'disc',
                            paddingLeft: '1.5rem',
                            marginBottom: '1.5rem',
                        },
                        ol: {
                            listStyleType: 'decimal',
                            paddingLeft: '1.5rem',
                            marginBottom: '1.5rem',
                        },
                        blockquote: {
                            borderLeftWidth: '4px',
                            borderColor: '#e5e7eb',
                            paddingLeft: '1.5rem',
                            fontStyle: 'italic',
                            color: '#4b5563',
                            margin: '2rem 0',
                        },
                        img: {
                            borderRadius: '0.5rem',
                            margin: '2rem 0',
                        },
                    },
                },
            },
            colors: {},
        },
    },
    plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
    ],
};
