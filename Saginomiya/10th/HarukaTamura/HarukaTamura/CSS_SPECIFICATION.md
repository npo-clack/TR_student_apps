# CSS実装仕様書

## 1. CSS変数定義（ルート）

```css
:root {
  /* 背景色 */
  --color-bg-main: #fffdf6;
  --color-bg-alt: #fef8e8;
  
  /* 装飾色（淡い緑） */
  --color-deco-light: #d6e8c9;
  --color-deco-mid: #b7d8a8;
  --color-deco-medium: #a8d39c;
  
  /* アクセント色 */
  --color-accent: #7fb87e;
  
  /* テキスト色 */
  --color-text-dark: #333;
  --color-text-light: #666;
  
  /* トップバー */
  --color-topbar-bg: #faf6f0;
  --color-topbar-shadow: rgba(0, 0, 0, 0.08);
  
  /* 余白・サイズ */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 1.5rem;
  --spacing-lg: 2rem;
  --spacing-xl: 3rem;
  
  /* 角丸 */
  --radius-sm: 4px;
  --radius-md: 8px;
  
  /* フォント */
  --font-serif-ja: 'Noto Serif JP', 'Shippori Mincho', 'Yu Mincho', serif;
  --font-serif: Georgia, serif;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  
  /* 行間 */
  --line-height: 1.9;
  
  /* トランジション */
  --transition-fast: 0.3s ease;
  --transition-normal: 0.5s ease;
}
```

## 2. ベーススタイル

### 2.1 全体設定

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
}

body {
  background-color: var(--color-bg-main);
  background-image: url('data:image/svg+xml;utf8,...'); /* SVGパターン */
  background-attachment: fixed;
  background-size: cover;
  color: var(--color-text-dark);
  font-family: var(--font-serif-ja);
  line-height: var(--line-height);
  overflow-x: hidden;
}
```

### 2.2 テキスト基本

```css
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-serif-ja);
  font-weight: 600;
  color: var(--color-text-dark);
  margin-bottom: var(--spacing-md);
}

h1 {
  font-size: 2.5rem;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.5rem;
}

p {
  margin-bottom: var(--spacing-md);
  color: var(--color-text-light);
}

a {
  color: var(--color-accent);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--color-deco-medium);
}
```

## 3. トップバースタイル

```css
.topbar {
  background-color: var(--color-topbar-bg);
  padding: var(--spacing-md) var(--spacing-lg);
  box-shadow: 0 2px 4px var(--color-topbar-shadow);
  border-radius: var(--radius-md);
  margin-bottom: var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing-lg);
  flex-wrap: wrap;
  min-height: auto;
}

.topbar__logo {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-text-dark);
}

.topbar__nav {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
  flex-wrap: wrap;
}

.topbar__nav a {
  font-size: 0.95rem;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--radius-sm);
  transition: background-color var(--transition-fast);
}

.topbar__nav a:hover {
  background-color: rgba(127, 184, 126, 0.1);
}
```

## 4. コンテナ・レイアウト

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
}

.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
  padding: var(--spacing-lg);
}

.section {
  margin-bottom: var(--spacing-xl);
  padding: var(--spacing-lg);
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: var(--radius-md);
  border-left: 4px solid var(--color-deco-medium);
}
```

## 5. アニメーション

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn var(--transition-normal) ease forwards;
}

.fade-in--fast {
  animation: fadeIn var(--transition-fast) ease forwards;
}
```

## 6. ボタン・インタラクティブ要素

```css
button, .btn {
  background-color: var(--color-accent);
  color: white;
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: var(--radius-md);
  font-family: var(--font-serif-ja);
  font-size: 1rem;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

button:hover, .btn:hover {
  background-color: var(--color-deco-medium);
}

button:active, .btn:active {
  transform: scale(0.98);
}
```

## 7. ユーティリティクラス

```css
.text-center {
  text-align: center;
}

.text-small {
  font-size: 0.9rem;
  color: var(--color-text-light);
}

.text-accent {
  color: var(--color-accent);
}

.spacing-top {
  margin-top: var(--spacing-lg);
}

.spacing-bottom {
  margin-bottom: var(--spacing-lg);
}

.hidden {
  display: none;
}

.invisible {
  visibility: hidden;
}
```

## 8. レスポンシブ対応

```css
@media (max-width: 768px) {
  :root {
    font-size: 14px;
  }
  
  .topbar {
    flex-direction: column;
    gap: var(--spacing-md);
  }
  
  h1 {
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  .container {
    padding: 0 var(--spacing-md);
  }
  
  .content {
    padding: var(--spacing-md);
  }
}

@media (max-width: 480px) {
  :root {
    font-size: 13px;
  }
  
  h1 {
    font-size: 1.5rem;
  }
  
  h2 {
    font-size: 1.25rem;
  }
  
  .topbar__nav {
    gap: var(--spacing-sm);
  }
}
```

## 9. 背景SVGパターン仕様

- **形式**：Data URI SVGパターン
- **デザイン**：蛇・ツタを思わせる曲線
- **色**：装飾色グループから選定（透過度 0.15 ～ 0.25）
- **配置**：ページ上部コーナーと下部コーナー
- **実装**：CSS `background-image` に直接埋め込み

例：
```css
background-image: url('data:image/svg+xml;utf8,<svg>...</svg>');
```

## 10. ゲーム要素（棒人間）用クラス（予約）

```css
.game-character {
  /* ゲーム用途専用 */
  /* サイト配色とは独立 */
  position: absolute;
  pointer-events: none;
  z-index: 1000;
}

.game-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 999;
}


```

## 11. 実装上の注意

### 優先度
1. ベーススタイル（ボディ、テキスト、リンク）
2. トップバー
3. コンテナ・セクション
4. ユーティリティ
5. ゲーム要素（後付け）

### シンプル化原則
- 不要なセレクタは使用しない
- カスケード最小化
- 変数で一元管理
- 重複スタイルは避ける

### デバッグ
- CSS変数の値は :root で一括管理
- クラス名は BEM 表記法簡易版（`component__element`）
- アニメーションは `var(--transition-*)` で統一

---

**バージョン**：1.0.0  
**最終更新**：2025-11-15





