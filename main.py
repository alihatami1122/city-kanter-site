import configparser
import requests

def send_telegram_message(text):
    config = configparser.ConfigParser()
    config.read('config.ini')
    token = config.get('Telegram', 'bot_token', fallback=None)
    chat_id = config.get('Telegram', 'chat_id', fallback=None)

    if not token or not chat_id:
        print("Telegram token یا chat_id در config.ini تنظیم نشده.")
        return False

    send_url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {
        'chat_id': chat_id,
        'text': text
    }
    try:
        r = requests.post(send_url, data=payload, timeout=10)
        if r.status_code == 200:
            print("پیام تلگرام با موفقیت ارسال شد.")
            return True
        else:
            print("خطا در ارسال پیام تلگرام:", r.status_code, r.text)
            return False
    except Exception as e:
        print("خطا:", e)
        return False

# نمونه فراخوانی
if __name__ == "__main__":
    send_telegram_message("سلام — پیام تست از اسکریپت SEO است ✅")
