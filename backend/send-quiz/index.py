import json
import os
import urllib.request
import urllib.parse


def send_message(bot_token: str, chat_id: str, text: str):
    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': text,
        'parse_mode': 'Markdown'
    }).encode()
    req = urllib.request.Request(url, data=data, method='POST')
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())


def handler(event: dict, context) -> dict:
    """Принимает ответы экзамена РКПЦ и отправляет краткую сводку в Telegram."""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    full_name = body.get('fullName', 'Не указано')
    position = body.get('position', 'Не указано')
    department = body.get('department', 'Не указано')
    passed = body.get('passed', False)
    exam_result = "✅ СДАН" if passed else "❌ НЕ СДАН"

    bot_token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = os.environ['TELEGRAM_CHAT_ID']

    summary_lines = [
        f"👤 *{full_name}*",
        f"💼 {position}",
        f"🏢 {department}",
        "",
        f"*{exam_result}*",
    ]

    send_message(bot_token, chat_id, "\n".join(summary_lines))

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
