# App 真实截图（gpt-image-2 参考图）

批量生图前，请将手机端截图放入此目录：

| 文件名 | 用途 |
|--------|------|
| `home.png` | 首页 |
| `detail.png` | 攻略详情页 |
| `search.png` | 搜索页 |
| `favorites.png` | 收藏页 |

## 命令

```bash
export ZMZAI_KEY=sk-xxx   # 或在项目根 .env 写 ZMZAI_KEY=...

python scripts/generate-image.py --check   # 预检
python scripts/generate-image.py --test    # API 连通测试
python scripts/generate-image.py           # 生成 8 张宣传图
```

输出目录：`public/marketing/ref-based/`
