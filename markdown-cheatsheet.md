# Markdown Cheatsheet

A quick reference for writing `.md` files — syntax, examples, and rendered output.

---

## 1. Headings

Use `#` through `######` for heading levels 1–6 (one space after the `#`).

```markdown
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

---

## 2. Emphasis

| Style          | Syntax              | Output            |
|-----------------|----------------------|--------------------|
| Italic          | `*text*` or `_text_` | *text*             |
| Bold            | `**text**` or `__text__` | **text**       |
| Bold + Italic   | `***text***`         | ***text***         |
| Strikethrough   | `~~text~~`            | ~~text~~           |

---

## 3. Lists

### Unordered
```markdown
- Item 1
- Item 2
  - Nested item
* Alternative bullet
+ Another alternative
```

### Ordered
```markdown
1. First item
2. Second item
   1. Nested item
3. Third item
```

### Task list (GitHub-flavored Markdown)
```markdown
- [x] Completed task
- [ ] Incomplete task
```

---

## 4. Links

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Title text")
[Reference-style link][1]

[1]: https://example.com "Optional title"
```

Auto-link a bare URL: `<https://example.com>`

---

## 5. Images

```markdown
![Alt text](https://example.com/image.png)
![Alt text](./local-image.png "Optional title")
```

> Images use the same syntax as links, prefixed with `!`.

---

## 6. Code

### Inline code
```markdown
Use `npm install` to add a dependency.
```

### Fenced code block (with syntax highlighting)
````markdown
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```
````

### Indented code block (4 spaces, alternative to fences)
```markdown
    function greet(name) {
      return `Hello, ${name}!`;
    }
```

---

## 7. Blockquotes

```markdown
> This is a blockquote.
>
> It can span multiple lines or paragraphs.
>> Nested blockquote.
```

---

## 8. Tables

```markdown
| Column A | Column B | Column C |
|----------|:--------:|---------:|
| left     | center   | right    |
| a        | b        | c        |
```

- `:---` left-aligns, `:---:` center-aligns, `---:` right-aligns a column.

---

## 9. Horizontal Rule

Any of these on their own line produce a divider:
```markdown
---
***
___
```

---

## 10. Line Breaks & Paragraphs

- A blank line between text creates a new paragraph.
- End a line with **two or more spaces** (or a `<br>` tag) to force a line break without a new paragraph.

```markdown
First line.  
Second line (forced break above).
```

---

## 11. Escaping Characters

Prefix a special character with `\` to display it literally:

```markdown
\* not a bullet \*
\# not a heading
```

Common characters to escape: `\ ` `` ` `` `*` `_` `{ }` `[ ]` `( )` `#` `+` `-` `.` `!`

---

## 12. Footnotes (GitHub-flavored Markdown)

```markdown
Here is a statement that needs a citation.[^1]

[^1]: This is the footnote text.
```

---

## 13. Definition Lists (supported by some renderers)

```markdown
Term
: Definition of the term.
```

---

## 14. HTML in Markdown

Most renderers allow raw HTML inline for things Markdown can't do natively:

```markdown
<details>
<summary>Click to expand</summary>

Hidden content goes here.

</details>
```

---

## Quick Reference Table

| Element        | Syntax                          |
|-----------------|----------------------------------|
| Heading         | `# H1` … `###### H6`            |
| Bold            | `**bold**`                      |
| Italic          | `*italic*`                      |
| Strikethrough   | `~~strike~~`                    |
| Link            | `[text](url)`                   |
| Image           | `![alt](url)`                   |
| Inline code     | `` `code` ``                    |
| Code block      | ` ```lang ` … ` ``` `            |
| Blockquote      | `> quote`                       |
| Unordered list  | `- item`                        |
| Ordered list    | `1. item`                       |
| Task item       | `- [ ] task` / `- [x] task`     |
| Table           | `\| col \| col \|`              |
| Horizontal rule | `---`                            |
| Footnote        | `text[^1]` + `[^1]: note`       |

---

## Notes

- File extension: `.md` (or `.markdown`).
- Markdown is mostly whitespace- and line-break-sensitive — when something doesn't render as expected, check for missing blank lines around block elements (headings, lists, code blocks, tables).
- "GitHub-flavored Markdown" (GFM) adds tables, task lists, strikethrough, and auto-linking on top of standard Markdown — not all renderers support every GFM feature.
