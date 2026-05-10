"""读取同目录下的任务状态 JSON 并打印关键字段。"""
import json
from pathlib import Path

HERE = Path(__file__).resolve().parent
STATUS_FILE = HERE / "task_status.json"


def main() -> None:
    with STATUS_FILE.open(encoding="utf-8") as f:
        data = json.load(f)

    print(f"任务ID: {data['task_id']}")
    print(f"当前状态: {data['status']}")
    print(f"当前进度: {data['progress']}")
    print(f"提示信息: {data['message_text']}")


if __name__ == "__main__":
    main()
