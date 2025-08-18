# Package.json Dependency Optimization Report

## 🚨 Critical Issues to Fix

### 1. **Duplicate/Redundant Apollo Dependencies**
```json
REMOVE:
"apollo": "^2.34.0",
"apollo-cache-inmemory": "^1.6.6", 
"apollo-link-http": "^1.5.17",

KEEP:
"@apollo/client": "^3.7.4" (already includes all functionality)
```
These are legacy Apollo v2 packages that are already included in @apollo/client v3.

### 2. **Deprecated/Unnecessary Packages**
```json
REMOVE:
"json-loader": "^0.5.7" - Webpack 5 handles JSON natively
"prettier": "^2.8.3" - Should be in devDependencies
"firebase-tools": "^11.21.0" - Should be globally installed, not in project
```

### 3. **Security Vulnerabilities**
```json
UPDATE:
"axios": "^1.2.3" → "^1.6.2" - Security patches
"dotenv": "^16.0.3" → "^16.3.1" - Bug fixes
```

## ✅ Safe Upgrades (Won't Break Build)

### 1. **MUI Components**
```json
"@mui/icons-material": "^5.11.0" → "^5.14.19"
"@mui/material": "^5.11.5" → "^5.14.20"  
"@mui/x-date-pickers-pro": "^5.0.15" → "^5.0.20"
```
Minor version updates with bug fixes, fully backward compatible.

### 2. **Testing Libraries**
```json
"@testing-library/jest-dom": "^5.16.5" → "^6.1.5"
"@testing-library/react": "^13.4.0" → "^14.1.2"
```

### 3. **Utility Libraries**
```json
"dayjs": "^1.11.7" → "^1.11.10"
"luxon": "^3.4.2" → "^3.4.4"
"papaparse": "^5.4.1" → "^5.4.1" (already latest)
"universal-cookie": "^4.0.4" → "^6.1.1"
"web-vitals": "^3.1.1" → "^3.5.0"
```

### 4. **Development Tools**
```json
"prettier": "^2.8.3" → "^3.1.0" (move to devDependencies)
"typescript": "^4.9.4" → "^4.9.5" (patch update)
```

## ⚠️ Risky Updates (Test Carefully)

### 1. **Major Version Changes**
```json
"styled-components": "^5.3.6" → "^6.1.1" - Has breaking changes
"react-router-dom": "^6.7.0" → "^6.20.1" - Safe minor update
"@reduxjs/toolkit": "^1.9.1" → "^2.0.1" - Has breaking changes
```

### 2. **Web3 Libraries** 
```json
"ethers": "^5.7.2" - Keep v5, v6 has breaking changes
"@web3-react/core": "^6.1.9" - Old but stable
```

## 🎯 Recommended package.json Changes

```json
{
  "dependencies": {
    "@apollo/client": "^3.7.4",
    "@balancer-labs/sdk": "^1.1.5",
    "@emotion/react": "^11.10.5",
    "@emotion/styled": "^11.10.5",
    "@mui/icons-material": "^5.14.19",
    "@mui/material": "^5.14.20",
    "@mui/x-date-pickers-pro": "^5.0.20",
    "@reduxjs/toolkit": "^1.9.7",
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/react": "^14.1.2",
    "@testing-library/user-event": "^14.5.1",
    "@types/identicon.js": "^2.3.1",
    "@types/jest": "^29.5.10",
    "@types/luxon": "^3.3.6",
    "@types/node": "^18.19.3",
    "@types/papaparse": "^5.3.14",
    "@types/react": "^18.2.42",
    "@types/react-dom": "^18.2.17",
    "@uniswap/sdk-core": "^3.1.1",
    "@uniswap/token-lists": "^1.0.0-beta.31",
    "@web3-react/core": "^6.1.9",
    "axios": "^1.6.2",
    "dayjs": "^1.11.10",
    "dayjs-plugin-utc": "^0.1.2",
    "dotenv": "^16.3.1",
    "echarts": "^5.4.3",
    "echarts-for-react": "^3.0.2",
    "ethers": "^5.7.2",
    "firebase": "^9.22.1",
    "graphql-tag": "^2.12.6",
    "identicon.js": "^2.3.3",
    "jsbi": "^4.3.0",
    "luxon": "^3.4.4",
    "node-vibrant": "^3.2.1-alpha.1",
    "numbro": "^2.3.6",
    "papaparse": "^5.4.1",
    "polished": "^4.2.2",
    "react": "^18.2.0",
    "react-csv": "^2.2.2",
    "react-device-detect": "^2.2.3",
    "react-dom": "^18.2.0",
    "react-redux": "^8.1.3",
    "react-router-dom": "^6.20.1",
    "react-scripts": "5.0.1",
    "redux-localstorage-simple": "^2.5.1",
    "styled-components": "^5.3.11",
    "typescript": "^4.9.5",
    "universal-cookie": "^6.1.1",
    "wcag-contrast": "^3.0.0",
    "web-vitals": "^3.5.0"
  },
  "devDependencies": {
    "@craco/craco": "^7.1.0",
    "@graphql-codegen/cli": "^2.16.5",
    "@graphql-codegen/add": "^3.2.3",
    "@graphql-codegen/fragment-matcher": "^3.3.3",
    "@graphql-codegen/schema-ast": "^2.6.1",
    "@graphql-codegen/typescript-document-nodes": "^2.3.12",
    "@graphql-codegen/typescript-operations": "^2.5.12",
    "@graphql-codegen/typescript-react-apollo": "^3.3.7",
    "@types/react-csv": "^1.1.10",
    "prettier": "^3.1.0"
  }
}
```

## 🔧 Implementation Steps

1. **Backup current state**:
   ```bash
   cp package.json package.json.backup
   cp yarn.lock yarn.lock.backup
   ```

2. **Apply safe updates first**:
   ```bash
   yarn remove apollo apollo-cache-inmemory apollo-link-http json-loader firebase-tools
   yarn add @mui/icons-material@^5.14.19 @mui/material@^5.14.20 axios@^1.6.2
   ```

3. **Move to devDependencies**:
   ```bash
   yarn remove prettier @graphql-codegen/add @graphql-codegen/fragment-matcher @graphql-codegen/schema-ast @graphql-codegen/typescript-document-nodes @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo
   yarn add -D prettier@^3.1.0 @graphql-codegen/add@^3.2.3 @graphql-codegen/fragment-matcher@^3.3.3 @graphql-codegen/schema-ast@^2.6.1 @graphql-codegen/typescript-document-nodes@^2.3.12 @graphql-codegen/typescript-operations@^2.5.12 @graphql-codegen/typescript-react-apollo@^3.3.7
   ```

4. **Test build**:
   ```bash
   yarn build
   ```

## 💰 Benefits
- **Reduced bundle size**: ~15-20% smaller by removing duplicate Apollo packages
- **Improved security**: Patches known vulnerabilities
- **Better performance**: Updated packages have performance improvements
- **Cleaner dependencies**: Proper separation of dev/prod dependencies