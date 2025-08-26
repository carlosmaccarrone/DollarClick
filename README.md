[![Build and Deploy Angular](https://github.com/carlosmaccarrone/DollarClick/actions/workflows/ci.yml/badge.svg)](https://github.com/carlosmaccarrone/DollarClick/actions/workflows/ci.yml)
🎬 [Live Demo](https://carlosmaccarrone.github.io/DollarClick/) – Check out the app running in your browser!

# DollarClick

DollarClick is a lightweight Angular application that allows users to quickly convert between Argentine Pesos (ARS) and US Dollars (USD) using real-time exchange rates. The app emphasizes a clean and modern UI with a financial theme.

## Tech Stack

- Angular 17+ (Standalone components)  
- TypeScript  
- RxJS  
- HTML & CSS (Flexbox, gradients, textures)  

## Features
- Real-time ARS ↔ USD conversions using the DolarAPI  
- Smooth animations for conversion results.  
- Responsive design for desktop and mobile.  
- Modern and visually appealing interface with a dollar-themed gradient and textures.  
- Standalone Angular components using Angular 17+ features.  

## Installation

1. Clone the repository:
```
git clone https://github.com/<username>/DollarClick.git
cd DollarClick
```
2. Install dependencies:
```
npm install
```
3. Build the app:
```
ng build --base-href /DollarClick/
```
4. Serve the built files locally (requires serve or similar tool):
```
npx serve dist/DollarClick
```

Visit http://localhost:4200/ in your browser.  

Note: The app's index.html is configured for GitHub Pages (/DollarClick/). To test it locally, you need to serve the built files with a static server.  

## Usage

Enter an amount in the input field.  

- Click `ARS → USD` to convert Argentine Pesos to US Dollars.  
- Click `USD → ARS` to convert US Dollars to Argentine Pesos.  

The current exchange rate is displayed below the result.  

## Testing

Run unit tests using:
```
npm test
```

## License

This project is open-source and available under the MIT License.