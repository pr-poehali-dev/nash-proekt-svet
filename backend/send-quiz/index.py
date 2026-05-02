import json
import os
import urllib.request
import urllib.parse
from datetime import datetime


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
    """Принимает ответы экзамена РКПЦ и отправляет сводку в Telegram."""

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
    correct = body.get('correct', {})
    full_name = body.get('fullName', 'Не указано')
    position = body.get('position', 'Не указано')
    department = body.get('department', 'Не указано')

    bot_token = os.environ['TELEGRAM_BOT_TOKEN']
    chat_id = os.environ['TELEGRAM_CHAT_ID']

    now = datetime.now().strftime('%d.%m.%Y %H:%M')

    total = body.get('total', len(questions))
    correct_count = body.get('score', sum(1 for q_id, ans in answers.items() if ans == correct.get(q_id, '')))
    passed = body.get('passed', False)
    grade = body.get('grade', 'Не указано')
    exam_result = "✅ СДАН" if passed else "❌ НЕ СДАН"

    wrong_answers = [
        (q_id, questions.get(q_id, f"Вопрос {q_id}"), answers[q_id], correct.get(q_id, ''))
        for q_id in answers
        if answers[q_id] != correct.get(q_id, '')
    ]

    summary_lines = [
        f"{'✅' if passed else '❌'} *{exam_result}*",
        f"🏥 Экзамен по охране труда — РКПЦ",
        f"🕐 {now}",
        "",
        f"👤 *{full_name}*",
        f"💼 {position}",
        f"🏢 {department}",
        "",
        f"📊 Результат: *{correct_count} из {total}* баллов",
        f"📝 Оценка: *{grade}*",
        f"❌ Ошибок: {len(wrong_answers)}",
    ]

    send_message(bot_token, chat_id, "\n".join(summary_lines))

    if wrong_answers:
        error_lines = ["📋 *Допущенные ошибки:*", ""]
        for q_id, q_text, user_ans, correct_ans in wrong_answers:
            short_q = q_text[:80] + "..." if len(q_text) > 80 else q_text
            error_lines.append(f"❌ {short_q}")
            error_lines.append(f"   Ответ: {user_ans}")
            error_lines.append(f"   Верно: {correct_ans}")
            error_lines.append("")

        errors_text = "\n".join(error_lines)
        if len(errors_text) > 4000:
            errors_text = errors_text[:4000] + "\n...(сокращено)"

        send_message(bot_token, chat_id, errors_text)

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'ok': True})
    }
