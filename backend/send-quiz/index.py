import json  # v2
import os
import smtplib
import urllib.request
import urllib.parse
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def send_email(subject: str, body: str):
    smtp_user = os.environ['SMTP_USER']
    smtp_password = os.environ['SMTP_PASSWORD']
    to_email = 'gilmutdinowa.goulnaz@yandex.ru'

    msg = MIMEMultipart()
    msg['From'] = smtp_user
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain', 'utf-8'))

    with smtplib.SMTP_SSL('smtp.yandex.ru', 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, to_email, msg.as_string())


def send_telegram(text: str):
    bot_token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = '8006419551'
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
    """Принимает ответы экзамена РКПЦ и отправляет результат на email и в Telegram."""

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
    exam_result = "СДАН" if passed else "НЕ СДАН"

    lines = [
        f"👤 *{full_name}*",
        f"💼 {position}",
        f"🏢 {department}",
        "",
        f"{'✅' if passed else '❌'} *{exam_result}*",
    ]
    text = "\n".join(lines)

    send_telegram(text)

    send_email(
        subject=f"Экзамен по охране труда — {full_name} — {exam_result}",
        body=f"ФИО: {full_name}\nДолжность: {position}\nПодразделение: {department}\n\nРезультат: {exam_result}"
    )

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }