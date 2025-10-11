# ChatBot Setup Guide

## Overview
A fully functional chatbot has been integrated into your website. It appears as a floating button on all pages and provides AI-powered assistance to visitors using OpenAI's GPT-3.5-turbo model.

## Features
- 🤖 Floating chatbot button with RTL/LTR support
- 💬 Real-time conversation interface
- 🌐 Bilingual support (Arabic & English)
- 📱 Responsive design for mobile and desktop
- 🎨 Matches your website's design system
- 🔄 Context-aware conversations (remembers last 5 messages)
- ⚡ Smooth animations and user-friendly UI

## Files Created/Modified

### New Files:
1. **`src/components/ChatBot.tsx`** - Main chatbot component
2. **`src/app/api/chat/route.ts`** - API route for OpenAI integration
3. **`CHATBOT_SETUP.md`** - This setup guide

### Modified Files:
1. **`src/app/[locale]/layout.tsx`** - Added ChatBot component
2. **`messages/ar.json`** - Added Arabic translations
3. **`messages/en.json`** - Added English translations
4. **`package.json`** - Added openai dependency

## Setup Instructions

### 1. Get Your OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Navigate to API Keys section
4. Click "Create new secret key"
5. Copy your API key (you won't be able to see it again!)

### 2. Configure Environment Variables
Create a `.env.local` file in the root directory:

```env
# OpenAI API Configuration
OPENAI_API_KEY=sk-proj-your_actual_api_key_here
```

**Important:** Never commit your `.env.local` file to version control!

### 3. Test the ChatBot
1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to your site
3. Look for the yellow robot icon in the bottom right corner (or bottom left for Arabic)
4. Click the icon to open the chat interface
5. Try sending a message!

## Customization

### Change the AI Model
In `src/app/api/chat/route.ts`, line 64:
```typescript
model: "gpt-3.5-turbo", // Change to "gpt-4" for better responses
```

Available models:
- `gpt-3.5-turbo` - Fast and cost-effective (recommended)
- `gpt-4` - More accurate but slower and more expensive
- `gpt-4-turbo` - Latest GPT-4 model, faster than gpt-4

### Adjust Response Length
In `src/app/api/chat/route.ts`, line 66:
```typescript
max_tokens: 500, // Increase for longer responses
```

### Modify System Instructions
Edit the system message in `src/app/api/chat/route.ts` (lines 29-58) to:
- Add more company information
- Change the assistant's personality
- Add specific instructions or guidelines
- Include product details

### Update Chatbot Appearance
In `src/components/ChatBot.tsx`:
- **Colors:** Change `bg-yellow-500` to your preferred color
- **Size:** Modify `w-96` and `h-[600px]` for different dimensions
- **Position:** Adjust `bottom-6` and `right-6`/`left-6`

### Translations
Edit chatbot messages in:
- **Arabic:** `messages/ar.json` under `"ChatBot"`
- **English:** `messages/en.json` under `"ChatBot"`

## Cost Considerations

### Pricing (as of 2024)
**GPT-3.5-turbo:**
- Input: $0.0005 per 1K tokens (~750 words)
- Output: $0.0015 per 1K tokens

**GPT-4:**
- Input: $0.03 per 1K tokens
- Output: $0.06 per 1K tokens

### Cost Management Tips
1. Set usage limits in your OpenAI account dashboard
2. Implement rate limiting (add to API route if needed)
3. Monitor usage through OpenAI dashboard
4. Start with GPT-3.5-turbo, upgrade to GPT-4 only if needed

## Troubleshooting

### ChatBot button doesn't appear
- Check browser console for errors
- Ensure ChatBot component is imported in layout.tsx
- Clear browser cache and reload

### "Service unavailable" message
- Verify your OpenAI API key is set correctly in `.env.local`
- Restart your development server after adding the API key
- Check that the environment variable is loaded: `console.log(process.env.OPENAI_API_KEY)`

### API errors
- Check your OpenAI account has credits
- Verify your API key hasn't expired
- Check rate limits in OpenAI dashboard
- Review the console logs in your terminal

### Slow responses
- GPT-3.5-turbo is fastest (usually 1-3 seconds)
- GPT-4 can take 5-10 seconds
- Check your internet connection
- Reduce `max_tokens` value

## Advanced Features (Optional)

### Add Rate Limiting
To prevent abuse, add rate limiting to the API route:

```typescript
// Install: npm install rate-limiter-flexible
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 10, // 10 requests
  duration: 60, // per 60 seconds
});
```

### Add User Authentication
Restrict chatbot to logged-in users only by checking session in the API route.

### Store Chat History
Save conversations to MongoDB for analytics:
```typescript
import { connectDB } from '@/lib/mongodb';
// Save message to database
```

### Add File Upload Support
Allow users to share images or documents with the chatbot.

## Security Best Practices

1. **Never expose your API key** in client-side code
2. **Always use server-side API routes** for OpenAI calls
3. **Implement rate limiting** to prevent abuse
4. **Validate user input** before sending to OpenAI
5. **Set spending limits** in your OpenAI account
6. **Monitor usage regularly** through the dashboard

## Support

For issues or questions:
- Check the [OpenAI API documentation](https://platform.openai.com/docs)
- Review [Next.js API Routes guide](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- Check the console logs for error messages

## Next Steps

1. ✅ Add your OpenAI API key to `.env.local`
2. ✅ Test the chatbot thoroughly
3. ✅ Customize the system instructions to match your needs
4. ✅ Adjust the styling to match your brand
5. ✅ Monitor usage and costs
6. ✅ Consider adding rate limiting for production
7. ✅ Deploy to production

---

**Note:** The chatbot is currently configured with comprehensive information about Amal Al Khair Holding Group. Make sure to update the system message in the API route if any company information changes.

