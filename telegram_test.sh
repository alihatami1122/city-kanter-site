#!/bin/bash

# ====== تنظیمات ======
TOKEN="YOUR_BOT_TOKEN_HERE"
CHAT_ID="YOUR_CHAT_ID_HERE"
MESSAGE="سلام — پیام تست از ربات SEO شما ✅"

# ====== ارسال پیام ======
curl -s -X POST "https://api.telegram.org/bot$TOKEN/sendMessage"      -d chat_id=$CHAT_ID      -d text="$MESSAGE"

echo "پیام ارسال شد!"
