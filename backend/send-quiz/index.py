import json
import os
import smtplib
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


def handler(event: dict, context) -> dict:
    """Принимает ответы экзамена РКПЦ и отправляет результат на email."""

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

    subject = f"Экзамен по охране труда — {full_name} — {exam_result}"

    text_lines = [
        f"ФИО: {full_name}",
        f"Должность: {position}",
        f"Подразделение: {department}",
        "",
        f"Результат: {exam_result}",
    ]

    send_email(subject, "\n".join(text_lines))

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
