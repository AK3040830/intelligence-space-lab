"""第 01 关验收：检查文件与 JSON 字段是否符合要求。"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
JSON_PATH = ROOT / "demo" / "task_status.json"
SCRIPT_PATH = ROOT / "demo" / "hello_task.py"

REQUIRED_KEYS = ("task_id", "status", "progress", "message_text")


def fail(msg: str) -> None:
    print(msg, file=sys.stderr)


def main() -> int:
    if not JSON_PATH.is_file():
        fail(f"[失败] 找不到文件: {JSON_PATH}")
        return 1
    if not SCRIPT_PATH.is_file():
        fail(f"[失败] 找不到文件: {SCRIPT_PATH}")
        return 1

    try:
        text = JSON_PATH.read_text(encoding="utf-8")
        data = json.loads(text)
    except json.JSONDecodeError as e:
        fail(f"[失败] JSON 解析错误: {e}")
        return 1

    if not isinstance(data, dict):
        fail("[失败] JSON 根节点必须是对象（字典），不能是列表或纯字符串。")
        return 1

    missing = [k for k in REQUIRED_KEYS if k not in data]
    if missing:
        fail(f"[失败] JSON 缺少字段: {', '.join(missing)}")
        return 1

    status = data["status"]
    if not isinstance(status, str):
        fail(
            f"[失败] 字段 status 必须是字符串类型，当前类型: {type(status).__name__}"
        )
        return 1

    progress = data["progress"]
    if not isinstance(progress, (int, float)):
        fail(
            f"[失败] 字段 progress 必须是数字（整数或小数），当前类型: {type(progress).__name__}"
        )
        return 1

    print("[OK] 第 01 关验收通过")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
