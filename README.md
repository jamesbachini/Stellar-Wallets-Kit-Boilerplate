# Stellar Wallet Kit Boilerplate

Boilerplate code with simple connection and transaction signing for both React and Vanilla Javascript.

Demo: https://jamesbachini.github.io/Stellar-Wallets-Kit-Boilerplate/vanilla/index.html

A boilerplate for @CreitTech's Stellar Wallet Kit: https://github.com/Creit-Tech/Stellar-Wallets-Kit


tl;dr, just include:

```javascript
  <script src="https://cdn.jsdelivr.net/gh/jamesbachini/Stellar-Wallets-Kit-Boilerplate@main/vanilla/stellar-kit-bundle/dist/wallet-kit-bundle.umd.js"></script>
```


### HOW TO REBUILD THE LOCAL BUNDLE (wallet-kit-bundle.umd.js)

This demo requires a custom-built JS bundle because the @creit-tech/stellar-wallets-kit library is not designed for direct browser/CDN use (it has Node.js dependencies).

To rebuild the bundle yourself, navigate to the stellar-kit-bundle directory in your terminal and run the following commands:

Navigate into the bundler directory:

```bash
cd stellar-kit-bundle
```

Install all the necessary node packages:

```bash
npm install
```

Run the Vite build script:

```bash
npm run build
```

This will create a new wallet-kit-bundle.umd.js file in the /dist folder, which this index.html file uses.