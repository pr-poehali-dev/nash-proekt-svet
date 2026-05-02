import json
import os
import urllib.request
import urllib.parse
from datetime import datetime


def handler(event: dict, context) -> dict:
    """Принимает ответы опроса РКПЦ и отправляет их в Telegram."""

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
    answers = body.get('answers', {})
    questions = body.get('questions', {})
    full_name = body.get('fullName', 'Не указано')
    position = body.get('position', 'Не указано')
    department = body.get('department', 'Не указано')

    bot_token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = os.environ['TELEGRAM_CHAT_ID']

    now = datetime.now().strftime('%d.%m.%Y %H:%M')

    lines = [
        "📋 *Новый ответ на опрос РКПЦ*",
        f"🕐 {now}",
        f"👤 *ФИО:* {full_name}",
        f"💼 *Должность:* {position}",
        f"🏥 *Подразделение:* {department}",
        "",
    ]
    for q_id, answer in answers.items():
        question_text = questions.get(q_id, f"Вопрос {q_id}")
        lines.append(f"*{question_text}*")
        lines.append(f"➡️ {answer}")
        lines.append("")

    message = "\n".join(lines)

    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    data = urllib.parse.urlencode({
        'chat_id': chat_id,
        'text': message,
        'parse_mode': 'Markdown'
    }).encode()

    req = urllib.request.Request(url, data=data, method='POST')
    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True, 'telegram': result.get('ok')})
    }