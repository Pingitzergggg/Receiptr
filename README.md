# Receiptr

![Logo](public/banner_dark_trans.png)

## Abstract
Receiptr is a web application designed to save and organize receipts under an account. It's technology could be implemented in stores and web shops to create a unified system for creating and managing fully digital receipts.

## How it works
Receiptr is hosted on [receiptr.net](https://receiptr.net) and can be accessed from any device. You can create receipts, cards and categories to help you organize your payments. 
### How to receive receipts
There are two ways this technology could be implemented in the future:

- By paying with a phone (digital wallet)
- By scanning a QR-code in the app

#### Paying with a digital wallet
One way to implement Receiptr in stores would be to identify Receiptr account by Digital Wallets. This is possible because the use of Digital Wallets is restricted and can only be accessed once authenticated, unlike regular credit cards using NFC technology. This allows for a direct identification method which could happen alongside with the payment interaction at the store. For this method we've created a simple RFID scanning device using a Raspberry Pi Pico 2 WH to simulate to moment of the transaction.

#### Scanning the QR-code
This method is much more generic. When the payment is done, the store creates the receipt on the Receiptr servers and the user just needs to scan the QR-code. With the QR-code Receiptr is able to identify the corresponding payment session and can link it to the authenticated user. This method can also be used for other payment methods like cash or coupons.

## Project structure
```
src/
├── app/
│   ├── App.tsx
│   └── main.tsx
├── features/
│   ├── auth/
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── PasswordRequest.tsx
│   │   │   ├── PasswordReset.tsx
│   │   │   └── Register.tsx
│   │   └── components/
│   │       └── CountryCodes.tsx
│   │
│   ├── upload/
│   │   ├── components/
│   │   │   ├── UploadCardPanel.tsx
│   │   │   ├── UploadCategoryPanel.tsx
│   │   │   ├── UploadReceiptPanel.tsx
│   │   │   └── UploadSettingsPanel.tsx
│   │   └── pages/
│   │       └── UploadButton.tsx
│   │
│   ├── receipts/
│   │   ├── components/
│   │   │   ├── BinaryPanel.tsx
│   │   │   └── Receipt.tsx
│   │   └── pages/
│   │       └── ReceiptPanel.tsx
│   │
│   ├── categories/
│   │   ├── components/
│   │   │   └── Category.tsx
│   │   └── pages/
│   │       └── CategoryPanel.tsx
│   │
│   ├── cards/
│   │   ├── components/
│   │   │   └── Card.tsx
│   │   └── pages/
│   │       └── CardPanel.tsx
│   │
│   └── settings/
│       ├── components/
│       │   └── Archive.tsx
│       └── pages/
│           └── SettingsPanel.tsx
│
├── shared/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── DeleteItem.tsx
│   │   ├── Filter.tsx
│   │   ├── NotFound.tsx
│   │   ├── QReader.tsx
│   │   ├── Select.tsx
│   │   ├── Refresh.tsx
│   │   ├── Input.tsx
│   │   ├── Popup.tsx
│   │   └── PdfViewer.tsx
│   │
│   ├── utils/
│   │   ├── stringValidator.ts
│   │   ├── databaseTables.tsx
│   │   ├── theme.tsx
│   │   └── types.ts
│   │
│   └── constants/
│       ├── CountryCodes.json
│       └── CurrencyCodes.json
│
├── services/
│   └── receiver.ts
│
├── styles/
│   ├── App.css
│   ├── index.css
│   ├── tailwind.css
│   └── style.scss
```

## Technologies used
- HTML5, CSS3
- Node JS
- TypeScript
- React
- Tailwindcss, DaisyUI
- Sassy CSS

## Project Maintainers
1. [David Pingitzer](https://github.com/Pingitzergggg)
2. [David Reicher](https://github.com/Fyrra1)
3. [David Horvath](https://github.com/TrxpleD23)

*This software is under the MIT License*<br>
*© 2026 David Pingitzer All Rights Reserved*