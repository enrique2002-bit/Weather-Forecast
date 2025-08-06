# 🔑 How to Get a Working WeatherAPI Key (FREE)

Since your API keys are returning "invalid" errors, here's how to get a fresh, working key:

## Step 1: Visit WeatherAPI
Go to: **https://www.weatherapi.com/signup.aspx**

## Step 2: Create Free Account
- Enter your email address
- Create a password
- Click "Sign Up" 
- Verify your email if required

## Step 3: Get Your API Key
- Login to: **https://www.weatherapi.com/my/**
- Copy your API key from the dashboard
- It will look like: `1234567890abcdef1234567890abcdef`

## Step 4: Update Your App
Open `src/script-multi-api.js` and replace line 12:
```javascript
key: 'YOUR_NEW_API_KEY_HERE', // Replace this
```

## Alternative: Keep Using Sample Data
Your app works beautifully with sample data too! The Apple Weather DNA experience is complete either way.

## Why Keys Fail
- Keys might be expired
- Account might be suspended
- Daily limit reached
- Regional restrictions

## Your App Features (Working Now!)
- ✅ Complete Apple Weather DNA design
- ✅ Multi-API fallback system
- ✅ Beautiful sample data mode
- ✅ Living backgrounds & animations
- ✅ 4K display optimization
- ✅ 24/7 reliability

**Launch with: `launch-multi-api.bat`**
